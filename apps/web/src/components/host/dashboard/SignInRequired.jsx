export default function SignInRequired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Please sign in
        </h1>
        <a
          href="/account/signin"
          className="text-orange-500 hover:text-orange-600"
        >
          Sign in to access your host dashboard
        </a>
      </div>
    </div>
  );
}
