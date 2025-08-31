import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { email, password, name, userType } = await request.json();

    if (!email || !password || !name || !userType) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM auth_users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return new Response("EmailCreateAccount", { status: 400 });
    }

    // Create user and user profile in a transaction
    const result = await sql.transaction([
      sql`
        INSERT INTO auth_users (email, name, "emailVerified")
        VALUES (${email}, ${name}, NOW())
        RETURNING id, email, name
      `,
      sql`
        INSERT INTO auth_accounts (
          "userId", 
          type, 
          provider, 
          "providerAccountId", 
          password
        )
        VALUES (
          (SELECT id FROM auth_users WHERE email = ${email}), 
          'credentials', 
          'credentials', 
          ${email}, 
          ${password}
        )
      `,
      sql`
        INSERT INTO user_profiles (user_id, role)
        VALUES (
          (SELECT id FROM auth_users WHERE email = ${email}), 
          ${userType}
        )
      `
    ]);

    return Response.json({ success: true, user: result[0][0] });

  } catch (error) {
    console.error("User creation error:", error);
    return new Response("Configuration", { status: 500 });
  }
}