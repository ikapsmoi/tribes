export default function SignInRequired() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4 font-heading">
          Please sign in
        </h1>
        <a
          href="/account/signin"
          className="text-accent-yellow hover:text-accent-gold font-body"
        >
          Sign in to access your dashboard
        </a>
      </div>
    </div>
  );
}
