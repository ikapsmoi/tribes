import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Create a new booking
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      trip_id,
      special_requests,
      emergency_contact_name,
      emergency_contact_phone,
      payment_method = 'full' // 'full' or 'deposit'
    } = body;

    if (!trip_id) {
      return Response.json({ error: "Trip ID is required" }, { status: 400 });
    }

    // Get trip details and check availability
    const trips = await sql`
      SELECT 
        t.*,
        (t.max_travelers - t.current_travelers) as spots_left
      FROM trips t
      WHERE t.id = ${trip_id} AND t.status = 'published'
    `;

    if (trips.length === 0) {
      return Response.json({ error: "Trip not found or not available" }, { status: 404 });
    }

    const trip = trips[0];

    if (trip.spots_left <= 0) {
      return Response.json({ error: "No spots available for this trip" }, { status: 400 });
    }

    // Check if user already has a booking for this trip
    const existingBookings = await sql`
      SELECT id FROM bookings 
      WHERE trip_id = ${trip_id} AND traveler_id = ${session.user.id}
      AND booking_status NOT IN ('cancelled')
    `;

    if (existingBookings.length > 0) {
      return Response.json({ error: "You already have a booking for this trip" }, { status: 400 });
    }

    // Calculate amounts
    const total_amount = parseFloat(trip.price_per_person);
    const amount_to_pay = payment_method === 'deposit' && trip.deposit_amount 
      ? parseFloat(trip.deposit_amount) 
      : total_amount;

    // Create booking
    const newBookings = await sql`
      INSERT INTO bookings (
        trip_id, traveler_id, booking_status, payment_status,
        total_amount, amount_paid, special_requests,
        emergency_contact_name, emergency_contact_phone
      ) VALUES (
        ${trip_id}, ${session.user.id}, 'pending', 'pending',
        ${total_amount}, 0, ${special_requests || null},
        ${emergency_contact_name || null}, ${emergency_contact_phone || null}
      )
      RETURNING *
    `;

    const booking = newBookings[0];

    // Return booking with payment info
    return Response.json({ 
      booking,
      payment_required: amount_to_pay,
      payment_type: payment_method,
      trip_title: trip.title
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Get user's bookings
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let whereConditions = ['b.traveler_id = $1'];
    let values = [session.user.id];
    let paramCount = 2;

    if (status) {
      whereConditions.push(`b.booking_status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }

    const query = `
      SELECT 
        b.*,
        t.title as trip_title,
        t.destination,
        t.country,
        t.start_date,
        t.end_date,
        t.hero_image_url,
        t.trip_type,
        au.name as host_name,
        up.profile_image_url as host_image
      FROM bookings b
      JOIN trips t ON b.trip_id = t.id
      JOIN auth_users au ON t.host_id = au.id
      LEFT JOIN user_profiles up ON t.host_id = up.user_id
      WHERE ${whereConditions.join(' AND ')}
      ORDER BY b.created_at DESC
    `;

    const bookings = await sql(query, values);

    return Response.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}