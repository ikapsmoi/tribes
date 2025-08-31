import { auth } from "@/auth";

export async function GET(request) {
  const session = await auth();

  if (!session?.user) {
    return new Response(
      `
			<html>
				<body>
					<script>
						window.parent.postMessage({ type: 'AUTH_ERROR', error: 'Unauthorized' }, '*');
					</script>
				</body>
			</html>
			`,
      {
        status: 401,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }

  const message = {
    type: "AUTH_SUCCESS",
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  };

  return new Response(
    `
		<html>
			<body>
				<script>
					window.parent.postMessage(${JSON.stringify(message)}, '*');
				</script>
			</body>
		</html>
		`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
