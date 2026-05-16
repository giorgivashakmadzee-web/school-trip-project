import { useEffect, useMemo, useState } from "react";

import {
  LayoutDashboard,
  Map,
  PlusCircle,
  CalendarCheck,
  Pencil,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Trash2,
  ChevronRight,
  Bus,
  Baby,
  GraduationCap,
  UserRound,
  Utensils,
  Mail,
  Phone,
  FileText,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import {
  api,
  totalGuests,
  type Booking,
  type Tour,
  getImageUrl,
} from "@/lib/api";
import { Description } from "@radix-ui/react-toast";

const Index = () => {
  const { theme, toggle } = useTheme();
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newTour, setNewTour] = useState({
    name: "",
    destination: "",
    price: "",
    duration: "",
  });
  const [editing, setEditing] = useState<Record<string, Tour>>({});
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    api.listTours().then(setTours);
    api.listBookings().then(setBookings);
  }, []);

  const stats = useMemo(() => {
    const revenue = bookings.reduce((sum, b) => sum + (b.totalCost ?? 0), 0);
    const guests = bookings.reduce((s, b) => s + totalGuests(b), 0);
    return {
      orders: bookings.length,
      revenue,
      guests,
      pending: bookings.filter((b) => b.status === "pending").length,
    };
  }, [bookings]);

  const handleAddTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTour.name || !newTour.destination || !newTour.price) {
      toast({
        title: "Missing fields",
        description: "Please fill out all fields.",
      });
      return;
    }
    await api.createTour({
      name: newTour.name,
      destination: newTour.destination,
      price: Number(newTour.price),
      duration: Number(newTour.duration) || 1,
    });
    setTours(await api.listTours());
    setNewTour({ name: "", destination: "", price: "", duration: "" });
    toast({ title: "Tour added ✨" });
  };

  const handleDelete = async (id: string) => {
    await api.deleteTour(id);
    setTours(await api.listTours());
    toast({ title: "Tour deleted" });
  };

  const handleSaveEdit = async (id: string) => {
    const updated = editing[id];
    if (!updated) return;
    await api.updateTour(id, updated);
    setTours(await api.listTours());
    setEditing((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    toast({ title: "Tour updated" });
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    await api.updateBookingStatus(id, status);
    const fresh = await api.listBookings();
    setBookings(fresh);
    setSelected((s) => (s ? (fresh.find((b) => b.id === s.id) ?? null) : null));
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Map, label: "Tours" },
    { icon: CalendarCheck, label: "Bookings" },
    { icon: PlusCircle, label: "Add Tour" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 min-h-screen flex-col border-r bg-card/50 backdrop-blur p-4">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center text-primary-foreground shadow-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold tracking-tight">TourAdmin</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                School trips
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t">
            <button
              onClick={toggle}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-8 max-w-full">
          <header className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage tours, bookings & revenue
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggle}
              className="md:hidden shrink-0"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            <StatCard
              icon={DollarSign}
              label="Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              hint="Confirmed orders"
              tone="success"
            />
            <StatCard
              icon={ShoppingCart}
              label="Orders"
              value={stats.orders.toString()}
              hint="Confirmed"
              tone="primary"
            />
            <StatCard
              icon={Users}
              label="Guests"
              value={stats.guests.toString()}
              hint="Total travelers"
              tone="accent"
            />
            <StatCard
              icon={TrendingUp}
              label="Pending"
              value={stats.pending.toString()}
              hint="Awaiting"
              tone="warning"
            />
          </section>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:w-auto mb-2">
              <TabsTrigger value="bookings">
                <CalendarCheck className="h-3.5 w-3.5 md:mr-1.5" />
                <span className="hidden md:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="tours">
                <Map className="h-3.5 w-3.5 md:mr-1.5" />
                <span className="hidden md:inline">Tours</span>
              </TabsTrigger>
              <TabsTrigger value="add">
                <PlusCircle className="h-3.5 w-3.5 md:mr-1.5" />
                <span className="hidden md:inline">Add</span>
              </TabsTrigger>
              <TabsTrigger value="edit">
                <Pencil className="h-3.5 w-3.5 md:mr-1.5" />
                <span className="hidden md:inline">Edit</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-primary" /> Bookings
                  </CardTitle>
                  <CardDescription>Tap a row for full details</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:px-6 md:pb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Destination
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Created
                        </TableHead>
                        <TableHead>People</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((b) => (
                        <TableRow
                          key={b.id}
                          className="cursor-pointer"
                          onClick={() => setSelected(b)}
                        >
                          <TableCell className="font-medium">
                            {b.userEmail}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {b.destination}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="gap-1">
                              <Users className="h-3 w-3" />
                              {totalGuests(b)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {b.status ? (
                              <StatusBadge status={b.status} />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tours">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((t) => (
                  <Card
                    key={t.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div
                      className="h-24 relative"
                      style={{
                        backgroundImage: getImageUrl(t.image || "")
                          ? `url(${getImageUrl(t.image || "")})`
                          : "var(--gradient-primary)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Map className="absolute right-3 bottom-3 h-12 w-12 text-primary-foreground/20 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">{t.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" /> {t.destination}
                        <span className="mx-1">·</span>
                        <Clock className="h-3 w-3" /> {t.duration} days
                        <Description></Description>
                      </div>
                      <div className="mt-3 text-lg font-bold text-primary">
                        ${t.price}
                        <span className="text-xs text-muted-foreground font-normal">
                          {" "}
                          / person
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary" /> Add New Tour
                  </CardTitle>
                  <CardDescription>Create a new tour package</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleAddTour}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newTour.name}
                        onChange={(e) =>
                          setNewTour({ ...newTour, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dest">Destination</Label>
                      <Input
                        id="dest"
                        value={newTour.destination}
                        onChange={(e) =>
                          setNewTour({
                            ...newTour,
                            destination: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($) per person</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newTour.price}
                        onChange={(e) =>
                          setNewTour({ ...newTour, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newTour.duration}
                        onChange={(e) =>
                          setNewTour({ ...newTour, duration: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" className="w-full md:w-auto">
                        <PlusCircle /> Add Tour
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pencil className="h-5 w-5 text-primary" /> Change Tours
                  </CardTitle>
                  <CardDescription>
                    Edit or remove existing tours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tours.map((t) => {
                    const draft = editing[t.id] ?? t;
                    const isEditing = !!editing[t.id];
                    return (
                      <div
                        key={t.id}
                        className="grid gap-3 md:grid-cols-5 items-end border rounded-lg p-3 hover:bg-muted/30 transition-colors"
                      >
                        <div className="space-y-1 md:col-span-2">
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={draft.name}
                            onChange={(e) =>
                              setEditing((p) => ({
                                ...p,
                                [t.id]: { ...draft, name: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Destination</Label>
                          <Input
                            value={draft.destination}
                            onChange={(e) =>
                              setEditing((p) => ({
                                ...p,
                                [t.id]: {
                                  ...draft,
                                  destination: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Price</Label>
                          <Input
                            type="number"
                            value={draft.price}
                            onChange={(e) =>
                              setEditing((p) => ({
                                ...p,
                                [t.id]: {
                                  ...draft,
                                  price: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(t.id)}
                            disabled={!isEditing}
                          >
                            <Pencil /> Save
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(t.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selected && (
            <BookingDetail
              booking={selected}
              tour={tours.find((t) => t.id === selected.tourId)}
              onStatusChange={(s) => updateStatus(selected.id, s)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const StatusBadge = ({ status }: { status?: Booking["status"] }) => {
  const map = {
    confirmed:
      "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
    pending:
      "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
  };

  if (!status) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <Badge variant="outline" className={`capitalize ${map[status]}`}>
      {status}
    </Badge>
  );
};

const BookingDetail = ({
  booking,
  tour,
  onStatusChange,
}: {
  booking: Booking;
  tour?: Tour;
  onStatusChange: (s: Booking["status"]) => void;
}) => {
  const total = totalGuests(booking);
  const revenue = booking.totalCost ?? 0;
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-xl">{booking.userEmail}</SheetTitle>
        <SheetDescription className="flex items-center gap-1.5">
          <Map className="h-3.5 w-3.5" /> {booking.destination} ·{" "}
          {new Date(booking.createdAt).toLocaleDateString()}
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-6 text-sm">
        <section>
          <h3 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Group
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <GroupStat icon={Baby} label="Students" value={booking.students} />
            <GroupStat
              icon={UserRound}
              label="Parents"
              value={booking.parents}
            />
            <GroupStat
              icon={GraduationCap}
              label="Teachers"
              value={booking.teachers}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Users className="h-3 w-3" /> Total: {total} people
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Details
          </h3>
          <Row
            icon={Bus}
            label="Transport"
            value={`$${booking.transportCost}`}
          />
          <Row icon={Utensils} label="Menu" value={booking.menu} capitalize />
          <Row icon={MapPin} label="Destination" value={booking.destination} />
        </section>

        <section>
          <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Contact
          </h3>
          <Row icon={Mail} label="Email" value={booking.userEmail} />
        </section>

        <section>
          <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Costs
          </h3>
          <Row icon={Utensils} label="Food" value={`$${booking.foodCost}`} />
          <Row
            icon={Bus}
            label="Transport"
            value={`$${booking.transportCost}`}
          />
          <Row
            icon={ShoppingCart}
            label="Total"
            value={`$${booking.totalCost}`}
          />
        </section>

        {booking.notes && (
          <section>
            <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Notes
            </h3>
            <p className="text-muted-foreground bg-muted/50 rounded-md p-3">
              {booking.notes}
            </p>
          </section>
        )}

        <section
          className="rounded-lg p-4 text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">
                Total revenue
              </div>
              <div className="text-2xl font-bold mt-1">
                ${revenue.toLocaleString()}
              </div>
            </div>
            <DollarSign className="h-8 w-8 opacity-30" />
          </div>
          <div className="text-xs opacity-80 mt-2">
            Total cost from booking data
          </div>
        </section>
      </div>
    </>
  );
};

const GroupStat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Baby;
  label: string;
  value: number;
}) => (
  <div className="rounded-lg border bg-muted/30 p-3 text-center">
    <Icon className="h-4 w-4 mx-auto text-primary mb-1" />
    <div className="text-xl font-bold">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
  </div>
);

const Row = ({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: typeof Bus;
  label: string;
  value: string | number;
  capitalize?: boolean;
}) => (
  <div className="flex justify-between items-center py-2 border-b last:border-0">
    <span className="text-muted-foreground flex items-center gap-2">
      <Icon className="h-3.5 w-3.5" /> {label}
    </span>
    <span
      className={`font-medium text-right ${capitalize ? "capitalize" : ""}`}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  hint: string;
  tone: "primary" | "success" | "warning" | "accent";
}) => {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    warning: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
    accent: "bg-purple-500/10 text-purple-500",
  };
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between">
          <div
            className={`h-9 w-9 rounded-lg flex items-center justify-center ${toneMap[tone]}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-xl md:text-2xl font-bold mt-0.5">{value}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{hint}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
