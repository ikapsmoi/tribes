import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Get single trip with full details
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const trips = await sql`
      SELECT 
        t.*,
        au.name as host_name,
        au.email as host_email,
        up.bio as host_bio,
        up.community_name,
        up.community_size,
        up.profile_image_url as host_image,
        up.host_verified,
        up.social_instagram,
        up.social_youtube,
        up.social_tiktok,
        up.social_website,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(r.id) as review_count,
        (t.max_travelers - t.current_travelers) as spots_left
      FROM trips t
      JOIN auth_users au ON t.host_id = au.id
      LEFT JOIN user_profiles up ON t.host_id = up.user_id
      LEFT JOIN reviews r ON t.id = r.trip_id
      WHERE t.id = ${id}
      GROUP BY t.id, au.name, au.email, up.bio, up.community_name, up.community_size, 
               up.profile_image_url, up.host_verified, up.social_instagram, 
               up.social_youtube, up.social_tiktok, up.social_website
    `;

    if (trips.length === 0) {
      return Response.json({ error: "Trip not found" }, { status: 404 });
    }

    const trip = trips[0];

    // Get trip itinerary
    const itinerary = await sql`
      SELECT * FROM trip_itinerary 
      WHERE trip_id = ${id} 
      ORDER BY day_number ASC
    `;

    // Get trip images
    const images = await sql`
      SELECT * FROM trip_images 
      WHERE trip_id = ${id} 
      ORDER BY display_order ASC, created_at ASC
    `;

    // Get recent reviews
    const reviews = await sql`
      SELECT 
        r.*,
        au.name as traveler_name,
        up.profile_image_url as traveler_image
      FROM reviews r
      JOIN auth_users au ON r.traveler_id = au.id
      LEFT JOIN user_profiles up ON r.traveler_id = up.user_id
      WHERE r.trip_id = ${id}
      ORDER BY r.created_at DESC
      LIMIT 10
    `;

    // Check if current user has saved this trip
    let isSaved = false;
    const session = await auth();
    if (session?.user?.id) {
      const savedTrips = await sql`
        SELECT id FROM saved_trips 
        WHERE user_id = ${session.user.id} AND trip_id = ${id}
      `;
      isSaved = savedTrips.length > 0;
    }

    return Response.json({
      trip: {
        ...trip,
        itinerary,
        images,
        reviews,
        is_saved: isSaved
      }
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update trip (host only)
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Check if user owns this trip
    const tripOwnership = await sql`
      SELECT host_id FROM trips WHERE id = ${id}
    `;

    if (tripOwnership.length === 0) {
      return Response.json({ error: "Trip not found" }, { status: 404 });
    }

    if (tripOwnership[0].host_id !== session.user.id) {
      return Response.json({ error: "You can only update your own trips" }, { status: 403 });
    }

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
      hero_image_url,
      status
    } = body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (destination !== undefined) {
      updates.push(`destination = $${paramCount++}`);
      values.push(destination);
    }
    if (country !== undefined) {
      updates.push(`country = $${paramCount++}`);
      values.push(country);
    }
    if (start_date !== undefined) {
      updates.push(`start_date = $${paramCount++}`);
      values.push(start_date);
    }
    if (end_date !== undefined) {
      updates.push(`end_date = $${paramCount++}`);
      values.push(end_date);
    }
    if (price_per_person !== undefined) {
      updates.push(`price_per_person = $${paramCount++}`);
      values.push(price_per_person);
    }
    if (deposit_amount !== undefined) {
      updates.push(`deposit_amount = $${paramCount++}`);
      values.push(deposit_amount);
    }
    if (min_travelers !== undefined) {
      updates.push(`min_travelers = $${paramCount++}`);
      values.push(min_travelers);
    }
    if (max_travelers !== undefined) {
      updates.push(`max_travelers = $${paramCount++}`);
      values.push(max_travelers);
    }
    if (trip_type !== undefined) {
      updates.push(`trip_type = $${paramCount++}`);
      values.push(trip_type);
    }
    if (difficulty_level !== undefined) {
      updates.push(`difficulty_level = $${paramCount++}`);
      values.push(difficulty_level);
    }
    if (hero_image_url !== undefined) {
      updates.push(`hero_image_url = $${paramCount++}`);
      values.push(hero_image_url);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (updates.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    updates.push(`updated_at = $${paramCount++}`);
    values.push(new Date().toISOString());

    values.push(id);

    const updateQuery = `
      UPDATE trips 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const updatedTrips = await sql(updateQuery, values);

    return Response.json({ trip: updatedTrips[0] });
  } catch (error) {
    console.error("Error updating trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete trip (host only)
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check if user owns this trip
    const tripOwnership = await sql`
      SELECT host_id, current_travelers FROM trips WHERE id = ${id}
    `;

    if (tripOwnership.length === 0) {
      return Response.json({ error: "Trip not found" }, { status: 404 });
    }

    if (tripOwnership[0].host_id !== session.user.id) {
      return Response.json({ error: "You can only delete your own trips" }, { status: 403 });
    }

    // Check if trip has bookings
    if (tripOwnership[0].current_travelers > 0) {
      return Response.json({ 
        error: "Cannot delete trip with existing bookings. Cancel the trip instead." 
      }, { status: 400 });
    }

    await sql`DELETE FROM trips WHERE id = ${id}`;

    return Response.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}