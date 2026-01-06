import beachParadise from '@/assets/beach-paradise.jpg';
import sigiriyaFortress from '@/assets/sigiriya-fortress.jpg';
import ellaTrain from '@/assets/ella-train.jpg';
import yalaLeopard from '@/assets/yala-leopard.jpg';
import surfAdventure from '@/assets/surf-adventure.jpg';
import mirissaSunset from '@/assets/mirissa-sunset.jpg';
import kandyTemple from '@/assets/kandy-temple.jpg';
import teaPlantation from '@/assets/tea-plantation.jpg';
import waterfall from '@/assets/waterfall.jpg';
import snorkeling from '@/assets/snorkeling.jpg';

export interface TourDay {
  day: number;
  title: string;
  description: string;
  image: string;
  location: string;
  activities: string[];
  accommodation?: string;
}

export interface Tour {
  id: string;
  name: string;
  duration: { days: number; nights: number };
  summary: string;
  route: string[];
  tags: string[];
  heroImage: string;
  highlights: string[];
  placesToStay: { location: string; hotel: string; type: string }[];
  itinerary: TourDay[];
}

export interface DayTour {
  id: string;
  name: string;
  location: string;
  summary: string;
  highlights: string[];
  heroImage: string;
  duration: string;
  tags: string[];
}

