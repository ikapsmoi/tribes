import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Get platform analytics (admin only)
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin (you can implement admin role check here)
    // For now, we'll allow any authenticated user to see basic stats
    
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    // Get total counts
    const [
      totalUsers,
      totalTrips,
      totalBookings,
      totalRevenue,
      activeTrips,
      completedTrips
    ] = await sql.transaction([
      sql`SELECT COUNT(*) as count FROM auth_users`,
      sql`SELECT COUNT(*) as count FROM trips`,
      sql`SELECT COUNT(*) as count FROM bookings`,
      sql`
        SELECT COALESCE(SUM(amount_paid), 0) as total 
        FROM bookings 
        WHERE payment_status IN ('deposit_paid', 'fully_paid')
      `,
      sql`
        SELECT COUNT(*) as count 
        FROM trips 
        WHERE status = 'published' AND start_date > NOW()
      `,
      sql`
        SELECT COUNT(*) as count 
        FROM trips 
        WHERE status = 'completed'
      `
    ]);

    // Get recent activity (last 30 days)
    const recentActivity = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as bookings
      FROM bookings 
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;

    // Get top destinations
    const topDestinations = await sql`
      SELECT 
        destination,
        country,
        COUNT(*) as trip_count,
        SUM(current_travelers) as total_travelers
      FROM trips 
      WHERE status IN ('published', 'completed')
      GROUP BY destination, country
      ORDER BY trip_count DESC
      LIMIT 10
    `;

    // Get host performance
    const topHosts = await sql`
      SELECT 
        au.name as host_name,
        up.community_name,
        COUNT(t.id) as trip_count,
        AVG(r.rating) as avg_rating,
        SUM(t.current_travelers) as total_travelers
      FROM auth_users au
      JOIN user_profiles up ON au.id = up.user_id
      JOIN trips t ON au.id = t.host_id
      LEFT JOIN reviews r ON t.id = r.trip_id
      WHERE up.user_type = 'host'
      GROUP BY au.id, au.name, up.community_name
      ORDER BY trip_count DESC
      LIMIT 10
    `;

    // Get monthly revenue trend
    const monthlyRevenue = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(amount_paid) as revenue,
        COUNT(*) as bookings
      FROM bookings 
      WHERE payment_status IN ('deposit_paid', 'fully_paid')
      AND created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
    `;

    return Response.json({
      overview: {
        total_users: parseInt(totalUsers[0].count),
        total_trips: parseInt(totalTrips[0].count),
        total_bookings: parseInt(totalBookings[0].count),
        total_revenue: parseFloat(totalRevenue[0].total),
        active_trips: parseInt(activeTrips[0].count),
        completed_trips: parseInt(completedTrips[0].count)
      },
      recent_activity: recentActivity,
      top_destinations: topDestinations,
      top_hosts: topHosts,
      monthly_revenue: monthlyRevenue
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}