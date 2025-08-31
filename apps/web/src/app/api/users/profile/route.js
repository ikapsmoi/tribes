import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Get user profile
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profiles = await sql`
      SELECT 
        up.*,
        au.name,
        au.email,
        au.image
      FROM user_profiles up
      JOIN auth_users au ON up.user_id = au.id
      WHERE up.user_id = ${session.user.id}
    `;

    if (profiles.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ profile: profiles[0] });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Create or update user profile
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      user_type,
      bio,
      profile_image_url,
      phone,
      location,
      social_instagram,
      social_youtube,
      social_tiktok,
      social_website,
      community_name,
      community_size
    } = body;

    // Check if profile exists
    const existingProfiles = await sql`
      SELECT id FROM user_profiles WHERE user_id = ${session.user.id}
    `;

    let profile;
    
    if (existingProfiles.length > 0) {
      // Update existing profile
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (user_type !== undefined) {
        updates.push(`user_type = $${paramCount++}`);
        values.push(user_type);
      }
      if (bio !== undefined) {
        updates.push(`bio = $${paramCount++}`);
        values.push(bio);
      }
      if (profile_image_url !== undefined) {
        updates.push(`profile_image_url = $${paramCount++}`);
        values.push(profile_image_url);
      }
      if (phone !== undefined) {
        updates.push(`phone = $${paramCount++}`);
        values.push(phone);
      }
      if (location !== undefined) {
        updates.push(`location = $${paramCount++}`);
        values.push(location);
      }
      if (social_instagram !== undefined) {
        updates.push(`social_instagram = $${paramCount++}`);
        values.push(social_instagram);
      }
      if (social_youtube !== undefined) {
        updates.push(`social_youtube = $${paramCount++}`);
        values.push(social_youtube);
      }
      if (social_tiktok !== undefined) {
        updates.push(`social_tiktok = $${paramCount++}`);
        values.push(social_tiktok);
      }
      if (social_website !== undefined) {
        updates.push(`social_website = $${paramCount++}`);
        values.push(social_website);
      }
      if (community_name !== undefined) {
        updates.push(`community_name = $${paramCount++}`);
        values.push(community_name);
      }
      if (community_size !== undefined) {
        updates.push(`community_size = $${paramCount++}`);
        values.push(community_size);
      }

      updates.push(`updated_at = $${paramCount++}`);
      values.push(new Date().toISOString());

      values.push(session.user.id);
      
      const updateQuery = `
        UPDATE user_profiles 
        SET ${updates.join(', ')} 
        WHERE user_id = $${paramCount}
        RETURNING *
      `;

      const updatedProfiles = await sql(updateQuery, values);
      profile = updatedProfiles[0];
    } else {
      // Create new profile
      if (!user_type) {
        return Response.json({ error: "user_type is required for new profiles" }, { status: 400 });
      }

      const newProfiles = await sql`
        INSERT INTO user_profiles (
          user_id, user_type, bio, profile_image_url, phone, location,
          social_instagram, social_youtube, social_tiktok, social_website,
          community_name, community_size
        ) VALUES (
          ${session.user.id}, ${user_type}, ${bio || null}, ${profile_image_url || null},
          ${phone || null}, ${location || null}, ${social_instagram || null},
          ${social_youtube || null}, ${social_tiktok || null}, ${social_website || null},
          ${community_name || null}, ${community_size || 0}
        )
        RETURNING *
      `;
      profile = newProfiles[0];
    }

    return Response.json({ profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}