export const tours: Tour[] = [
  {
    id: 'classic-sri-lanka',
    name: 'Classic Sri Lanka Discovery',
    duration: { days: 12, nights: 11 },
    summary: 'The ultimate journey through Sri Lanka\'s cultural heart, misty highlands, wild safaris, and tropical beaches. Experience ancient wonders, scenic train rides, and unforgettable wildlife encounters.',
    route: ['Colombo', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella', 'Yala', 'Mirissa', 'Bentota'],
    tags: ['culture', 'wildlife', 'nature', 'beach'],
    heroImage: sigiriyaFortress,
    highlights: [
      'Climb the ancient Sigiriya Rock Fortress',
      'Scenic train ride through tea country',
      'Safari at Yala National Park',
      'Temple of the Sacred Tooth Relic',
      'Whale watching in Mirissa',
      'Beach relaxation in Bentota'
    ],
    placesToStay: [
      { location: 'Colombo', hotel: 'Shangri-La Colombo', type: '5-Star Luxury' },
      { location: 'Sigiriya', hotel: 'Aliya Resort & Spa', type: 'Boutique Resort' },
      { location: 'Kandy', hotel: 'Earl\'s Regency', type: '5-Star Hotel' },
      { location: 'Nuwara Eliya', hotel: 'Heritance Tea Factory', type: 'Heritage Hotel' },
      { location: 'Ella', hotel: '98 Acres Resort', type: 'Eco Retreat' },
      { location: 'Yala', hotel: 'Cinnamon Wild Yala', type: 'Safari Lodge' },
      { location: 'Mirissa', hotel: 'Lantern Boutique Hotel', type: 'Beach Boutique' },
      { location: 'Bentota', hotel: 'Taj Bentota Resort', type: '5-Star Beach Resort' },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Colombo',
        description: 'Arrive at Bandaranaike International Airport where your personal guide awaits. Transfer to your boutique hotel in Colombo. Evening city orientation walk through the historic Fort district and vibrant Pettah markets.',
        image: beachParadise,
        location: 'Colombo',
        activities: ['Airport pickup', 'City tour', 'Local dinner'],
        accommodation: 'Shangri-La Colombo'
      },
      {
        day: 2,
        title: 'Journey to Sigiriya',
        description: 'Drive through the scenic countryside to the Cultural Triangle. Visit the magnificent Dambulla Cave Temple with its stunning Buddha statues. Afternoon at leisure to explore the village by bicycle or relax by the pool.',
        image: sigiriyaFortress,
        location: 'Sigiriya',
        activities: ['Dambulla Cave Temple', 'Village cycling', 'Sunset views'],
        accommodation: 'Aliya Resort & Spa'
      },
      {
        day: 3,
        title: 'Sigiriya Rock Fortress',
        description: 'Early morning climb of the iconic Sigiriya Rock Fortress, a UNESCO World Heritage Site. Marvel at the ancient frescoes and water gardens. Afternoon visit to Polonnaruwa ancient city with its remarkable ruins.',
        image: sigiriyaFortress,
        location: 'Sigiriya',
        activities: ['Rock fortress climb', 'Ancient frescoes', 'Polonnaruwa ruins'],
        accommodation: 'Aliya Resort & Spa'
      },
      {
        day: 4,
        title: 'Royal Kandy',
        description: 'Drive to Kandy, passing through spice gardens. Visit the sacred Temple of the Tooth Relic. Experience a traditional Kandyan dance performance. Evening stroll around Kandy Lake.',
        image: kandyTemple,
        location: 'Kandy',
        activities: ['Temple of the Tooth', 'Spice garden', 'Cultural dance show'],
        accommodation: 'Earl\'s Regency'
      },
      {
        day: 5,
        title: 'Tea Country Highlands',
        description: 'Journey to Nuwara Eliya through emerald tea plantations. Visit a working tea factory and learn the art of Ceylon tea. Explore the charming colonial-era town known as "Little England."',
        image: teaPlantation,
        location: 'Nuwara Eliya',
        activities: ['Tea factory tour', 'Tea tasting', 'Colonial town walk'],
        accommodation: 'Heritance Tea Factory'
      },
      {
        day: 6,
        title: 'Scenic Train to Ella',
        description: 'Board the famous blue train for one of the world\'s most scenic rail journeys. Wind through misty mountains, tea estates, and dramatic bridges. Arrive in the laid-back town of Ella.',
        image: ellaTrain,
        location: 'Ella',
        activities: ['Scenic train ride', 'Mountain views', 'Nine Arches Bridge'],
        accommodation: '98 Acres Resort'
      },
      {
        day: 7,
        title: 'Ella Adventures',
        description: 'Sunrise hike to Little Adam\'s Peak for panoramic views. Visit the iconic Nine Arches Bridge. Afternoon waterfall swim at Ravana Falls. Evening cooking class with a local family.',
        image: waterfall,
        location: 'Ella',
        activities: ['Hiking', 'Waterfall swim', 'Cooking class'],
        accommodation: '98 Acres Resort'
      },
      {
        day: 8,
        title: 'Wild Yala',
        description: 'Drive to Yala National Park, home to the world\'s highest density of leopards. Afternoon safari through diverse landscapes searching for elephants, leopards, and exotic birds.',
        image: yalaLeopard,
        location: 'Yala',
        activities: ['Wildlife safari', 'Leopard spotting', 'Bush dinner'],
        accommodation: 'Cinnamon Wild Yala'
      },
      {
        day: 9,
        title: 'Dawn Safari & Coastal Journey',
        description: 'Early morning safari to catch wildlife at their most active. After breakfast, drive to the southern coast and the charming beach town of Mirissa. Sunset on the beach.',
        image: yalaLeopard,
        location: 'Mirissa',
        activities: ['Morning safari', 'Beach arrival', 'Sunset drinks'],
        accommodation: 'Lantern Boutique Hotel'
      },
      {
        day: 10,
        title: 'Whale Watching & Beach Life',
        description: 'Optional early morning whale watching excursion to see blue whales and dolphins. Rest of the day at leisure for beach relaxation, snorkeling, or exploring the coast.',
        image: mirissaSunset,
        location: 'Mirissa',
        activities: ['Whale watching', 'Beach relaxation', 'Snorkeling'],
        accommodation: 'Lantern Boutique Hotel'
      },
      {
        day: 11,
        title: 'Golden Beaches of Bentota',
        description: 'Transfer to Bentota along the scenic coastal road. Afternoon water sports or spa treatments. Farewell dinner at a beachfront restaurant.',
        image: beachParadise,
        location: 'Bentota',
        activities: ['Water sports', 'Spa', 'Farewell dinner'],
        accommodation: 'Taj Bentota Resort'
      },
      {
        day: 12,
        title: 'Farewell Sri Lanka',
        description: 'Final morning to enjoy the beach. Transfer to the airport for your departure, taking home memories of an unforgettable journey through the pearl of the Indian Ocean.',
        image: beachParadise,
        location: 'Colombo Airport',
        activities: ['Beach time', 'Airport transfer', 'Departure']
      }
    ]
  },
  {
    id: 'surf-beach-adventure',
    name: 'Surf & Beach Adventure',
    duration: { days: 10, nights: 9 },
    summary: 'Ride world-class waves from Arugam Bay to Hikkaduwa, explore hidden beaches, and embrace the laid-back surf culture of Sri Lanka\'s legendary coastlines.',
    route: ['Colombo', 'Arugam Bay', 'Mirissa', 'Weligama', 'Hikkaduwa'],
    tags: ['surf', 'beach', 'adventure', 'relaxation'],
    heroImage: surfAdventure,
    highlights: [
      'Surf legendary Arugam Bay breaks',
      'Learn to surf in Weligama',
      'Whale watching in Mirissa',
      'Hidden beach discoveries',
      'Beach parties and sunsets',
      'Snorkeling in Hikkaduwa'
    ],
    placesToStay: [
      { location: 'Arugam Bay', hotel: 'Stardust Beach Hotel', type: 'Surf Camp' },
      { location: 'Mirissa', hotel: 'Mandara Resort', type: 'Beachfront Resort' },
      { location: 'Weligama', hotel: 'Cape Weligama', type: 'Luxury Cliff Resort' },
      { location: 'Hikkaduwa', hotel: 'Hikka Tranz by Cinnamon', type: 'Beach Hotel' },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & East Coast Bound',
        description: 'Arrive in Colombo and head straight to the legendary surf destination of Arugam Bay. Long scenic drive through the eastern province. Evening surf check and beach dinner.',
        image: surfAdventure,
        location: 'Arugam Bay',
        activities: ['Airport transfer', 'Scenic drive', 'Beach dinner'],
        accommodation: 'Stardust Beach Hotel'
      },
      {
        day: 2,
        title: 'Arugam Bay Surf Days',
        description: 'Full day of surfing at Main Point or Whiskey Point. Professional surf coaching available. Evening beach yoga and fresh seafood dinner.',
        image: surfAdventure,
        location: 'Arugam Bay',
        activities: ['Surfing', 'Beach yoga', 'Seafood dinner'],
        accommodation: 'Stardust Beach Hotel'
      },
      {
        day: 3,
        title: 'Surf Safari',
        description: 'Explore different breaks along the coast. Visit Pottuvil Point for advanced surfers or Peanut Farm for mellow waves. Sunset session and bonfire on the beach.',
        image: surfAdventure,
        location: 'Arugam Bay',
        activities: ['Surf safari', 'Beach bonfire', 'Stargazing'],
        accommodation: 'Stardust Beach Hotel'
      },
      {
        day: 4,
        title: 'Lagoon & Wildlife',
        description: 'Morning surf session. Afternoon lagoon safari to spot crocodiles and exotic birds. Optional visit to nearby Kumana National Park.',
        image: yalaLeopard,
        location: 'Arugam Bay',
        activities: ['Morning surf', 'Lagoon safari', 'Wildlife spotting'],
        accommodation: 'Stardust Beach Hotel'
      },
      {
        day: 5,
        title: 'Journey to the South',
        description: 'Scenic drive across the island to the southern coast. Stop at Ella for lunch with mountain views. Arrive in Mirissa as the sun sets over the Indian Ocean.',
        image: ellaTrain,
        location: 'Mirissa',
        activities: ['Scenic drive', 'Ella stopover', 'Sunset beach'],
        accommodation: 'Mandara Resort'
      },
      {
        day: 6,
        title: 'Mirissa Magic',
        description: 'Optional early morning whale watching. Learn to paddleboard or kayak. Explore the fishing harbor and enjoy fresh catch for lunch. Sunset from Parrot Rock.',
        image: mirissaSunset,
        location: 'Mirissa',
        activities: ['Whale watching', 'Paddleboarding', 'Sunset views'],
        accommodation: 'Mandara Resort'
      },
      {
        day: 7,
        title: 'Weligama Surf School',
        description: 'Perfect beach for learning to surf. Professional lessons for beginners or board rental for experienced surfers. Visit the famous stilt fishermen. Night market exploration.',
        image: surfAdventure,
        location: 'Weligama',
        activities: ['Surf lessons', 'Stilt fishermen', 'Night market'],
        accommodation: 'Cape Weligama'
      },
      {
        day: 8,
        title: 'Galle & Coastal Cruise',
        description: 'Morning visit to historic Galle Fort, a UNESCO World Heritage Site. Coastal drive to Hikkaduwa with stops at hidden beaches. Sunset snorkeling at Coral Beach.',
        image: beachParadise,
        location: 'Hikkaduwa',
        activities: ['Galle Fort tour', 'Beach hopping', 'Snorkeling'],
        accommodation: 'Hikka Tranz by Cinnamon'
      },
      {
        day: 9,
        title: 'Hikkaduwa Beach Day',
        description: 'Final full day of ocean adventures. Surf the reef break, snorkel with sea turtles, or simply relax on the golden sand. Farewell dinner with ocean views.',
        image: beachParadise,
        location: 'Hikkaduwa',
        activities: ['Surfing', 'Sea turtle snorkeling', 'Beach relaxation'],
        accommodation: 'Hikka Tranz by Cinnamon'
      },
      {
        day: 10,
        title: 'Departure',
        description: 'Morning beach time before transfer to Colombo airport. Depart with sun-kissed memories and the rhythm of the ocean in your heart.',
        image: beachParadise,
        location: 'Colombo Airport',
        activities: ['Beach time', 'Airport transfer', 'Departure']
      }
    ]
  },
  {
    id: 'luxury-coastal-escape',
    name: 'Tropical Coastal Luxury',
    duration: { days: 8, nights: 7 },
    summary: 'A refined journey along Sri Lanka\'s pristine southern coast, staying in boutique beach resorts, indulging in spa treatments, and discovering hidden coastal gems.',
    route: ['Colombo', 'Galle', 'Tangalle', 'Mirissa', 'Bentota'],
    tags: ['beach', 'relaxation', 'nature', 'culture'],
    heroImage: beachParadise,
    highlights: [
      'Boutique beach resort stays',
      'Historic Galle Fort exploration',
      'Private beach experiences',
      'Luxury spa treatments',
      'Sunset yacht cruise',
      'Fine dining experiences'
    ],
    placesToStay: [
      { location: 'Galle', hotel: 'Amangalla', type: '5-Star Heritage' },
      { location: 'Tangalle', hotel: 'Anantara Peace Haven', type: 'Luxury Resort' },
      { location: 'Mirissa', hotel: 'Sri Sharavi Beach Villas', type: 'Private Villas' },
      { location: 'Bentota', hotel: 'Saman Villas', type: 'Boutique Luxury' },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Elegant Arrival',
        description: 'VIP airport welcome and private transfer to Galle in luxury vehicle. Check into your oceanfront suite. Evening champagne sunset on the terrace.',
        image: beachParadise,
        location: 'Galle',
        activities: ['VIP transfer', 'Resort check-in', 'Champagne sunset'],
        accommodation: 'Amangalla'
      },
      {
        day: 2,
        title: 'Galle Fort Discovery',
        description: 'Private guided tour of UNESCO-listed Galle Fort. Explore boutique shops, art galleries, and charming cafes. Afternoon spa treatment at your resort.',
        image: beachParadise,
        location: 'Galle',
        activities: ['Fort tour', 'Boutique shopping', 'Spa treatment'],
        accommodation: 'Amangalla'
      },
      {
        day: 3,
        title: 'Secret Beaches of Tangalle',
        description: 'Scenic coastal drive to Tangalle, stopping at pristine hidden beaches. Check into an exclusive eco-resort. Private dinner on the beach under the stars.',
        image: beachParadise,
        location: 'Tangalle',
        activities: ['Beach hopping', 'Eco-resort', 'Private beach dinner'],
        accommodation: 'Anantara Peace Haven'
      },
      {
        day: 4,
        title: 'Wellness & Nature',
        description: 'Morning yoga overlooking the ocean. Visit a sea turtle conservation project. Afternoon at leisure for swimming and sunbathing. Ayurvedic massage at sunset.',
        image: beachParadise,
        location: 'Tangalle',
        activities: ['Yoga', 'Turtle conservation', 'Ayurvedic spa'],
        accommodation: 'Anantara Peace Haven'
      },
      {
        day: 5,
        title: 'Mirissa Paradise',
        description: 'Transfer to Mirissa\'s palm-fringed beaches. Afternoon paddleboarding or simply float in the warm waters. Sunset cocktails at Parrot Rock.',
        image: mirissaSunset,
        location: 'Mirissa',
        activities: ['Beach transfer', 'Water activities', 'Sunset cocktails'],
        accommodation: 'Sri Sharavi Beach Villas'
      },
      {
        day: 6,
        title: 'Ocean Encounters',
        description: 'Optional sunrise whale watching expedition. Late breakfast and beach relaxation. Private cooking class featuring local seafood. Moonlit beach walk.',
        image: mirissaSunset,
        location: 'Mirissa',
        activities: ['Whale watching', 'Cooking class', 'Beach walk'],
        accommodation: 'Sri Sharavi Beach Villas'
      },
      {
        day: 7,
        title: 'Bentota Bliss',
        description: 'Drive to Bentota along the picturesque coast. Afternoon sunset river cruise through mangroves. Farewell gala dinner at an award-winning restaurant.',
        image: beachParadise,
        location: 'Bentota',
        activities: ['River cruise', 'Mangrove exploration', 'Gala dinner'],
        accommodation: 'Saman Villas'
      },
      {
        day: 8,
        title: 'Fond Farewell',
        description: 'Final morning spa session or beach yoga. Leisurely brunch before private transfer to the airport. Depart with lasting memories of coastal paradise.',
        image: beachParadise,
        location: 'Colombo Airport',
        activities: ['Morning spa', 'Brunch', 'Airport transfer']
      }
    ]
  }
];

