export interface BikeService {
  id: string;
  name: string;
  slug: string;
  category: "Full Overhaul" | "Maintenance" | "Performance" | "Detailing";
  tagline: string;
  badge: string;
  priceStarting: number;
  estimatedTime: string;
  image: string;
  description: string;
  checklist: string[];
  recommendedFor: string;
  warranty: string;
}

export const bikeServices: BikeService[] = [
  {
    id: "srv-master",
    name: "Bike Master Service",
    slug: "bike-master-service",
    category: "Full Overhaul",
    tagline: "Bangladesh's Most Comprehensive 52-Point Mechanical & Diagnostic Overhaul",
    badge: "Most Popular Signature Service",
    priceStarting: 4500,
    estimatedTime: "4 - 6 Hours",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    description:
      "Our premier multi-point service engineered specifically for high-compression single, twin, and four-cylinder engines. Includes ultrasonic throttle body cleaning, valve clearance measurement, hydraulic brake bleeding, electrical scan, and precision chassis alignment.",
    checklist: [
      "52-Point Comprehensive Chassis & Mechanical Inspection",
      "Ultrasonic Throttle Body & Fuel Injector De-carbonizing",
      "Valve Clearance Check & Shim Adjustment",
      "Front & Rear Hydraulic Brake Bleed with Motul DOT 5.1",
      "Front Fork Suspension Inspection & Fluid Health Check",
      "Drive Chain Deep Clean, Ultrasonic Degrease & Wax Lubrication",
      "Spark Plug Replacement / Gap Laser Calibration",
      "ECU OBD Diagnostic Scan & Fault Code Erase",
      "Steering Cone-Set Greasing & Wheel Bearing Trueing",
      "High-Pressure Foam Wash & Anti-Rust Coating Treatment",
    ],
    recommendedFor: "Every 6,000 km or prior to long highway tours across Bangladesh.",
    warranty: "30-Day / 1,000 km Service Performance Guarantee",
  },
  {
    id: "srv-periodic",
    name: "Periodic Superbike Maintenance",
    slug: "periodic-maintenance",
    category: "Maintenance",
    tagline: "Precision Lubrication, Oil Flush & Fast Pit-Stop Service",
    badge: "Routine Essential",
    priceStarting: 2200,
    estimatedTime: "60 - 90 Minutes",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
    description:
      "Express track-side quality maintenance using 100% genuine factory-sealed synthetic lubricants. Designed to keep engine temps cool and gear shifts butter-smooth in demanding Bangladesh traffic.",
    checklist: [
      "Motul 300V / 7100 100% Synthetic Engine Oil Change",
      "OEM Genuine Oil Filter Replacement with O-Ring Seal",
      "High-Flow Air Filter Cleaning / Inspection",
      "Clutch Free-Play & Throttle Cable Lubrication",
      "Brake Pad Thickness & Disc Rotor Runout Check",
      "Coolant Specific Gravity & Radiator Fin Inspection",
      "Battery Cold Cranking Amps (CCA) Health Test",
      "Tire Pressure Laser Calibration (Cold PSI)",
    ],
    recommendedFor: "Every 2,500 – 3,000 km for daily commuting and track days.",
    warranty: "Official Importer Oil Authenticity Hologram Guarantee",
  },
  {
    id: "srv-dyno-ecu",
    name: "ECU Diagnostics & Dyno Tuning",
    slug: "ecu-diagnostics-dyno-tuning",
    category: "Performance",
    tagline: "Italian Texa Diagnostic Systems & Custom Dyno Remapping",
    badge: "Track Proven Tech",
    priceStarting: 5500,
    estimatedTime: "2 - 3 Hours",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Unlock clean throttle response, eliminate low-RPM stutter, and calibrate fueling for local Bangladesh fuel octanes. Using our in-house Italian Texa diagnostic systems and precision air-fuel ratio analyzers.",
    checklist: [
      "Full Electronic Control Unit (ECU) Parameter Health Check",
      "Sensor Signal Verification (TPS, O2, MAP, Crank Angle)",
      "Air-Fuel Ratio (AFR) Wideband Lambda Logging",
      "Quickshifter & Auto-Blipper Kill-Time Micro Tuning",
      "ABS & Traction Control Module Diagnostics",
      "Exhaust Decat Mapping & Power Optimization",
      "Printed Pre- & Post-Tune Performance Graph",
    ],
    recommendedFor: "Aftermarket exhaust upgrades, rough idling, or race-day track prep.",
    warranty: "Lifetime ECU Flash Safety & OEM Revert Guarantee",
  },
  {
    id: "srv-detailing",
    name: "9H Ceramic Armor & Deep Detailing",
    slug: "ceramic-armor-detailing",
    category: "Detailing",
    tagline: "Showroom-Grade Paint Correction & Hydrophobic Nano Protection",
    badge: "Luxury Protection",
    priceStarting: 3500,
    estimatedTime: "3 - 5 Hours",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
    description:
      "Protect your machine against intense UV oxidation, acid rain, road grime, and micro-scratches. High-grade 9H ceramic coating applied on fairings, fuel tank, wheels, and heat-resistant ceramic on engine casings.",
    checklist: [
      "Snow Foam Pre-Wash & Iron Contamination Decontamination",
      "Clay Bar Treatment for Ultra-Smooth Surface Prep",
      "Dual-Action 2-Stage Swirl & Scratch Paint Correction",
      "9H Hydrophobic Nano Ceramic Coating on Painted Surfaces",
      "Heat-Resistant 800°C Ceramic Seal on Exhaust Headers",
      "UV Protective Dressing on Unpainted Plastics & Hoses",
      "Windshield & Helmet Visor Rain-Repellent Treatment",
      "Rim & Caliper Ceramic Heat Protection Coating",
    ],
    recommendedFor: "New motorcycle delivery protection and pre-season restoration.",
    warranty: "1-Year Gloss Retention & Hydrophobic Warranty",
  },
];
