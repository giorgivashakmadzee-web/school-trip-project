import React from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

interface Destination {
  name: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  tags: string[];
}

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  // ✅ universal image handler
  const getImageUrl = (image: string) => {
    if (!image) return "/fallback.jpg";
    if (image.startsWith("images")) return image;
    return `${API_BASE_URL}/${image}`;
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/trip`);
        const data = await response.json();
        console.log(data);
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section id="destinations" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Popular Destinations
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Discover Georgia's{" "}
            <span className="text-gradient">Hidden Treasures</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Choose from our curated selection of educational and adventure
            destinations perfect for unforgettable school trips.
          </p>
        </div>

        {/* თუ ცარიელია */}
        {destinations.length === 0 ? (
          <div className="text-center text-muted-foreground">
            მონაცემები ვერ მოიძებნა 😢
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div
                key={destination.name || index}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(destination.image)}
                    alt={destination.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/fallback.jpg";
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-golden text-golden-foreground text-sm font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {destination.rating}
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {destination.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {destination.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
