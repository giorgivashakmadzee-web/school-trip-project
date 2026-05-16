import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import RegistrationPreview from "@/components/RegistrationPreview";
import SignUp from "@/components/sign-up";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/lib/api";

const Index = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userEmail = sessionStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/check-user?email=${encodeURIComponent(userEmail)}`,
          );
          if (response.ok) {
            setIsSignedUp(true);
          } else {
            sessionStorage.removeItem("userEmail");
            sessionStorage.removeItem("userName");
            setIsSignedUp(false);
          }
        } catch (error) {
          console.error("Error checking user:", error);
          sessionStorage.removeItem("userEmail");
          sessionStorage.removeItem("userName");
          setIsSignedUp(false);
        }
      } else {
        setIsSignedUp(false);
      }
    };
    checkUser();
  }, []);

  const handleSignUp = (email: string) => {
    setIsSignedUp(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Services />
        <HowItWorks />
        <RegistrationPreview isSignedUp={isSignedUp} />
        <SignUp onSignUp={handleSignUp} alreadySignedUp={isSignedUp} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
