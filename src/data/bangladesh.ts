export interface DistrictOption {
  name: string;
  areas: string[];
}

export interface DivisionData {
  division: string;
  districts: Record<string, string[]>;
}

export const bangladeshDivisions: DivisionData[] = [
  {
    division: "Dhaka",
    districts: {
      "Dhaka City": ["Gulshan", "Banani", "Dhanmondi", "Uttara", "Mirpur", "Mohakhali", "Badda", "Bashundhara R/A", "Motijheel", "Mohammadpur", "Old Dhaka", "Tejgaon"],
      "Gazipur": ["Gazipur Sadar", "Tongi", "Konabari", "Chowrasta", "Kaliakair"],
      "Narayanganj": ["Narayanganj Sadar", "Fatullah", "Siddhirganj", "Sonargaon", "Rupganj"],
      "Tangail": ["Tangail Sadar", "Mirzapur", "Madhupur"],
      "Narsingdi": ["Narsingdi Sadar", "Palash", "Shibpur"],
    },
  },
  {
    division: "Chattogram",
    districts: {
      "Chattogram City": ["Agrabad", "GEC Circle", "Nasirabad", "Panchlaish", "Halishahar", "Khulshi", "Chawkbazar", "Patenga"],
      "Cox's Bazar": ["Cox's Bazar Sadar", "Kolatoli", "Ramu", "Teknaf"],
      "Cumilla": ["Cumilla Sadar", "Kandirpar", "Laksam"],
      "Feni": ["Feni Sadar", "Daganbhuiyan"],
    },
  },
  {
    division: "Sylhet",
    districts: {
      "Sylhet": ["Zindabazar", "Amberkhana", "Upashahar", "Kumarpara", "Shibganj", "Shahjalal Uposhohor"],
      "Moulvibazar": ["Moulvibazar Sadar", "Sreemangal", "Kulaura"],
      "Habiganj": ["Habiganj Sadar", "Madhabpur"],
    },
  },
  {
    division: "Rajshahi",
    districts: {
      "Rajshahi": ["Boalia", "Motihar", "Rajpara", "Shah Mokhdum"],
      "Bogura": ["Bogura Sadar", "Sherpur", "Shibganj"],
      "Pabna": ["Pabna Sadar", "Ishwardi"],
    },
  },
  {
    division: "Khulna",
    districts: {
      "Khulna": ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur"],
      "Jashore": ["Jashore Sadar", "Benapole", "Noapara"],
      "Kushtia": ["Kushtia Sadar", "Kumarkhali"],
    },
  },
  {
    division: "Barishal",
    districts: {
      "Barishal": ["Barishal Sadar", "Rupatali", "Natun Bazar"],
      "Patuakhali": ["Patuakhali Sadar", "Kuakata"],
    },
  },
  {
    division: "Rangpur",
    districts: {
      "Rangpur": ["Rangpur Sadar", "Modern Mor", "Dhap"],
      "Dinajpur": ["Dinajpur Sadar", "Fulbari"],
    },
  },
  {
    division: "Mymensingh",
    districts: {
      "Mymensingh": ["Mymensingh Sadar", "Ganginar Par", "Chorpara"],
    },
  },
];

export const mockCouriers = [
  { id: "pathao", name: "Pathao Express", estimatedDays: "24 - 48 Hours in Dhaka, 3 Days Nationwide", speed: "Fast" },
  { id: "steadfast", name: "Steadfast Courier", estimatedDays: "2 - 4 Business Days Across All 64 Districts", speed: "Reliable" },
  { id: "redx", name: "RedX Logistics", estimatedDays: "Doorstep Delivery with Live Tracking", speed: "Standard" },
];
