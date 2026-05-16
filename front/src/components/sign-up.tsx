import { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { API_BASE_URL } from "@/lib/api";

type SignUpProps = {
  onSignUp: (email: string) => void;
  alreadySignedUp: boolean;
};

const SignUp = ({ onSignUp, alreadySignedUp }: SignUpProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedName = sessionStorage.getItem("userName");
    if (storedEmail) {
      setIsSignedUp(true);
      setWelcomeName(storedName || "");
    }
  }, []);

  useEffect(() => {
    if (alreadySignedUp) {
      setIsSignedUp(true);
    }
  }, [alreadySignedUp]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email) {
      try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userName", name);
        setIsSignedUp(true);
        setWelcomeName(name);
        onSignUp(email);
      } catch (error) {
        alert("Sign up failed. Please try again.");
        console.error(error);
      }
    }
  };

  if (isSignedUp) {
    return (
      <section className="py-20 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Welcome{welcomeName ? ` ${welcomeName}` : ""}!
            </h2>
            <p className="text-lg text-muted-foreground">
              You are now signed up.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Join Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Sign Up
          </h2>
          <p className="text-lg text-muted-foreground">Sign up</p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
