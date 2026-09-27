export interface Dealership {
  id: string;
  name: string;
  code: string;
  tagline: string;
  badge: string;
  city: string;
  division: string;
  address: string;
  landmark: string;
  phone: string;
  hotline: string;
  email: string;
  hours: string;
  image: string;
  googleMapUrl: string;
  facilities: string[];
  serviceBays: number;
  featured: boolean;
}

export const dealerships: Dealership[] = [
  {
    id: "dealership-gulshan",
    name: "Motoplex Flagship 3S Center — Gulshan-2",
    code: "MPX-DHAKA-01",
    tagline: "Official 3S Showroom, Master Workshop & High-Performance Dyno Lab",
    badge: "Flagship 3S Center",
    city: "Dhaka",
    division: "Dhaka",
    address: "House 14, Road 112, Gulshan-2, Dhaka 1212",
    landmark: "Beside Gulshan Club & Pink City Mall",
    phone: "+880 1711-234567",
    hotline: "+880 1700-MOTOPLEX (Ext. 1)",
    email: "gulshan@motoplexbd.com",
    hours: "10:00 AM – 09:00 PM (7 Days Open)",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    googleMapUrl: "https://maps.google.com/?q=Gulshan-2+Dhaka",
    facilities: [
      "Aprilia & Vespa Authorized Showroom",
      "5-Bay Master Service Workshop",
      "In-House Chassis Dyno Room",
      "Shoei & AGV Certified Helmet Lab",
      "VIP Rider Lounge with High-Speed Wi-Fi & Espresso Bar",
      "Dedicated Spare Parts Counter",
    ],
    serviceBays: 5,
    featured: true,
  },
  {
    id: "dealership-uttara",
    name: "Motoplex Experience & Quick-Service Hub — Uttara",
    code: "MPX-DHAKA-02",
    tagline: "North Dhaka Sales Boutique & Express Pit-Stop Service",
    badge: "Express Hub",
    city: "Dhaka",
    division: "Dhaka",
    address: "Plot 28, Sector 7, Jasimuddin Avenue, Uttara, Dhaka 1230",
    landmark: "2 Minutes from Uttara Sector 7 Park",
    phone: "+880 1722-MOTOPLEX",
    hotline: "+880 1700-MOTOPLEX (Ext. 2)",
    email: "uttara@motoplexbd.com",
    hours: "10:30 AM – 08:30 PM (Saturday – Thursday)",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
    googleMapUrl: "https://maps.google.com/?q=Uttara+Sector+7+Dhaka",
    facilities: [
      "Motorcycle & Scooter Experience Center",
      "3-Bay Express Maintenance Station",
      "Genuine Motul & OEM Oil Depot",
      "Tire Fitting & Dynamic Wheel Balancing",
      "Riding Jackets & Gloves Boutique",
    ],
    serviceBays: 3,
    featured: true,
  },
  {
    id: "dealership-chattogram",
    name: "Motoplex Port City Flagship — Chattogram",
    code: "MPX-CTG-01",
    tagline: "Commercial Capital's Premier Superbike & Performance Hub",
    badge: "Regional Flagship",
    city: "Chattogram",
    division: "Chittagong",
    address: "142/B, GEC Circle, CDA Avenue, Chattogram 4000",
    landmark: "Opposite Peninsula Hotel, GEC More",
    phone: "+880 1733-MOTOPLEX",
    hotline: "+880 1700-MOTOPLEX (Ext. 3)",
    email: "chattogram@motoplexbd.com",
    hours: "10:00 AM – 08:30 PM (7 Days Open)",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=1200&auto=format&fit=crop",
    googleMapUrl: "https://maps.google.com/?q=GEC+Circle+Chittagong",
    facilities: [
      "Full Superbike & Scooter Lineup Display",
      "4-Bay High-Compression Service Bay",
      "Texa OBD Electronic Scanner Center",
      "Akrapovic & Arrow Exhaust Fitting Facility",
      "Highway Tour Inspection Pit-Stop",
    ],
    serviceBays: 4,
    featured: true,
  },
];
