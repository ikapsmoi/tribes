import { useCallback } from "react";

function useAuth() {
  const callbackUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("callbackUrl")
      : null;

  const signInWithCredentials = useCallback(
    async (options) => {
      const response = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: options.email,
          password: options.password,
          callbackUrl: callbackUrl ?? options.callbackUrl ?? "/",
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Sign in failed");
      }

      if (options.redirect !== false) {
        window.location.href = callbackUrl ?? options.callbackUrl ?? "/";
      }

      return response;
    },
    [callbackUrl],
  );

  const signUpWithCredentials = useCallback(
    async (options) => {
      // First create the user account
      const createResponse = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: options.email,
          password: options.password,
          name: options.name,
          userType: options.userType,
        }),
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        throw new Error(error || "Sign up failed");
      }

      // Then sign them in
      const signInResponse = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: options.email,
          password: options.password,
          callbackUrl: callbackUrl ?? options.callbackUrl ?? "/",
        }),
      });

      if (!signInResponse.ok) {
        const error = await signInResponse.text();
        throw new Error(error || "Sign in after signup failed");
      }

      if (options.redirect !== false) {
        window.location.href = callbackUrl ?? options.callbackUrl ?? "/";
      }

      return signInResponse;
    },
    [callbackUrl],
  );

  const signInWithGoogle = useCallback(
    (options) => {
      const url = new URL("/api/auth/signin/google", window.location.origin);
      if (callbackUrl ?? options.callbackUrl) {
        url.searchParams.set("callbackUrl", callbackUrl ?? options.callbackUrl);
      }
      window.location.href = url.toString();
    },
    [callbackUrl],
  );

  const signInWithFacebook = useCallback(
    (options) => {
      const url = new URL("/api/auth/signin/facebook", window.location.origin);
      if (callbackUrl ?? options.callbackUrl) {
        url.searchParams.set("callbackUrl", callbackUrl ?? options.callbackUrl);
      }
      window.location.href = url.toString();
    },
    [callbackUrl],
  );

  const signInWithTwitter = useCallback(
    (options) => {
      const url = new URL("/api/auth/signin/twitter", window.location.origin);
      if (callbackUrl ?? options.callbackUrl) {
        url.searchParams.set("callbackUrl", callbackUrl ?? options.callbackUrl);
      }
      window.location.href = url.toString();
    },
    [callbackUrl],
  );

  const signOut = useCallback(async (options) => {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (options?.redirect !== false) {
      window.location.href = options?.callbackUrl ?? "/";
    }

    return response;
  }, []);

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signOut,
  };
}

export default useAuth;
