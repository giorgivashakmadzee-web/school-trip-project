import { useState } from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  MapPin,
  Utensils,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { API_BASE_URL } from "@/lib/api";

type RegistrationPreviewProps = {
  isSignedUp: boolean;
};

const RegistrationPreview = ({ isSignedUp }: RegistrationPreviewProps) => {
  const [students, setStudents] = useState(25);
  const [parents, setParents] = useState(5);
  const [teachers, setTeachers] = useState(2);
  const [destination, setDestination] = useState("sataflia");
  const [menu, setMenu] = useState("traditional");

  const destinations = [
    { id: "sataflia", name: "Sataflia", price: 15 },
    { id: "gelati", name: "Gelati Monastery", price: 12 },
    { id: "signagi", name: "Signagi", price: 20 },
    { id: "motsameta", name: "Motsameta", price: 10 },
  ];

  const menus = [
    { id: "traditional", name: "Georgian Traditional", price: 8 },
    { id: "international", name: "International Kids", price: 10 },
    { id: "healthy", name: "Healthy Choice", price: 12 },
    { id: "vegetarian", name: "Vegetarian", price: 9 },
  ];

  const totalPeople = students + parents + teachers;
  const selectedDestination = destinations.find((d) => d.id === destination);
  const selectedMenu = menus.find((m) => m.id === menu);

  const transportCost = totalPeople * (selectedDestination?.price || 0);
  const foodCost = totalPeople * (selectedMenu?.price || 0);
  const totalCost = transportCost + foodCost;

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Quick Quote
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Plan Your <span className="text-gradient">School Trip</span> Now
          </h2>
          <p className="text-lg text-muted-foreground">
            Fill in your trip details and get an instant estimate. Our team will
            contact you with a detailed proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">
              Trip Details
            </h3>

            {/* Participants */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">Students</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStudents(Math.max(1, students - 1))}
                    className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center font-bold text-foreground transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-display font-bold text-xl">
                    {students}
                  </span>
                  <button
                    onClick={() => setStudents(students + 1)}
                    className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center font-bold text-primary-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-foreground">Parents</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setParents(Math.max(0, parents - 1))}
                    className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center font-bold text-foreground transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-display font-bold text-xl">
                    {parents}
                  </span>
                  <button
                    onClick={() => setParents(parents + 1)}
                    className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center font-bold text-primary-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nature/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-nature" />
                  </div>
                  <span className="font-medium text-foreground">Teachers</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTeachers(Math.max(1, teachers - 1))}
                    className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center font-bold text-foreground transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-display font-bold text-xl">
                    {teachers}
                  </span>
                  <button
                    onClick={() => setTeachers(teachers + 1)}
                    className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center font-bold text-primary-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                Destination
              </label>
              <div className="grid grid-cols-2 gap-3">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setDestination(dest.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      destination === dest.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium text-foreground block">
                      {dest.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ₾{dest.price}/person
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <Utensils className="w-4 h-4 text-accent" />
                Food Menu
              </label>
              <div className="grid grid-cols-2 gap-3">
                {menus.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMenu(m.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      menu === m.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <span className="font-medium text-foreground block">
                      {m.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ₾{m.price}/person
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-primary to-sky rounded-3xl p-8 text-primary-foreground">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6" />
              <h3 className="text-2xl font-display font-bold">Trip Summary</h3>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span className="opacity-80">Total Participants</span>
                <span className="font-display font-bold text-2xl">
                  {totalPeople}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span className="opacity-80">Destination</span>
                <span className="font-medium">{selectedDestination?.name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span className="opacity-80">Menu Selection</span>
                <span className="font-medium">{selectedMenu?.name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span className="opacity-80">Transport Cost</span>
                <span className="font-medium">₾{transportCost}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span className="opacity-80">Food Cost</span>
                <span className="font-medium">₾{foodCost}</span>
              </div>
            </div>

            <div className="bg-primary-foreground/10 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">Estimated Total</span>
                <span className="text-4xl font-display font-bold">
                  ₾{totalCost}
                </span>
              </div>
              <p className="text-sm opacity-70 mt-2">
                *Final price may vary based on specific requirements
              </p>
            </div>

            <Button
              size="lg"
              className="w-full bg-white border border-white text-primary rounded-lg hover:bg-gray-50"
              disabled={!isSignedUp}
              onClick={async () => {
                if (!isSignedUp) {
                  alert("Please sign up first to request a detailed quote.");
                  return;
                }
                const userEmail = sessionStorage.getItem("userEmail");
                await fetch(`${API_BASE_URL}/booking`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    students,
                    parents,
                    teachers,
                    destination,
                    menu,
                    totalPeople,
                    transportCost,
                    foodCost,
                    totalCost,
                    userEmail,
                  }),
                });
                alert("Booking saved!");
              }}
            >
              Request Detailed Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPreview;
