

export type Tour = {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: number;
  description?: string;
  image?: string;
  rating?: number;
  tags?: string[];
};

export type FoodPlan = "standard" | "vegetarian" | "vegan" | "halal" | "none";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  students: number;
  parents: number;
  teachers: number;
  destination: string;
  menu: string;
  totalPeople: number;
  transportCost: number;
  foodCost: number;
  totalCost: number;
  userEmail: string;
  createdAt: string;
  status?: BookingStatus;
  tourId?: string;
  customer?: string;
  bus?: string;
  foodPlan?: FoodPlan;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
};

export const totalGuests = (b: Booking) => b.students + b.parents + b.teachers;

const BASE = "http://localhost:5000";
const fix = (obj: any) => ({ ...obj, id: obj._id ?? obj.id });

export const api = {
  // ---- Trips ----
  async listTours(): Promise<Tour[]> {
    const res = await fetch(`${BASE}/trip`);
    const data = await res.json();
    return data.map(fix);
  },

  async createTour(input: Omit<Tour, "id">): Promise<Tour> {
    const res = await fetch(`${BASE}/trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return fix(await res.json());
  },

  async deleteTour(id: string): Promise<void> {
    await fetch(`${BASE}/trip/${id}`, {
      method: "DELETE",
    });
  },

  async updateTour(id: string, input: Omit<Tour, "id">): Promise<Tour> {
    const res = await fetch(`${BASE}/trip/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return fix(await res.json());
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
    const res = await fetch(`${BASE}/booking/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return fix(await res.json());
  },

  // ---- Bookings ----
  async listBookings(): Promise<Booking[]> {
    const res = await fetch(`${BASE}/booking`);
    const data = await res.json();
    return data.map(fix);
  },

  async createBooking(input: Omit<Booking, "id">): Promise<Booking> {
    const res = await fetch(`${BASE}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return fix(await res.json());
  },
};

export const getImageUrl = (image: string) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${BASE}/${image}`;
};
