import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Get trips with filtering and search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const destination = searchParams.get('destination');
    const trip_type = searchParams.get('trip_type');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const start_date = searchParams.get('start_date');
    const host_id = searchParams.get('host_id');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = parseInt(searchParams.get('offset')) || 0;

    let whereConditions = ['t.status = $1'];
    let values = ['published'];
    let paramCount = 2;

    // Build dynamic WHERE conditions
    if (search) {
      whereConditions.push(`(
        LOWER(t.title) LIKE LOWER($${paramCount}) OR 
        LOWER(t.description) LIKE LOWER($${paramCount}) OR 
        LOWER(t.destination) LIKE LOWER($${paramCount}) OR
        LOWER(t.country) LIKE LOWER($${paramCount})
      )`);
      values.push(`%${search}%`);
      paramCount++;
    }

    if (destination) {
      whereConditions.push(`LOWER(t.destination) LIKE LOWER($${paramCount})`);
      values.push(`%${destination}%`);
      paramCount++;
    }

    if (trip_type) {
      whereConditions.push(`t.trip_type = $${paramCount}`);
      values.push(trip_type);
      paramCount++;
    }

    if (min_price) {
      whereConditions.push(`t.price_per_person >= $${paramCount}`);
      values.push(parseFloat(min_price));
      paramCount++;
    }

    if (max_price) {
      whereConditions.push(`t.price_per_person <= $${paramCount}`);
      values.push(parseFloat(max_price));
      paramCount++;
    }

    if (start_date) {
      whereConditions.push(`t.start_date >= $${paramCount}`);
      values.push(start_date);
      paramCount++;
    }

    if (host_id) {
      whereConditions.push(`t.host_id = $${paramCount}`);
      values.push(parseInt(host_id));
      paramCount++;
    }

    // Add limit and offset
    values.push(limit, offset);

    const query = `
      SELECT 
        t.*,
        au.name as host_name,
        up.community_name,
        up.profile_image_url as host_image,
        up.host_verified,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(r.id) as review_count,
        (t.max_travelers - t.current_travelers) as spots_left
      FROM trips t
      JOIN auth_users au ON t.host_id = au.id
      LEFT JOIN user_profiles up ON t.host_id = up.user_id
      LEFT JOIN reviews r ON t.id = r.trip_id
      WHERE ${whereConditions.join(' AND ')}
      GROUP BY t.id, au.name, up.community_name, up.profile_image_url, up.host_verified
      ORDER BY t.start_date ASC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const trips = await sql(query, values);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT t.id) as total
      FROM trips t
      JOIN auth_users au ON t.host_id = au.id
      LEFT JOIN user_profiles up ON t.host_id = up.user_id
      WHERE ${whereConditions.slice(0, -2).join(' AND ')}
    `;
    
    const countResult = await sql(countQuery, values.slice(0, -2));
    const total = parseInt(countResult[0].total);

    return Response.json({ 
      trips, 
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Create a new trip (hosts only)
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a host
    const hostProfiles = await sql`
      SELECT user_type FROM user_profiles 
      WHERE user_id = ${session.user.id} AND user_type = 'host'
    `;

    if (hostProfiles.length === 0) {
      return Response.json({ error: "Only hosts can create trips" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      description,
      destination,
      country,
      start_date,
      end_date,
      price_per_person,
      deposit_amount,
      min_travelers,
      max_travelers,
      trip_type,
      difficulty_level,
      hero_image_url
    } = body;

    // Validate required fields
    if (!title || !description || !destination || !country || !start_date || !end_date || 
        !price_per_person || !min_travelers || !max_travelers || !trip_type) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();
    
    if (startDate <= today) {
      return Response.json({ error: "Start date must be in the future" }, { status: 400 });
    }
    
    if (endDate <= startDate) {
      return Response.json({ error: "End date must be after start date" }, { status: 400 });
    }

    // Validate traveler counts
    if (min_travelers < 1 || max_travelers < min_travelers) {
      return Response.json({ error: "Invalid traveler counts" }, { status: 400 });
    }

    const newTrips = await sql`
      INSERT INTO trips (
        host_id, title, description, destination, country, start_date, end_date,
        price_per_person, deposit_amount, min_travelers, max_travelers, trip_type,
        difficulty_level, hero_image_url, status
      ) VALUES (
        ${session.user.id}, ${title}, ${description}, ${destination}, ${country},
        ${start_date}, ${end_date}, ${price_per_person}, ${deposit_amount || null},
        ${min_travelers}, ${max_travelers}, ${trip_type}, ${difficulty_level || 'moderate'},
        ${hero_image_url || null}, 'draft'
      )
      RETURNING *
    `;

    return Response.json({ trip: newTrips[0] });
  } catch (error) {
    console.error("Error creating trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}