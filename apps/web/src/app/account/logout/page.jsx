"use client";

import { useEffect } from "react";
import useAuth from "@/utils/useAuth";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    };

    handleSignOut();
  }, [signOut]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-primary-white to-nature-paleBlue flex items-center justify-center px-6">
      <div className="bg-primary-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-nature-paleBlue rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-accent-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2 font-heading">
            Signing Out...
          </h1>
          <p className="text-text-secondary font-body">
            Thank you for using TravelTribe. You're being signed out now.
          </p>
        </div>

        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-yellow mx-auto"></div>
      </div>
    </div>
  );
}
