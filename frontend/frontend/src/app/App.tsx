import { useState } from "react";
import LandingPage     from "./pages/landing/LandingPage";
import OnboardingPage  from "./pages/onboarding/OnboardingPage";
import SignInPage      from "./pages/auth/SignInPage";
import SignUpPage      from "./pages/auth/SignUpPage";
import DashboardPage   from "./pages/dashboard/DashboardPage";

type Page = "landing" | "onboarding" | "signin" | "signup" | "dashboard";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  if (page === "onboarding") {
    return (
      <OnboardingPage
        onBack={() => setPage("landing")}
        onComplete={() => setPage("dashboard")}
      />
    );
  }

  if (page === "signin") {
    return (
      <SignInPage
        onGoLanding={() => setPage("landing")}
        onGoSignUp={() => setPage("signup")}
        onSuccess={() => setPage("dashboard")}
      />
    );
  }

  if (page === "signup") {
    return (
      <SignUpPage
        onGoLanding={() => setPage("landing")}
        onGoSignIn={() => setPage("signin")}
        onSuccess={() => setPage("dashboard")}
      />
    );
  }

  if (page === "dashboard") {
    return <DashboardPage onBack={() => setPage("landing")} />;
  }

  return (
    <LandingPage
      onGetStarted={() => setPage("onboarding")}
      onSignIn={() => setPage("signin")}
    />
  );
}
