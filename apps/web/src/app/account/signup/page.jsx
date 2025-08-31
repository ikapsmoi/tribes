"use client";

import { useState } from "react";
import useAuth from "@/utils/useAuth";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Users,
  Camera,
} from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: User Type Selection
  const [userType, setUserType] = useState("");

  const { signUpWithCredentials } = useAuth();

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleUserTypeSubmit = async (e) => {
    e.preventDefault();
    if (!userType) {
      setError("Please select your account type");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        userType,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-up method. Try using that instead.",
        CredentialsSignin:
          "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration:
          "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-primary-white to-nature-paleBlue">
      {/* Header */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() =>
              step === 1 ? (window.location.href = "/") : setStep(1)
            }
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="font-bold text-2xl text-text-primary font-heading">
            TravelTribe
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 mb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1
                  ? "bg-accent-yellow text-primary-black"
                  : "bg-ui-border text-text-light"
              }`}
            >
              1
            </div>
            <div
              className={`h-1 w-16 ${step >= 2 ? "bg-accent-yellow" : "bg-ui-border"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2
                  ? "bg-accent-yellow text-primary-black"
                  : "bg-ui-border text-text-light"
              }`}
            >
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-secondary font-body">
            <span>Basic Info</span>
            <span>Account Type</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-primary-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
                    Join TravelTribe
                  </h1>
                  <p className="text-text-secondary font-body">
                    Create your account to start your journey
                  </p>
                </div>

                <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all font-body"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all font-body"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password (min. 6 characters)"
                        className="w-full pl-10 pr-12 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all font-body"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600 font-body">{error}</p>
                    </div>
                  )}

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full bg-accent-yellow hover:bg-accent-gold text-primary-black font-semibold py-3 px-4 rounded-lg transition-colors duration-normal font-body"
                  >
                    Continue
                  </button>
                </form>
              </>
            )}

            {/* Step 2: User Type Selection */}
            {step === 2 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
                    Choose Your Path
                  </h1>
                  <p className="text-text-secondary font-body">
                    How would you like to use TravelTribe?
                  </p>
                </div>

                <form onSubmit={handleUserTypeSubmit} className="space-y-4">
                  {/* Host Option */}
                  <div
                    onClick={() => setUserType("host")}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      userType === "host"
                        ? "border-accent-yellow bg-nature-paleBlue"
                        : "border-ui-border hover:border-text-secondary"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          userType === "host"
                            ? "bg-accent-yellow text-primary-black"
                            : "bg-ui-border text-text-secondary"
                        }`}
                      >
                        <Camera className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1 font-heading">
                          I'm a Host
                        </h3>
                        <p className="text-sm text-text-secondary font-body">
                          I'm a content creator, community leader, or influencer
                          who wants to host group trips for my audience.
                        </p>
                        <ul className="mt-2 text-xs text-text-light space-y-1 font-body">
                          <li>• Create and manage group trips</li>
                          <li>• Earn income from hosting</li>
                          <li>• Build deeper community connections</li>
                        </ul>
                      </div>
                      <input
                        type="radio"
                        name="userType"
                        value="host"
                        checked={userType === "host"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Traveler Option */}
                  <div
                    onClick={() => setUserType("traveler")}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      userType === "traveler"
                        ? "border-accent-yellow bg-nature-paleBlue"
                        : "border-ui-border hover:border-text-secondary"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          userType === "traveler"
                            ? "bg-accent-yellow text-primary-black"
                            : "bg-ui-border text-text-secondary"
                        }`}
                      >
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1 font-heading">
                          I'm a Traveler
                        </h3>
                        <p className="text-sm text-text-secondary font-body">
                          I want to discover and join amazing group trips with
                          like-minded people around the world.
                        </p>
                        <ul className="mt-2 text-xs text-text-light space-y-1 font-body">
                          <li>• Browse and book group trips</li>
                          <li>• Connect with travel communities</li>
                          <li>• Safe and curated experiences</li>
                        </ul>
                      </div>
                      <input
                        type="radio"
                        name="userType"
                        value="traveler"
                        checked={userType === "traveler"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600 font-body">{error}</p>
                    </div>
                  )}

                  {/* Create Account Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent-yellow hover:bg-accent-gold disabled:bg-text-light text-primary-black font-semibold py-3 px-4 rounded-lg transition-colors duration-normal font-body"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>
              </>
            )}

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <span className="text-sm text-text-secondary font-body">
                Already have an account?{" "}
              </span>
              <a
                href={`/account/signin${typeof window !== "undefined" ? window.location.search : ""}`}
                className="text-accent-yellow hover:text-accent-gold font-medium transition-colors text-sm font-body"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