export const dayTours: DayTour[] = [
  {
    id: 'sigiriya-dambulla',
    name: 'Sigiriya & Dambulla Day Tour',
    location: 'Sigiriya & Dambulla',
    summary: 'Discover two UNESCO World Heritage Sites in one day. Climb the iconic Sigiriya Rock Fortress and explore the magnificent Dambulla Cave Temple with its ancient Buddha statues.',
    highlights: [
      'Climb the 1,200 steps of Sigiriya Rock Fortress',
      'See ancient frescoes of the Sigiriya maidens',
      'Explore the 5 cave temples of Dambulla',
      'Marvel at 150+ Buddha statues',
      'Learn about the royal palace history'
    ],
    heroImage: sigiriyaFortress,
    duration: 'Full Day (10-12 hours)',
    tags: ['culture', 'adventure', 'nature']
  },
  {
    id: 'kandy-day-tour',
    name: 'Kandy Day Tour',
    location: 'Kandy',
    summary: 'Experience the cultural capital of Sri Lanka. Visit the sacred Temple of the Tooth, explore spice gardens, and enjoy a traditional Kandyan dance performance.',
    highlights: [
      'Temple of the Sacred Tooth Relic',
      'Peradeniya Royal Botanical Gardens',
      'Traditional spice garden visit',
      'Kandyan cultural dance show',
      'Scenic views of Kandy Lake'
    ],
    heroImage: kandyTemple,
    duration: 'Full Day (10-12 hours)',
    tags: ['culture', 'nature', 'relaxation']
  },
  {
    id: 'yala-safari',
    name: 'Yala National Park Safari',
    location: 'Yala National Park',
    summary: 'Embark on an exciting jeep safari in Sri Lanka\'s most famous national park. Home to the world\'s highest density of leopards, along with elephants, crocodiles, and exotic birds.',
    highlights: [
      'Leopard spotting opportunities',
      'Elephant herds in natural habitat',
      'Crocodile sightings at waterholes',
      'Over 200 bird species',
      'Professional safari guide'
    ],
    heroImage: yalaLeopard,
    duration: 'Full Day (12-14 hours)',
    tags: ['wildlife', 'safari', 'adventure']
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort Day Tour',
    location: 'Galle',
    summary: 'Step back in time at the UNESCO-listed Galle Fort. Wander through colonial streets, discover boutique shops, and enjoy stunning ocean views from the ancient ramparts.',
    highlights: [
      'UNESCO World Heritage Galle Fort',
      'Dutch colonial architecture',
      'Boutique shopping and cafes',
      'Lighthouse and rampart walks',
      'Sea turtle hatchery visit'
    ],
    heroImage: beachParadise,
    duration: 'Full Day (8-10 hours)',
    tags: ['culture', 'beach', 'relaxation']
  },
  {
    id: 'whale-watching',
    name: 'Whale Watching Day Tour',
    location: 'Mirissa',
    summary: 'Set sail on the Indian Ocean for an unforgettable encounter with blue whales, sperm whales, and playful dolphins. Sri Lanka is one of the best places in the world to see these magnificent creatures.',
    highlights: [
      'Blue whale sightings',
      'Sperm whale encounters',
      'Playful dolphin pods',
      'Experienced marine crew',
      'Beach time in Mirissa'
    ],
    heroImage: snorkeling,
    duration: 'Full Day (10-12 hours)',
    tags: ['wildlife', 'adventure', 'beach']
  }
];
