import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Create a new review
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      trip_id,
      booking_id,
      rating,
      review_text,
      host_rating,
      trip_rating,
      value_rating
    } = body;

    if (!trip_id || !booking_id || !rating) {
      return Response.json({ error: "Trip ID, booking ID, and rating are required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return Response.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Verify the booking belongs to the user and is completed
    const bookings = await sql`
      SELECT b.*, t.title as trip_title
      FROM bookings b
      JOIN trips t ON b.trip_id = t.id
      WHERE b.id = ${booking_id} 
      AND b.traveler_id = ${session.user.id}
      AND b.trip_id = ${trip_id}
      AND b.booking_status = 'completed'
    `;

    if (bookings.length === 0) {
      return Response.json({ 
        error: "Booking not found, doesn't belong to you, or trip not completed" 
      }, { status: 400 });
    }

    // Check if review already exists
    const existingReviews = await sql`
      SELECT id FROM reviews 
      WHERE trip_id = ${trip_id} AND traveler_id = ${session.user.id} AND booking_id = ${booking_id}
    `;

    if (existingReviews.length > 0) {
      return Response.json({ error: "You have already reviewed this trip" }, { status: 400 });
    }

    // Create the review
    const newReviews = await sql`
      INSERT INTO reviews (
        trip_id, traveler_id, booking_id, rating, review_text,
        host_rating, trip_rating, value_rating
      ) VALUES (
        ${trip_id}, ${session.user.id}, ${booking_id}, ${rating},
        ${review_text || null}, ${host_rating || null}, 
        ${trip_rating || null}, ${value_rating || null}
      )
      RETURNING *
    `;

    return Response.json({ 
      review: newReviews[0],
      message: "Review submitted successfully"
    });

  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Get reviews for a trip
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trip_id = searchParams.get('trip_id');
    const user_id = searchParams.get('user_id');

    if (!trip_id && !user_id) {
      return Response.json({ error: "Either trip_id or user_id is required" }, { status: 400 });
    }

    let query;
    let values;

    if (trip_id) {
      // Get reviews for a specific trip
      query = `
        SELECT 
          r.*,
          au.name as traveler_name,
          up.profile_image_url as traveler_image
        FROM reviews r
        JOIN auth_users au ON r.traveler_id = au.id
        LEFT JOIN user_profiles up ON r.traveler_id = up.user_id
        WHERE r.trip_id = $1
        ORDER BY r.created_at DESC
      `;
      values = [trip_id];
    } else {
      // Get reviews by a specific user
      query = `
        SELECT 
          r.*,
          t.title as trip_title,
          t.destination,
          t.country,
          t.hero_image_url
        FROM reviews r
        JOIN trips t ON r.trip_id = t.id
        WHERE r.traveler_id = $1
        ORDER BY r.created_at DESC
      `;
      values = [user_id];
    }

    const reviews = await sql(query, values);

    return Response.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}