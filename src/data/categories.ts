import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-helmets",
    name: "Helmets & Visors",
    slug: "helmets",
    description: "ECE 22.06 & DOT certified full-face, modular, and open-face carbon helmets.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop",
    itemCount: 42,
    featured: true,
    subcategories: [
      {
        id: "sub-full-face",
        name: "Full Face Helmets",
        slug: "full-face-helmets",
        childCategories: [
          {
            id: "child-carbon-racing",
            name: "Carbon Racing Helmets",
            slug: "carbon-racing",
            productGroups: [
              { id: "grp-aerodynamic-spoiler", name: "Aerodynamic Track Spoilers", slug: "aerodynamic-track-spoilers" },
              { id: "grp-pinlock-ready", name: "Pinlock 120 MaxVision Ready", slug: "pinlock-ready" },
            ],
          },
          {
            id: "child-touring-integrated",
            name: "Sport Touring with Sun Visor",
            slug: "sport-touring-helmets",
            productGroups: [
              { id: "grp-integrated-intercom", name: "Intercom Bluetooth Prepared", slug: "intercom-prepared" },
              { id: "grp-anti-fog-dual", name: "Dual Shield Anti-Scratch", slug: "dual-shield-anti-scratch" },
            ],
          },
        ],
      },
      {
        id: "sub-modular-open",
        name: "Modular & Urban Open-Face",
        slug: "modular-open-face",
        childCategories: [
          {
            id: "child-vespa-heritage-open",
            name: "Heritage Vespa Jet Helmets",
            slug: "vespa-jet-helmets",
            productGroups: [
              { id: "grp-leather-trim", name: "Hand-Stitched Leather Trim", slug: "hand-stitched-leather" },
              { id: "grp-retro-goggles", name: "Retro Snap Goggle Compatible", slug: "retro-snap-goggles" },
            ],
          },
          {
            id: "child-flip-up-modular",
            name: "Flip-Up Dual Homologation",
            slug: "flip-up-modular",
            productGroups: [
              { id: "grp-p-j-certified", name: "P/J Certified Urban Locks", slug: "pj-certified" },
            ],
          },
        ],
      },
      {
        id: "sub-visor-accessories",
        name: "Visors & Comms Systems",
        slug: "visors-accessories",
        childCategories: [
          {
            id: "child-photochromic-visors",
            name: "Photochromic & Iridium Visors",
            slug: "photochromic-iridium",
            productGroups: [
              { id: "grp-gold-iridium", name: "Gold & Dark Smoke Shield", slug: "gold-dark-smoke" },
              { id: "grp-tear-off-posts", name: "Track Tear-Off Ready", slug: "track-tear-off" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-riding-gear",
    name: "Riding Gear & Protection",
    slug: "riding-gear",
    description: "Italian designed leather and textile protective jackets, racing suits, and gloves.",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=1000&auto=format&fit=crop",
    itemCount: 56,
    featured: true,
    subcategories: [
      {
        id: "sub-jackets-suits",
        name: "Jackets & One-Piece Suits",
        slug: "jackets-suits",
        childCategories: [
          {
            id: "child-leather-racing-jackets",
            name: "Bovine Leather Racing Jackets",
            slug: "leather-racing-jackets",
            productGroups: [
              { id: "grp-ce-level-2", name: "CE Level 2 Pro-Armor", slug: "ce-level-2-pro-armor" },
              { id: "grp-aerodynamic-hump", name: "Speed Hump Track Cut", slug: "speed-hump-track" },
            ],
          },
          {
            id: "child-textile-mesh-jackets",
            name: "All-Weather & Tropical Mesh Jackets",
            slug: "mesh-textile-jackets",
            productGroups: [
              { id: "grp-breathable-cordura", name: "High-Flow Cordura 600D", slug: "cordura-600d" },
              { id: "grp-waterproof-membrane", name: "Detachable Thermal & Rain Liners", slug: "detachable-thermal-rain" },
            ],
          },
        ],
      },
      {
        id: "sub-gloves",
        name: "Performance Gloves",
        slug: "riding-gloves",
        childCategories: [
          {
            id: "child-gauntlet-racing-gloves",
            name: "Full Gauntlet Carbon Track Gloves",
            slug: "gauntlet-racing-gloves",
            productGroups: [
              { id: "grp-scaphoid-protection", name: "SPS Scaphoid Palm Sliders", slug: "scaphoid-palm-sliders" },
              { id: "grp-kangaroo-palm", name: "Kangaroo Leather Palm Tactile", slug: "kangaroo-palm" },
            ],
          },
          {
            id: "child-short-cuff-urban",
            name: "Short Cuff Urban & Touring",
            slug: "short-cuff-urban-gloves",
            productGroups: [
              { id: "grp-touchscreen-fingertip", name: "Smart Touchscreen Capable", slug: "smart-touchscreen" },
            ],
          },
        ],
      },
      {
        id: "sub-riding-boots",
        name: "Boots & Riding Shoes",
        slug: "riding-boots",
        childCategories: [
          {
            id: "child-track-boots",
            name: "Magnesium Slider Racing Boots",
            slug: "racing-boots",
            productGroups: [
              { id: "grp-torsion-control", name: "Anti-Torsion Ankle Bracing", slug: "anti-torsion-bracing" },
            ],
          },
          {
            id: "child-waterproof-sneakers",
            name: "Urban Reinforced Riding Sneakers",
            slug: "urban-riding-sneakers",
            productGroups: [
              { id: "grp-d3o-ankle", name: "D3O Impact Discs Embedded", slug: "d3o-impact-discs" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-motorcycles",
    name: "Two-Wheelers & Scooters",
    slug: "motorcycles",
    description: "Exclusive Italian masterpieces from Aprilia, Vespa, and Moto Guzzi.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop",
    itemCount: 16,
    featured: true,
    subcategories: [
      {
        id: "sub-aprilia-superbikes",
        name: "Aprilia Supersport & Naked",
        slug: "aprilia-sport",
        childCategories: [
          {
            id: "child-aprilia-rs-series",
            name: "Aprilia RS Series",
            slug: "aprilia-rs-series",
            productGroups: [
              { id: "grp-rs457-racing", name: "RS 457 Twin Cylinder", slug: "rs-457-twin" },
              { id: "grp-rs125-gp", name: "RS 125 GP Replica", slug: "rs-125-gp-replica" },
            ],
          },
          {
            id: "child-tuono-series",
            name: "Aprilia Tuono Naked Streetfighters",
            slug: "tuono-series",
            productGroups: [
              { id: "grp-tuono-factory", name: "Tuono 457 Hyper-Naked", slug: "tuono-457-hyper" },
            ],
          },
        ],
      },
      {
        id: "sub-vespa-premium",
        name: "Vespa Premium Italian Scooters",
        slug: "vespa-scooters",
        childCategories: [
          {
            id: "child-vespa-primavera",
            name: "Vespa Primavera & Sprint",
            slug: "vespa-primavera-sprint",
            productGroups: [
              { id: "grp-sprint-s-tft", name: "Sprint S 150 i-Get ABS", slug: "sprint-s-150-iget" },
              { id: "grp-primavera-color", name: "Primavera 125 Touring Edition", slug: "primavera-125-touring" },
            ],
          },
          {
            id: "child-vespa-gts",
            name: "Vespa GTS SuperTech",
            slug: "vespa-gts-supertech",
            productGroups: [
              { id: "grp-gts-300-hpe", name: "GTS 300 HPE Grand Tourer", slug: "gts-300-hpe" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-performance-parts",
    name: "Performance & Exhausts",
    slug: "performance-parts",
    description: "Akrapovič, Arrow titanium exhausts, Brembo brake pads, and racing filters.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop",
    itemCount: 38,
    featured: true,
    subcategories: [
      {
        id: "sub-exhaust-systems",
        name: "Full Exhausts & Slip-Ons",
        slug: "exhaust-systems",
        childCategories: [
          {
            id: "child-titanium-slip-on",
            name: "Titanium & Carbon Slip-On Silencers",
            slug: "titanium-slip-on",
            productGroups: [
              { id: "grp-akrapovic-racing", name: "Akrapovič Track Homologated", slug: "akrapovic-track" },
              { id: "grp-arrow-pro-race", name: "Arrow Pro-Race Nichrom", slug: "arrow-pro-race" },
            ],
          },
        ],
      },
      {
        id: "sub-brakes-suspension",
        name: "Brembo Brakes & Öhlins Suspensions",
        slug: "brakes-suspension",
        childCategories: [
          {
            id: "child-brembo-calipers-pads",
            name: "Brembo Sintered Racing Pads & Discs",
            slug: "brembo-pads-discs",
            productGroups: [
              { id: "grp-rc-carbon-ceramic", name: "Carbon Ceramic Track Compound", slug: "carbon-ceramic-compound" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-apparel-lifestyle",
    name: "Rider Lifestyle & Apparel",
    slug: "apparel-lifestyle",
    description: "Official Motoplex, Aprilia Racing, and Vespa heritage apparel and merchandise.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    itemCount: 29,
    featured: false,
    subcategories: [
      {
        id: "sub-racing-hoodies-tees",
        name: "Paddock Hoodies & Polos",
        slug: "paddock-apparel",
        childCategories: [
          {
            id: "child-motogp-replica-tees",
            name: "Aprilia Racing Factory Paddock Tees",
            slug: "motogp-paddock-tees",
            productGroups: [
              { id: "grp-organic-cotton-heavy", name: "Heavyweight 240GSM Cotton", slug: "heavyweight-cotton" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-accessories-maintenance",
    name: "Accessories & Care",
    slug: "accessories-maintenance",
    description: "Motul 300V lubricants, chain maintenance, Quad Lock mounts, and bike covers.",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop",
    itemCount: 31,
    featured: false,
    subcategories: [
      {
        id: "sub-electronics-mounts",
        name: "Phone Mounts & Chargers",
        slug: "mounts-chargers",
        childCategories: [
          {
            id: "child-vibration-dampener-mounts",
            name: "Vibration Dampened Handlebar Mounts",
            slug: "vibration-dampeners",
            productGroups: [
              { id: "grp-wireless-fast-charge", name: "Wireless Qi Fast Charging Heads", slug: "wireless-charging-heads" },
            ],
          },
        ],
      },
    ],
  },
];
