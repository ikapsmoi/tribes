import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Save/unsave a trip
export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check if trip exists
    const trips = await sql`
      SELECT id FROM trips WHERE id = ${id}
    `;

    if (trips.length === 0) {
      return Response.json({ error: "Trip not found" }, { status: 404 });
    }

    // Check if already saved
    const existingSave = await sql`
      SELECT id FROM saved_trips 
      WHERE user_id = ${session.user.id} AND trip_id = ${id}
    `;

    if (existingSave.length > 0) {
      return Response.json({ error: "Trip already saved" }, { status: 400 });
    }

    // Save the trip
    await sql`
      INSERT INTO saved_trips (user_id, trip_id)
      VALUES (${session.user.id}, ${id})
    `;

    return Response.json({ message: "Trip saved successfully" });
  } catch (error) {
    console.error("Error saving trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Remove saved trip
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    await sql`
      DELETE FROM saved_trips 
      WHERE user_id = ${session.user.id} AND trip_id = ${id}
    `;

    return Response.json({ message: "Trip removed from saved list" });
  } catch (error) {
    console.error("Error removing saved trip:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}