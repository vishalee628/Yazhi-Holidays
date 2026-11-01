import { Destination, TravelPackage, Collection, BlogPost, ReviewTestimonial } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-ooty',
    slug: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    tagline: 'Queen of Hill Stations, Nilgiri Heritage Rails & Emerald Tea Slopes',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Nestled in the blue haze of the Nilgiri Mountains, Ooty enchants with sweeping tea estates, colonial-era heritage bungalows, crisp mountain air, and the UNESCO-listed Nilgiri Mountain Railway.',
    bestTimeToVisit: 'October to June (Pleasant weather, blooming botanical gardens & tea picking)',
    duration: '3 to 5 Days',
    startingPriceINR: 18500,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Leisure'],
    highlights: [
      'UNESCO Heritage Nilgiri Mountain Toy Train journey through tunnels & viaducts',
      'Private guided estate walk through century-old orthodox tea plantations',
      'Sunset views from Doddabetta Peak, the highest summit in the Nilgiris',
      'Boating along serene Pykara Lake and visits to Pykara Waterfalls'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Check-in at Heritage Hill Resort', description: 'Scenic drive up Nilgiri ghats, welcome herbal tea, stroll through Government Botanical Garden.' },
      { day: 2, title: 'Heritage Toy Train to Coonoor & Sim’s Park', description: 'Scenic steam-engine ride to Coonoor, visit Dolphin’s Nose viewpoint and Highfield Tea Factory.' },
      { day: 3, title: 'Doddabetta Peak, Pykara Lake & Pine Forest', description: 'Ascend Doddabetta, speedboating on Pykara Lake, and walk beneath towering Nilgiri pines.' },
      { day: 4, title: 'Toda Tribal Village & Departure', description: 'Discover indigenous Toda huts and handmade embroidery before descending the ghats.' }
    ],
    travelTips: [
      'Pre-booking Nilgiri Mountain Railway tickets well in advance is essential due to high demand.',
      'Evenings get brisk; carry light sweaters or woolens throughout the year.',
      'Closest airport is Coimbatore (CJB), just a 3-hour picturesque drive away.'
    ]
  },
  {
    id: 'dest-kodaikanal',
    slug: 'kodaikanal',
    name: 'Kodaikanal',
    tagline: 'Princess of Hill Stations, Mist-Veiled Lakes & Whispering Pine Woods',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Perched in the Palani Hills of Tamil Nadu, Kodaikanal is celebrated for its star-shaped central lake, forested trails, cascading Silver Cascade falls, and tranquil cliffside promenades.',
    bestTimeToVisit: 'September to May (Cool breezes, blooming orchids & clear lake views)',
    duration: '3 to 4 Days',
    startingPriceINR: 19500,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Leisure'],
    highlights: [
      'Pedal or row boating across the star-shaped Kodaikanal Lake',
      'Walk along the historic Coaker’s Walk overlooking cloud-filled valleys',
      'Pillar Rocks viewpoint and ancient Guna Caves exploration',
      'Private bonfire evenings and homemade chocolate tastings'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival via Ghat Road & Lake Promenade', description: 'Scenic drive through mango groves into the hills, check-in, and sunset cycling around the lake.' },
      { day: 2, title: 'Coaker’s Walk, Bryant Park & Pillar Rocks', description: 'Panoramic cliff views at Coaker’s Walk, flower conservatory at Bryant Park, and majestic Pillar Rocks.' },
      { day: 3, title: 'Berijam Lake Forest Safari & Pine Woods', description: 'Exclusive forest department safari into Berijam Lake sanctuary and photography in the pine woods.' },
      { day: 4, title: 'Silver Cascade Falls & Departure', description: 'Morning stop at Silver Cascade waterfalls before heading towards Madurai or Coimbatore.' }
    ],
    travelTips: [
      'A special forest department permit is arranged by Yazhi Holidays for the pristine Berijam Lake circuit.',
      'Sample authentic local homemade chocolates and eucalyptus oils from verified artisanal shops.'
    ]
  },
  {
    id: 'dest-munnar',
    slug: 'munnar',
    name: 'Munnar & Kerala Backwaters',
    tagline: 'God’s Own Country: Rolling Tea Mists, Eravikulam & Private Houseboats',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Immerse yourself in endless emerald carpets of tea in Munnar, watch the endangered Nilgiri Tahr graze at Eravikulam, and glide peacefully through Alleppey’s palm-fringed backwaters aboard private luxury houseboats.',
    bestTimeToVisit: 'September to March (Crisp hill air & calm backwaters)',
    duration: '4 to 6 Days',
    startingPriceINR: 24900,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Cultural', 'Leisure'],
    highlights: [
      'Private overnight luxury AC Kettuvallam houseboat cruise with personal chef',
      'Orthodox tea estate tour & single-estate tea tasting at Lockhart Estate',
      'Eravikulam National Park safari to observe Nilgiri Tahr mountain goats',
      'Live Kathakali dance and Kalaripayattu ancient martial arts performance'
    ],
    itinerarySummary: [
      { day: 1, title: 'Cochin Arrival & Scenic Ascent to Munnar', description: 'Drive past Cheeyappara and Valara waterfalls to your boutique plantation resort.' },
      { day: 2, title: 'Eravikulam National Park & Tea Museum', description: 'Early morning wildlife safari, Tata Tea museum visit, and spice bazaar stroll.' },
      { day: 3, title: 'Mattupetty Dam, Echo Point & Kundala Lake', description: 'Serene lakeside walks, shikara rides on Kundala lake, and tea garden photography.' },
      { day: 4, title: 'Alleppey Backwaters Private Houseboat Cruise', description: 'Board your private wooden houseboat for sunset cruising, Karimeen fry, and starry canal nights.' },
      { day: 5, title: 'Fort Kochi Heritage & Departure', description: 'Chinese cantilevered fishing nets, Dutch Palace, and departure from Cochin Airport.' }
    ],
    travelTips: [
      'Book certified Gold Palm houseboats with dedicated private chef service for the most authentic experience.',
      'Munnar tea hills stay wonderfully cool; light jackets are recommended for early mornings.'
    ]
  },
  {
    id: 'dest-coorg',
    slug: 'coorg',
    name: 'Coorg (Kodagu)',
    tagline: 'Scotland of India: Fragrant Coffee Plantations, Waterfalls & Kodava Culture',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A paradise of sprawling Arabica and Robusta coffee estates, cardamom groves, cascading Abbey Falls, and the spiritual serenity of the Golden Temple at Bylakuppe.',
    bestTimeToVisit: 'October to May (Pleasant weather, white coffee blossom season in March)',
    duration: '3 to 5 Days',
    startingPriceINR: 21000,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Adventure', 'Leisure'],
    highlights: [
      'Private coffee and spice plantation sensory trail with master planter',
      'Visit to the majestic Namdroling Monastery (Golden Temple) in Bylakuppe',
      'Dramatic views of Abbey Falls and sunset at Raja’s Seat',
      'Dubare Elephant Camp interaction on the banks of River Cauvery'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival from Mysore or Bangalore & Plantation Check-in', description: 'Scenic drive through coffee estates to your luxury nature resort; evening bonfire.' },
      { day: 2, title: 'Dubare Elephant Camp & Tibetan Golden Temple', description: 'Bathe elephants in River Cauvery, explore Buddhist murals and prayer halls in Bylakuppe.' },
      { day: 3, title: 'Abbey Falls, Madikeri Fort & Raja’s Seat Sunset', description: 'Waterfalls enveloped in spice trees, historic fort museum, and sunset overlooking valley.' },
      { day: 4, title: 'Coffee Estate Walk & Homeward Departure', description: 'Learn artisan coffee bean roasting and taste freshly brewed estate espresso.' }
    ],
    travelTips: [
      'Combine Coorg with Mysore for a rich heritage and hill station circuit.',
      'Purchase single-origin Coorg coffee, natural forest honey, and homemade spices.'
    ]
  },
  {
    id: 'dest-goa',
    slug: 'goa',
    name: 'Goa',
    tagline: 'Coastal Serenity: Portuguese Heritage, Golden Shores & Backwater Cruises',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Beyond the beaches, discover Latin Quarter heritage homes in Fontainhas, centuries-old churches in Old Goa, private catamaran cruises along the Mandovi, and serene South Goa luxury resorts.',
    bestTimeToVisit: 'October to April (Sunny days, calm seas & gentle coastal breezes)',
    duration: '4 to 6 Days',
    startingPriceINR: 28500,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Leisure'],
    highlights: [
      'Stay in heritage Portuguese villas or beachfront 5-star sanctuaries',
      'Walking heritage tour of colorful Fontainhas Latin Quarter in Panaji',
      'Private sunset cruise on the Chapora River or Mandovi backwaters',
      'Basilica of Bom Jesus and Se Cathedral UNESCO World Heritage sites'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival in North/South Goa & Oceanfront Relaxation', description: 'Airport pickup, transfer to resort, tender coconut welcome, and sunset beach stroll.' },
      { day: 2, title: 'Old Goa Heritage Churches & Fontainhas Quarter', description: 'Colonial architecture, azulejo tile workshops, and authentic Goan Portuguese lunch.' },
      { day: 3, title: 'Dudhsagar Waterfalls & Spice Plantation Safari', description: '4x4 jeep trek to the milky Dudhsagar falls and traditional Goan feast on banana leaves.' },
      { day: 4, title: 'South Goa Secluded Beaches & Sunset Yacht Cruise', description: 'Relax at Palolem and Agonda, followed by a private evening catamaran sailing.' },
      { day: 5, title: 'Morning Spa Ritual & Airport Departure', description: 'Rejuvenating coastal massage and transfer to Dabolim or Mopa airport.' }
    ],
    travelTips: [
      'South Goa offers pristine seclusion and luxury resorts, while North Goa has vibrant cafes and historic forts.',
      'Rent an AC private chauffeur vehicle through Yazhi for effortless sightseeing.'
    ]
  },
  {
    id: 'dest-mysore',
    slug: 'mysore',
    name: 'Mysore (Mysuru)',
    tagline: 'City of Palaces: Royal Wodeyar Grandeur, Silk Traditions & Chamundi Hills',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4438df5?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f4438df5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600100397858-a5a415ff6b2f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Step into Karnataka’s cultural capital where the opulent illuminated Mysore Palace, sandalwood craft markets, Devaraja heritage bazaars, and Brindavan Gardens celebrate timeless royal heritage.',
    bestTimeToVisit: 'September to March (Pleasant temperatures & grand Dasara festivities)',
    duration: '2 to 4 Days',
    startingPriceINR: 16900,
    featured: false,
    categories: ['Cultural', 'Family', 'Leisure'],
    highlights: [
      'VIP guided tour of Mysore Palace with private durbar hall access',
      'Illumination spectacle of 100,000 royal lightbulbs on weekend evenings',
      'Sandalwood oil and pure Mysore Silk saree handloom weaving exploration',
      'Scenic ascent to Chamundeshwari Temple atop Chamundi Hills'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Grand Mysore Palace Tour', description: 'Explore Indo-Saracenic palace corridors, jewel-encrusted golden throne, and palace art gallery.' },
      { day: 2, title: 'Chamundi Hills, St. Philomena’s & Devaraja Bazaar', description: 'Pay homage at the hilltop temple, visit gothic cathedral, and sample Mysore Pak at heritage sweet shops.' },
      { day: 3, title: 'Srirangapatna Island Fortress & Departure', description: 'Tipu Sultan’s summer palace, historic river dungeons, and onward drive.' }
    ],
    travelTips: [
      'Visit on Sunday evenings to witness the iconic full illumination of the Mysore Palace.',
      'Mysore seamlessly pairs with Coorg and Wayanad for an unforgettable 6-day circuit.'
    ]
  },
  {
    id: 'dest-wayanad',
    slug: 'wayanad',
    name: 'Wayanad',
    tagline: 'Western Ghats Rainforests: Prehistoric Caves, Bamboo Groves & Waterfalls',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A mist-shrouded green sanctuary where Neolithic rock art at Edakkal Caves, the heart-shaped Chembra Lake, bamboo rafting on Kuruva Island, and treehouse retreats soothe the soul.',
    bestTimeToVisit: 'October to May (Crisp cool air, lush post-monsoon waterfalls)',
    duration: '3 to 4 Days',
    startingPriceINR: 19900,
    featured: false,
    categories: ['Adventure', 'Honeymoon', 'Family'],
    highlights: [
      'Trek to ancient Edakkal Caves with prehistoric rock engravings',
      'Bamboo raft cruise along the pristine river streams of Kuruva Island',
      'Stay in luxury treehouse suites nestled in rainforest canopies',
      'Scenic visits to Soochipara Waterfalls and Banasura Sagar Earthen Dam'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival via Thamarassery Churam & Treehouse Check-in', description: 'Scenic hairpin curves, welcome spice drinks, and forest nature trail.' },
      { day: 2, title: 'Edakkal Caves & Banasura Sagar Dam', description: 'Neolithic archaeology hike followed by speedboating at Asia’s 2nd largest earthen dam.' },
      { day: 3, title: 'Kuruva Island Bamboo Rafting & Tea Estates', description: 'Peaceful river rafting through dense bamboo thickets and tea estate walk.' },
      { day: 4, title: 'Soochipara Waterfalls & Kozhikode Departure', description: 'Three-tiered cascade dip and scenic transfer to Calicut Airport or Railway Station.' }
    ],
    travelTips: [
      'Ideal for nature lovers seeking calm forest serenity away from city rush.',
      'Wear sturdy walking shoes for the Edakkal Caves ascent.'
    ]
  },
  {
    id: 'dest-hampi',
    slug: 'hampi',
    name: 'Hampi',
    tagline: 'Timeless UNESCO Wonder: Vijayanagara Stone Chariots & Tungabhadra Boulders',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1600100397858-a5a415ff6b2f?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1600100397608-f010f4438df5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397858-a5a415ff6b2f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010f4438df5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An open-air museum carved from giant golden boulders and ancient granite. Walk through the epic ruins of the 14th-century Vijayanagara Empire, musical stone pillars, and sunset boat crossings.',
    bestTimeToVisit: 'October to March (Comfortable pleasant weather for temple walking)',
    duration: '3 to 4 Days',
    startingPriceINR: 22500,
    featured: true,
    categories: ['Cultural', 'Adventure', 'Leisure'],
    highlights: [
      'The iconic Stone Chariot and musical pillars of Vijaya Vittala Temple',
      'Active worship at 7th-century Virupaksha Temple with sacred elephant blessings',
      'Coracle circular boat ride across the rushing Tungabhadra River',
      'Sunset hike to Matanga Hill offering 360-degree panorama of boulder fields'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Sacred Center Sunset', description: 'Check-in at heritage palace resort, sunset over Virupaksha temple and Hampi bazaar.' },
      { day: 2, title: 'Vittala Temple, Stone Chariot & Royal Enclosure', description: 'Explore Queen’s Bath, Lotus Mahal, Elephant Stables, and iconic Stone Chariot.' },
      { day: 3, title: 'Coracle River Ride & Anegundi Ancient Village', description: 'Traditional round boat crossing, Anjanadri Hill monkey temple, and rural craft walk.' },
      { day: 4, title: 'Sunrise at Hemakuta Hill & Homeward Journey', description: 'Golden hour photography among monolithic Ganesha statues before departure.' }
    ],
    travelTips: [
      'Hampi involves moderate walking across ancient stone complexes; carry hats and water.',
      'Combine Hampi with Badami cave temples for an in-depth historic architectural journey.'
    ]
  },
  {
    id: 'dest-jaipur',
    slug: 'jaipur',
    name: 'Jaipur & Rajasthan Heritage',
    tagline: 'The Pink City: Royal Rajput Palaces, Amber Fort & Desert Splendor',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600100397858-a5a415ff6b2f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Immerse in royal Rajput majesty. Marvel at the intricate sandstone lattice of Hawa Mahal, ascend the ramparts of Amber Fort, explore City Palace museums, and savor candlelit Rajasthani cuisine.',
    bestTimeToVisit: 'October to March (Pleasant sunshine and cool desert evenings)',
    duration: '4 to 6 Days',
    startingPriceINR: 32000,
    featured: true,
    categories: ['Cultural', 'Honeymoon', 'Family'],
    highlights: [
      'Private guided exploration of Amber Fort and the dazzling Sheesh Mahal (Mirror Palace)',
      'Photography at Hawa Mahal (Palace of Winds) and Jal Mahal water pavilion',
      'Boutique stay in converted royal heritage Havelis with traditional folk music',
      'Jantar Mantar astronomical observatory and royal City Palace museum'
    ],
    itinerarySummary: [
      { day: 1, title: 'Jaipur Arrival & Royal Haveli Check-in', description: 'Traditional garland welcome, evening puppet show, and traditional Laal Maas or Dal Baati dinner.' },
      { day: 2, title: 'Amber Fort, Jal Mahal & Hawa Mahal', description: 'Ascend to Amber Fort, mirror palace marvels, and photography at iconic pink monuments.' },
      { day: 3, title: 'City Palace, Jantar Mantar & Johari Bazaar', description: 'Royal museum galleries, astronomical sundials, and blue pottery artisan shopping.' },
      { day: 4, title: 'Nahargarh Fort Sunset & Departure', description: 'Breathtaking panoramic sunset overlooking the pink city skyline before airport transfer.' }
    ],
    travelTips: [
      'Winters in Rajasthan bring warm sunlit days and pleasantly cool nights.',
      'Our guests enjoy curated access to authentic block printing workshops in Bagru/Sanganer.'
    ]
  },
  {
    id: 'dest-manali',
    slug: 'manali',
    name: 'Manali & Kullu Valley',
    tagline: 'Valley of the Gods: Rohtang Pass, Snow Peaks & Cedar Mountain Trails',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Where towering Himalayan snow peaks kiss azure skies. Experience the adrenaline of Rohtang Pass and Solang Valley, walk through old pine forests to Hidimba Devi Temple, and relax in apple orchards.',
    bestTimeToVisit: 'March to June (Lush meadows & apple blossoms) or Dec to Feb (Snow winterscapes)',
    duration: '5 to 6 Days',
    startingPriceINR: 29500,
    featured: true,
    categories: ['Adventure', 'Honeymoon', 'Family'],
    highlights: [
      'Scenic drive through the engineering marvel of the Atal Tunnel to Sissu',
      'Snow adventures and cable car rides in Solang Valley',
      'Historic carved-wood Hidimba Temple nestled in ancient deodar woods',
      'River rafting along the crystal waters of the Beas River in Kullu'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Scenic Beas River Valley Drive', description: 'Drive past apple orchards into Manali, check into alpine chalet, evening stroll on Mall Road.' },
      { day: 2, title: 'Solang Valley & Atal Tunnel to Lahaul', description: 'Paragliding, snow activities, transit through Atal Tunnel to witness dramatic trans-Himalayan landscapes.' },
      { day: 3, title: 'Hidimba Temple, Vashisht Hot Springs & Old Manali', description: 'Woodcraft heritage, natural sulfur springs, and cozy cafe exploration in Old Manali.' },
      { day: 4, title: 'Naggar Castle & Kullu Shawl Weavers', description: 'Medieval timber-and-stone castle, Roerich art estate, and authentic Kullu pashmina shopping.' },
      { day: 5, title: 'Beas River Rafting & Departure', description: 'Thrilling white-water rafting before heading towards Bhuntar or Chandigarh.' }
    ],
    travelTips: [
      'Yazhi arranges priority Rohtang and Atal Tunnel permits well in advance.',
      'Heavy woolens are required for Solang and Rohtang snow points even in spring.'
    ]
  },
  {
    id: 'dest-kashmir',
    slug: 'kashmir',
    name: 'Kashmir Valley',
    tagline: 'Paradise on Earth: Floating Shikaras, Gulmarg Snow & Pahalgam Pines',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Immerse in the timeless poetry of Srinagar’s Dal Lake, ride the world’s highest Gondola cable car in Gulmarg, and breathe pine-scented air beside the Lidder River in Pahalgam.',
    bestTimeToVisit: 'March to October (Blooming gardens & lush valleys) or Dec to Feb (Snow wonderland)',
    duration: '6 to 7 Days',
    startingPriceINR: 34500,
    featured: true,
    categories: ['Honeymoon', 'Family', 'Adventure'],
    highlights: [
      'Heritage handcrafted cedarwood houseboat stay on Dal Lake / Nigeen Lake',
      'Gulmarg Gondola phase 2 ascent to Apharwat peak (14,000 ft)',
      'Scenic pony trek through Baisaran valley known as Mini Switzerland',
      'Authentic Kashmiri Wazwan multicourse gastronomic experience'
    ],
    itinerarySummary: [
      { day: 1, title: 'Srinagar Arrival & Dal Lake Shikara Sunset', description: 'Glide past floating lotus gardens and stay in carved cedar houseboat.' },
      { day: 2, title: 'Mughal Gardens & Shankaracharya Temple', description: 'Nishat Bagh, Shalimar Bagh, and panoramic view of Srinagar valley.' },
      { day: 3, title: 'Gulmarg Meadow of Flowers & Gondola Ride', description: 'World highest cable car journey, snow walks, and pine forest trails.' },
      { day: 4, title: 'Pahalgam Valley of Shepherds', description: 'Lidder river strolls, saffron fields of Pampore, and Aru valley.' },
      { day: 5, title: 'Betaab Valley & Local Pashmina Weavers', description: 'Discover authentic GI-tagged Kashmiri Pashmina and saffron.' }
    ],
    travelTips: [
      'Postpaid mobile connections (Airtel/Jio/BSNL) work in Jammu & Kashmir; prepaid outside J&K does not roam.',
      'Gulmarg Gondola tickets sell out weeks in advance; Yazhi arranges priority slotting.'
    ]
  },
  {
    id: 'dest-darjeeling',
    slug: 'darjeeling',
    name: 'Darjeeling & North East Hills',
    tagline: 'Queen of the Himalayas: Kanchenjunga Sunrises & Himalayan Toy Train',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Greet the sunrise as it sets the world’s third-highest peak, Mt. Kanchenjunga, ablaze in shades of rose gold. Ride the historic Darjeeling Himalayan Railway and stroll through organic colonial tea estates.',
    bestTimeToVisit: 'October to May (Crystal clear mountain views & blooming rhododendrons)',
    duration: '4 to 5 Days',
    startingPriceINR: 26500,
    featured: false,
    categories: ['Cultural', 'Honeymoon', 'Family'],
    highlights: [
      'Early dawn sunrise over Mt. Kanchenjunga from Tiger Hill viewpoint',
      'UNESCO World Heritage Toy Train steam safari through Batasia Loop',
      'Private tea tasting session at the world-renowned Happy Valley Tea Estate',
      'Visit Himalayan Mountaineering Institute and Snow Leopard breeding center'
    ],
    itinerarySummary: [
      { day: 1, title: 'Bagdogra Arrival & Scenic Hill Drive', description: 'Drive past rolling tea gardens, colonial resort check-in, and Mall Road evening stroll.' },
      { day: 2, title: 'Tiger Hill Sunrise, Batasia Loop & Ghoom Monastery', description: '4:00 AM panoramic sunrise, spiral railway engineering marvel, and Tibetan prayer wheels.' },
      { day: 3, title: 'Happy Valley Tea Estate & Himalayan Zoo', description: 'Walk through century-old tea bushes and spot Red Pandas and Snow Leopards.' },
      { day: 4, title: 'Japanese Peace Pagoda & Departure', description: 'Serene temple bells and scenic transfer back to Bagdogra Airport.' }
    ],
    travelTips: [
      'Fly into Bagdogra (IXB) airport, approximately 3.5 hours from Darjeeling.',
      'Sip orthodox First Flush Darjeeling tea brewed at its origin.'
    ]
  },
  {
    id: 'dest-rameswaram',
    slug: 'rameswaram-madurai-kanyakumari',
    name: 'Madurai, Rameswaram & Kanyakumari',
    tagline: 'Sacred Southern Odyssey: Historic Gopurams, Pamban Sea Bridge & Three Oceans',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600100397858-a5a415ff6b2f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A deeply moving cultural and spiritual pilgrimage across Tamil Nadu. Marvel at the soaring sculptured towers of Madurai’s Meenakshi Amman Temple, cross the legendary Pamban Sea Bridge to Rameswaram, and witness the confluence of three oceans at Kanyakumari.',
    bestTimeToVisit: 'October to March (Comfortable sea breezes and temple festival seasons)',
    duration: '4 to 6 Days',
    startingPriceINR: 23500,
    featured: true,
    categories: ['Cultural', 'Family', 'Leisure'],
    highlights: [
      'VIP darshan at Madurai Meenakshi Amman Temple and night ceremony',
      'Crossing the historic Pamban Bridge over the turquoise Bay of Bengal',
      'Ramanathaswamy Temple’s world-famous 1,200 carved pillar corridors',
      'Vivekananda Rock Memorial and Thiruvalluvar Statue at Land’s End'
    ],
    itinerarySummary: [
      { day: 1, title: 'Madurai Arrival & Meenakshi Amman Temple', description: 'Check-in, evening visit to the thousand-pillar hall and royal Nayakar Mahal.' },
      { day: 2, title: 'Madurai to Rameswaram via Pamban Bridge', description: 'Scenic coastal highway, drive over the Pamban sea bridge, and holy dip at Agni Theertham.' },
      { day: 3, title: 'Dhanushkodi Ghost Town & Land’s End Beach', description: '4x4 drive to Dhanushkodi where the Indian Ocean meets the Bay of Bengal.' },
      { day: 4, title: 'Rameswaram to Kanyakumari & Sunset Confluence', description: 'Drive to India’s southernmost tip, sunset over the confluence of three oceans.' },
      { day: 5, title: 'Vivekananda Rock Memorial & Trivandrum Departure', description: 'Ferry ride to Vivekananda Rock, Suchindram temple, and airport transfer.' }
    ],
    travelTips: [
      'Modest traditional attire is required for entering sacred temple corridors.',
      'Our AC touring coaches ensure complete comfort across South India’s coastal highways.'
    ]
  }
];

export const PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-ooty-kodaikanal-hills',
    slug: 'nilgiris-and-palani-hills-ooty-kodaikanal',
    title: 'Nilgiris & Palani Hills: Ooty & Kodaikanal Escape',
    destinationSlug: 'ooty',
    destinationName: 'Ooty & Kodaikanal, Tamil Nadu',
    durationDays: 5,
    durationNights: 4,
    durationLabel: '5 Days / 4 Nights',
    startingPriceINR: 24500,
    tripType: 'Honeymoon',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=600&q=80',
    overview: 'An exquisite journey through South India’s twin queen hill stations. Board the UNESCO Nilgiri Mountain Toy Train, stroll along misty lake shores, wander through fragrant tea estates, and relax in colonial heritage suites.',
    inclusions: [
      '2 Nights in Ooty Colonial Heritage Resort with mountain views',
      '2 Nights in Kodaikanal Lakeside Boutique Suite',
      'Daily lavish hill station breakfasts and 2 curated candlelit dinners',
      'All inter-city transfers in dedicated private AC Chauffeur Sedan / SUV',
      'Confirmed Nilgiri Mountain Toy Train tickets (Ooty to Coonoor)',
      'Special Berijam Lake forest entry permits in Kodaikanal',
      'Guided botanical garden and tea plantation tasting walk',
      '24/7 dedicated Yazhi Holidays concierge on WhatsApp'
    ],
    exclusions: [
      'Flights or train tickets to Coimbatore (CJB) / Madurai (IXM)',
      'Boating fees and personal camera entry permits',
      'Personal laundry, beverages, and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Coimbatore Pickup & Scenic Nilgiri Ascent',
        location: 'Ooty',
        description: 'Chauffeur pickup at Coimbatore Airport. Drive through the picturesque Mettupalayam ghat road. Check into your heritage tea estate resort and enjoy an evening walk around Ooty Lake.',
        mealsIncluded: 'Dinner',
        stay: 'Savoy - IHCL SeleQtions or similar heritage property'
      },
      {
        day: 2,
        title: 'Heritage Toy Train, Coonoor & Doddabetta',
        location: 'Ooty & Coonoor',
        description: 'Board the historic Nilgiri toy train to Coonoor. Visit Sim’s Park, Lamb’s Rock, and ascend Doddabetta Peak for panoramic views over the Nilgiri blue mountains.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Savoy - IHCL SeleQtions'
      },
      {
        day: 3,
        title: 'Scenic Drive to Kodaikanal & Lake Sunset',
        location: 'Kodaikanal',
        description: 'Scenic hill descent and climb up the Palani Hills to Kodaikanal. Check into your lakeside boutique hotel. Enjoy sunset cycling or rowing on Kodaikanal Lake.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'The Carlton Kodaikanal or similar luxury lakefront resort'
      },
      {
        day: 4,
        title: 'Coaker’s Walk, Pillar Rocks & Pine Woods',
        location: 'Kodaikanal',
        description: 'Morning walk along Coaker’s Walk overlooking sea-of-clouds valleys. Visit Pillar Rocks, Silver Cascade, and take photos beneath the towering pine trees.',
        mealsIncluded: 'Breakfast, Special Farewell Dinner',
        stay: 'The Carlton Kodaikanal'
      },
      {
        day: 5,
        title: 'Artisanal Chocolate Tasting & Madurai/Coimbatore Departure',
        location: 'Departure',
        description: 'Taste artisan homemade chocolates and eucalyptus extracts before your private transfer down to Madurai or Coimbatore for your return flight.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Heritage Colonial Bungalows & 5-Star Lakeside Resorts',
    transportType: 'Dedicated Private AC Chauffeur Sedan / SUV',
    highlights: [
      'UNESCO Nilgiri Mountain Toy Train journey',
      'Private tea tasting at Lockhart & Highfield estates',
      'Exclusive forest safari to Berijam Lake',
      'Lakeside candlelit dining in Kodaikanal'
    ],
    cancellationPolicy: [
      'Free cancellation up to 15 days before departure.',
      '50% refund between 14 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    slug: 'kerala-backwaters-hills-and-slow-living',
    title: 'Kerala: Backwaters, Hills & Slow Living',
    destinationSlug: 'munnar',
    destinationName: 'Munnar & Alleppey, Kerala',
    durationDays: 5,
    durationNights: 4,
    durationLabel: '5 Days / 4 Nights',
    startingPriceINR: 26900,
    tripType: 'Cultural',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
    overview: 'A restorative journey through South India’s most soulful landscape. From historic Fort Kochi to the mist-shrouded tea hills of Munnar and an exclusive overnight cruise through Alleppey’s emerald canals.',
    inclusions: [
      '1 Night in Heritage Fort Kochi boutique mansion',
      '2 Nights in Munnar tea plantation resort',
      '1 Night in Private AC Luxury Houseboat (Alleppey)',
      'All meals on houseboat (Authentic Kerala feasts prepared by personal chef)',
      'Daily breakfast at Fort Kochi and Munnar hotels',
      'Dedicated AC private vehicle with professional English/Tamil/Hindi speaking chauffeur',
      'Spice plantation guided walk with master botanist',
      'Kathakali cultural performance entry tickets'
    ],
    exclusions: [
      'Airfare or train tickets to/from Cochin (COK)',
      'Ayurvedic spa treatments (can be reserved directly)',
      'Camera entry fees and personal gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Fort Kochi Heritage & Chinese Fishing Nets',
        location: 'Fort Kochi',
        description: 'Arrive at Cochin Airport and transfer to historic Fort Kochi. Stroll past colonial Dutch and Portuguese streets, Chinese cantilevered fishing nets, and attend an evening Kathakali classical dance.',
        mealsIncluded: 'Dinner',
        stay: 'Heritage Old Harbour Hotel or Brunton Boatyard'
      },
      {
        day: 2,
        title: 'Ascend to the Cloud-Kissed Slopes of Munnar',
        location: 'Munnar',
        description: 'Scenic hill drive through spice-scented forests and cascading Cheeyappara falls. Check into your resort set amidst endless green tea gardens. Leisure evening with tea tasting.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Fragrant Nature Munnar or Tall Trees Resort'
      },
      {
        day: 3,
        title: 'Eravikulam Sanctuary & Tata Tea Museum',
        location: 'Munnar',
        description: 'Morning visit to Eravikulam National Park, home of the rare Nilgiri Tahr mountain goat. Discover the history of orthodox tea-making at the heritage museum.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Fragrant Nature Munnar'
      },
      {
        day: 4,
        title: 'Alleppey Backwaters Private Houseboat Voyage',
        location: 'Alleppey',
        description: 'Descend to Alleppey and step aboard your private wooden Kettuvallam houseboat. Cruise past narrow palm-lined canals, paddy fields, and village shores while your chef prepares fresh Karimeen fry.',
        mealsIncluded: 'Breakfast, Traditional Kerala Lunch, Dinner',
        stay: 'Private AC Deluxe Houseboat'
      },
      {
        day: 5,
        title: 'Morning Canal Breeze & Cochin Departure',
        location: 'Cochin',
        description: 'Awake to birdsong over the still waters. Enjoy a peaceful breakfast on deck before disembarking and private transfer back to Cochin Airport for departure.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Heritage Boutique Hotels & Exclusive AC Houseboat',
    transportType: 'Private AC Premium Sedan / SUV throughout',
    highlights: [
      'Exclusive private AC houseboat with personal master chef',
      'Authentic Kathakali classical dance evening',
      'Curated tea tasting and estate walk in Munnar',
      'Colonial Fort Kochi heritage and spice bazaar'
    ],
    cancellationPolicy: [
      'Free cancellation up to 14 days before departure.',
      '50% refund between 13 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-mysore-coorg',
    slug: 'mysore-and-coorg-royal-palaces-and-coffee-estates',
    title: 'Mysore & Coorg: Royal Palaces & Coffee Hills',
    destinationSlug: 'coorg',
    destinationName: 'Mysore & Coorg, Karnataka',
    durationDays: 4,
    durationNights: 3,
    durationLabel: '4 Days / 3 Nights',
    startingPriceINR: 21500,
    tripType: 'Family',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=600&q=80',
    overview: 'A delightful circuit combining the grandeur of the Wodeyar Maharajas in Mysore with the misty, aromatic coffee hills and Kodava hospitality of Coorg.',
    inclusions: [
      '1 Night in Luxury Heritage Hotel in Mysore',
      '2 Nights in Coffee Plantation Resort in Coorg',
      'Daily breakfast and traditional regional dinners',
      'Mysore Palace entry and guided architectural tour',
      'Coffee plantation sensory tour and bean roasting demonstration',
      'Bylakuppe Tibetan Golden Temple excursion',
      'Private dedicated AC vehicle throughout the tour'
    ],
    exclusions: [
      'Airfare or train tickets to Bangalore / Mysore',
      'Personal shopping for silk, sandalwood or coffee',
      'Camera entry fees at monuments'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bangalore/Mysore Pickup & Grand Mysore Palace',
        location: 'Mysore',
        description: 'Meet your chauffeur and check into your heritage hotel. Visit the magnificent Mysore Palace and witness the weekend golden illumination.',
        mealsIncluded: 'Dinner',
        stay: 'Royal Orchid Metropole or Lalitha Mahal Palace'
      },
      {
        day: 2,
        title: 'Chamundi Hills & Drive into Coorg Coffee Hills',
        location: 'Coorg',
        description: 'Ascend Chamundi Hills for hilltop blessings, drive past Bylakuppe Tibetan Monastery, and check into your secluded plantation resort in Coorg.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Evolve Back Coorg or Heritage Resort Coorg'
      },
      {
        day: 3,
        title: 'Dubare Elephant Camp, Abbey Falls & Raja’s Seat',
        location: 'Coorg',
        description: 'Interact with gentle giants at Dubare Elephant Camp, walk through spice thickets to Abbey Falls, and view sunset from Raja’s Seat.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Evolve Back Coorg'
      },
      {
        day: 4,
        title: 'Coffee Estate Walk & Homeward Departure',
        location: 'Departure',
        description: 'Morning walk with a master planter, artisanal coffee tasting, and comfortable drive back to Bangalore or Mysore Airport.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Royal Heritage Palaces & 5-Star Plantation Sanctuaries',
    transportType: 'Dedicated Private AC Vehicle',
    highlights: [
      'Grand illuminated Mysore Palace private tour',
      'Authentic Tibetan Golden Temple at Bylakuppe',
      'River Cauvery elephant interaction',
      'Single-origin Coorg coffee plantation tasting'
    ],
    cancellationPolicy: [
      'Free cancellation up to 14 days before departure.',
      '50% refund between 13 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-goa-coastal-charm',
    slug: 'goa-coastal-serenity-and-heritage-villas',
    title: 'Goa: Coastal Serenity & Portuguese Heritage',
    destinationSlug: 'goa',
    destinationName: 'Goa',
    durationDays: 4,
    durationNights: 3,
    durationLabel: '4 Days / 3 Nights',
    startingPriceINR: 28000,
    tripType: 'Leisure',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=600&q=80',
    overview: 'Experience the refined, slow-paced soul of Goa. Stay in a five-star oceanfront resort or restored Portuguese mansion, explore Old Goa’s cathedrals, and sail on a private sunset catamaran.',
    inclusions: [
      '3 Nights in 5-Star Luxury Oceanfront Resort (South Goa / Candolim)',
      'Daily lavish buffet breakfasts and 1 private beach dinner',
      'Private sunset catamaran cruise on the Mandovi or Chapora River',
      'Guided heritage walk of Fontainhas Latin Quarter',
      'Private roundtrip airport transfers in luxury vehicle',
      'Dedicated AC chauffeur car for full-day sightseeing'
    ],
    exclusions: [
      'Domestic flights to Goa (GOI / GOX)',
      'Motorized water sports and alcoholic beverages outside dinners',
      'Personal gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa & Tropical Ocean Welcome',
        location: 'Goa',
        description: 'Chauffeur airport pickup, check-in to your beachfront resort, tender coconut welcome, and relaxing evening watching the sun dip into the Arabian Sea.',
        mealsIncluded: 'Dinner',
        stay: 'Taj Exotica Resort & Spa or Alila Diwa Goa'
      },
      {
        day: 2,
        title: 'Old Goa Cathedrals & Fontainhas Heritage Walk',
        location: 'Panaji',
        description: 'Explore Basilica of Bom Jesus, Se Cathedral, and stroll through pastel-painted Portuguese villas in Fontainhas with an architectural guide.',
        mealsIncluded: 'Breakfast',
        stay: 'Taj Exotica Resort & Spa'
      },
      {
        day: 3,
        title: 'Spice Plantation Feast & Sunset Sailing',
        location: 'Mandovi River',
        description: 'Visit an organic spice plantation for an authentic Goan buffet, followed by an exclusive private sunset catamaran sailing with refreshments.',
        mealsIncluded: 'Breakfast, Lunch, Special Candlelit Dinner',
        stay: 'Taj Exotica Resort & Spa'
      },
      {
        day: 4,
        title: 'Coastal Spa Morning & Homeward Departure',
        location: 'Departure',
        description: 'Morning swim in the oceanfront infinity pool, Ayurvedic wellness massage, and private airport drop-off.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '5-Star Luxury Oceanfront Resorts',
    transportType: 'Dedicated Private AC Premium Vehicle + Catamaran',
    highlights: [
      '5-Star beach sanctuary with private sundecks',
      'Latin Quarter Fontainhas walking tour',
      'Private sunset catamaran sailing',
      'Authentic Goan spice plantation tour'
    ],
    cancellationPolicy: [
      'Free cancellation up to 15 days before departure.',
      '50% refund between 14 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-kashmir-paradise',
    slug: 'kashmir-floating-serenity-and-snowy-passes',
    title: 'Kashmir: Floating Serenity & Snowy Passes',
    destinationSlug: 'kashmir',
    destinationName: 'Srinagar, Gulmarg & Pahalgam, Kashmir',
    durationDays: 6,
    durationNights: 5,
    durationLabel: '6 Days / 5 Nights',
    startingPriceINR: 34500,
    tripType: 'Family',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    overview: 'From floating shikaras on tranquil Dal Lake to riding the world’s highest gondola cable car in Gulmarg, experience the romance and majesty of the Kashmir valley.',
    inclusions: [
      '1 Night in Luxury Handcrafted Cedar Houseboat (Dal Lake / Nigeen Lake)',
      '2 Nights in Gulmarg Alpine Resort',
      '2 Nights in Pahalgam Pine Valley Resort',
      'Daily Kashmiri breakfast and multicourse dinner',
      'Private Shikara sunset ride on Dal Lake',
      'Dedicated AC Sedan for entire tour circuit',
      'All toll taxes, parking, driver allowances included'
    ],
    exclusions: [
      'Airfare to/from Srinagar (SXR)',
      'Gulmarg Gondola Phase 2 tickets (can be pre-booked)',
      'Pony rides in Pahalgam and Gulmarg'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Srinagar Arrival & Heritage Houseboat Stay',
        location: 'Srinagar',
        description: 'Welcome at Srinagar Airport and check into an intricately carved cedarwood houseboat. Sunset shikara cruise through the floating vegetable markets and char chinar.',
        mealsIncluded: 'Dinner',
        stay: 'Wangnoo Heritage Houseboat or similar'
      },
      {
        day: 2,
        title: 'Srinagar to Gulmarg Meadow of Flowers',
        location: 'Gulmarg',
        description: 'Drive past cherry orchards to Gulmarg. Experience the thrill of snow and take the Gondola ride up to Kongdoori and Apharwat peak.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Hotel Hilltop Gulmarg or similar'
      },
      {
        day: 3,
        title: 'Alpine Nature Walks & Pine Slopes',
        location: 'Gulmarg',
        description: 'Leisure day exploring the historic St. Mary’s Church, Gulmarg golf course, and snow activities amidst towering pine trees.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Hotel Hilltop Gulmarg'
      },
      {
        day: 4,
        title: 'Gulmarg to Pahalgam Valley of Shepherds',
        location: 'Pahalgam',
        description: 'Scenic journey to Pahalgam through saffron fields of Pampore and walnut orchards. Stroll along the roaring Lidder River.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Pine N Peak Pahalgam'
      },
      {
        day: 5,
        title: 'Betaab Valley & Chandanwari Exploration',
        location: 'Pahalgam',
        description: 'Visit the picturesque Betaab Valley, Aru Valley, and local pashmina embroidery craft centers.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Pine N Peak Pahalgam'
      },
      {
        day: 6,
        title: 'Mughal Gardens & Srinagar Departure',
        location: 'Srinagar',
        description: 'Morning drive to Srinagar for a quick visit to Nishat Bagh and Shalimar Bagh before drop-off at Srinagar Airport.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Cedar Houseboat & 4-Star Mountain Resorts',
    transportType: 'Dedicated Private AC Vehicle',
    highlights: [
      'Traditional carved cedarwood houseboat on Dal Lake',
      'Gulmarg Gondola cable car ride into alpine snow',
      'Riverside stays along the Lidder River in Pahalgam',
      'Authentic Kashmiri hospitality and saffron tea'
    ],
    cancellationPolicy: [
      'Free cancellation up to 15 days before departure.',
      '50% refund between 14 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-jaipur-royal',
    slug: 'jaipur-and-rajasthan-royal-palaces-and-desert-forts',
    title: 'Jaipur: Royal Rajput Palaces & Heritage Haveli',
    destinationSlug: 'jaipur',
    destinationName: 'Jaipur, Rajasthan',
    durationDays: 4,
    durationNights: 3,
    durationLabel: '4 Days / 3 Nights',
    startingPriceINR: 28500,
    tripType: 'Cultural',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    overview: 'Walk the majestic courtyards of the Maharajas. Discover the Mirror Palace of Amber Fort, the pink sandstone filigree of Hawa Mahal, and dine under desert stars in a royal haveli.',
    inclusions: [
      '3 Nights in Luxury Heritage Haveli Hotel in Jaipur',
      'Daily royal buffet breakfasts and 1 candlelit Rajasthani dinner',
      'Private guided tours of Amber Fort, City Palace & Jantar Mantar',
      'Priority monument tickets with certified royal historian guide',
      'Dedicated AC chauffeur vehicle for the entire stay'
    ],
    exclusions: [
      'Flights or train tickets to Jaipur (JAI)',
      'Elephant or jeep safari optional extras',
      'Personal shopping and camera tickets'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in the Pink City & Haveli Welcome',
        location: 'Jaipur',
        description: 'Airport pickup, traditional royal Aarti welcome, check-in, and evening visit to the illuminated Birla Temple and Chokhi Dhani village.',
        mealsIncluded: 'Dinner',
        stay: 'Alsisar Haveli or Samode Haveli'
      },
      {
        day: 2,
        title: 'Amber Fort, Jal Mahal & Sheesh Mahal',
        location: 'Amber',
        description: 'Ascend to Amber Fort, explore the thousands of mirrors at Sheesh Mahal, and photograph the floating Jal Mahal palace.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Alsisar Haveli'
      },
      {
        day: 3,
        title: 'City Palace, Jantar Mantar & Hawa Mahal',
        location: 'Jaipur Old City',
        description: 'Marvel at royal robes and weaponry in City Palace, view the giant sundial at Jantar Mantar, and explore Johari Bazaar gems.',
        mealsIncluded: 'Breakfast',
        stay: 'Alsisar Haveli'
      },
      {
        day: 4,
        title: 'Nahargarh Fort Panorama & Departure',
        location: 'Departure',
        description: 'Morning drive to Nahargarh Fort for a breathtaking panoramic view of Jaipur before your private airport transfer.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Heritage Boutique Havelis & Royal Palaces',
    transportType: 'Dedicated Private AC Chauffeur Sedan / SUV',
    highlights: [
      'Amber Fort & Sheesh Mahal private guided tour',
      'Heritage haveli stay with classical sarangi music',
      'Sunset views from Nahargarh ramparts',
      'Curated artisan block printing workshop'
    ],
    cancellationPolicy: [
      'Free cancellation up to 14 days before departure.',
      '50% refund between 13 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-tamilnadu-sacred-circuit',
    slug: 'madurai-rameswaram-kanyakumari-sacred-odyssey',
    title: 'Madurai, Rameswaram & Kanyakumari Sacred Southern Odyssey',
    destinationSlug: 'rameswaram-madurai-kanyakumari',
    destinationName: 'Madurai, Rameswaram & Kanyakumari, Tamil Nadu',
    durationDays: 5,
    durationNights: 4,
    durationLabel: '5 Days / 4 Nights',
    startingPriceINR: 25500,
    tripType: 'Cultural',
    region: 'Domestic',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    overview: 'A magnificent heritage and spiritual journey along South India’s sacred coastlines. Marvel at Madurai’s towering gopurams, cross the Pamban sea bridge, and stand where three oceans embrace at Kanyakumari.',
    inclusions: [
      '1 Night in Madurai Heritage Hotel',
      '2 Nights in Rameswaram Coastal Luxury Resort',
      '1 Night in Kanyakumari Oceanview Hotel',
      'Daily South Indian & Multi-Cuisine Breakfasts and Dinners',
      'Madurai Meenakshi Amman Temple VIP Darshan assistance',
      '4x4 vehicle excursion to Dhanushkodi Land’s End & Ram Setu viewpoint',
      'Dedicated AC touring coach with experienced chauffeur'
    ],
    exclusions: [
      'Train or air tickets to Madurai (IXM) / from Trivandrum (TRV)',
      'Special archana fees and personal temple offerings',
      'Personal gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Madurai Arrival & Meenakshi Amman Temple',
        location: 'Madurai',
        description: 'Meet your chauffeur at Madurai Airport. Visit the architectural masterpiece of Meenakshi Amman Temple and attend the evening palanquin procession.',
        mealsIncluded: 'Dinner',
        stay: 'Heritage Madurai or Gateway Hotel Pasumalai'
      },
      {
        day: 2,
        title: 'Madurai to Rameswaram across Pamban Sea Bridge',
        location: 'Rameswaram',
        description: 'Drive along the palm-lined coastal highway and cross the engineering wonder of the Pamban Bridge over the turquoise sea. Check into your resort.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Daiwik Hotels Rameswaram'
      },
      {
        day: 3,
        title: 'Ramanathaswamy Temple Corridors & Dhanushkodi',
        location: 'Dhanushkodi',
        description: 'Bathe in the 22 sacred theerthams, admire the 1,200 sculptured pillars, and journey to the dramatic sandy shores of Dhanushkodi.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Daiwik Hotels Rameswaram'
      },
      {
        day: 4,
        title: 'Rameswaram to Kanyakumari & Sunset Confluence',
        location: 'Kanyakumari',
        description: 'Drive to the southernmost tip of mainland India. Visit Suchindram temple and watch the sun dip into the confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'Sparsa Resort Kanyakumari'
      },
      {
        day: 5,
        title: 'Vivekananda Rock Memorial & Trivandrum Departure',
        location: 'Trivandrum',
        description: 'Morning ferry to Vivekananda Rock Memorial and Thiruvalluvar Statue before your private transfer to Trivandrum Airport.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '4-Star Heritage & Seaside Luxury Resorts',
    transportType: 'Dedicated Private AC Chauffeur Vehicle',
    highlights: [
      'Madurai Meenakshi Amman Temple VIP guided access',
      'Iconic Pamban Sea Bridge scenic drive',
      '4x4 Dhanushkodi Land’s End expedition',
      'Sunset at the three-ocean confluence in Kanyakumari'
    ],
    cancellationPolicy: [
      'Free cancellation up to 14 days before departure.',
      '50% refund between 13 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-manali-himalayas',
    slug: 'manali-and-kullu-high-passes-and-cedar-forests',
    title: 'Manali & Kullu: High Passes & Cedar Forests',
    destinationSlug: 'manali',
    destinationName: 'Manali & Kullu, Himachal Pradesh',
    durationDays: 5,
    durationNights: 4,
    durationLabel: '5 Days / 4 Nights',
    startingPriceINR: 29500,
    tripType: 'Adventure',
    region: 'Domestic',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=600&q=80',
    overview: 'Witness soaring snowcapped peaks, alpine meadows, and pine-clad river valleys. Experience the thrill of Solang Valley, transit through the Atal Tunnel, and relax in Himalayan wooden lodges.',
    inclusions: [
      '4 Nights in Luxury Alpine Chalet overlooking snowcapped peaks',
      'Daily mountain buffet breakfast and hearty Himalayan dinners',
      'Atal Tunnel and Sissu (Lahaul Valley) full-day excursion',
      'Solang Valley cable car and snow activity transit',
      'Dedicated private AC vehicle throughout the tour'
    ],
    exclusions: [
      'Flights to Chandigarh or Kullu (KUU)',
      'Paragliding, skiing and adventure activity fees',
      'Personal winter wear rentals'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali & Alpine Chalet Check-in',
        location: 'Manali',
        description: 'Chauffeur pickup, drive along the Beas River, and check into your cedarwood mountain chalet. Evening stroll on Mall Road.',
        mealsIncluded: 'Dinner',
        stay: 'The Himalayan Resort & Spa or Larisa Resort'
      },
      {
        day: 2,
        title: 'Solang Valley & Atal Tunnel to Lahaul',
        location: 'Solang & Sissu',
        description: 'Snow adventures at Solang, transit the 9-km Atal Tunnel, and marvel at the frozen waterfalls of Sissu in Lahaul Valley.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'The Himalayan Resort & Spa'
      },
      {
        day: 3,
        title: 'Old Manali, Hidimba Temple & Vashisht Baths',
        location: 'Old Manali',
        description: 'Visit the 16th-century timber-carved Hidimba Temple, pine forest walks, and natural hot springs of Vashisht.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'The Himalayan Resort & Spa'
      },
      {
        day: 4,
        title: 'Naggar Castle & Kullu White-Water Rafting',
        location: 'Naggar & Kullu',
        description: 'Historic Naggar Castle art museum, white-water rafting on the Beas River, and authentic Himalayan pashmina shopping.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'The Himalayan Resort & Spa'
      },
      {
        day: 5,
        title: 'Morning Mountain Breeze & Homeward Departure',
        location: 'Departure',
        description: 'Fresh mountain breakfast and private chauffeur transfer back to Chandigarh or Bhuntar Airport.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '4-Star Alpine Chalets & Luxury Mountain Sanctuaries',
    transportType: 'Dedicated Private AC Vehicle',
    highlights: [
      'Atal Tunnel transit into Lahaul Valley',
      'Solang Valley snow activities and ropeway',
      'Historic Naggar Castle & Hidimba Temple',
      'Beas River white-water rafting adventure'
    ],
    cancellationPolicy: [
      'Free cancellation up to 15 days before departure.',
      '50% refund between 14 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-romantic',
    title: 'Romantic Hill Escapes',
    subtitle: 'Misty tea bungalows & honeymoon sanctuaries',
    category: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80',
    description: 'Private estate villas in Ooty, secluded Kodaikanal lakefronts, and candlelit dinners crafted for unforgettable beginnings.',
    slug: 'honeymoon'
  },
  {
    id: 'col-family',
    title: 'Family Mountain Holidays',
    subtitle: 'Moments to cherish across generations',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=900&q=80',
    description: 'Thoughtfully paced journeys with private tour vehicles, child-friendly stays, and enriching nature discoveries.',
    slug: 'family'
  },
  {
    id: 'col-royal',
    title: 'Royal Heritage & Palaces',
    subtitle: 'Living dynasties, forts & timeless monuments',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f4438df5?auto=format&fit=crop&w=900&q=80',
    description: 'From the illuminated Mysore Palace to Jaipur’s desert ramparts and Hampi’s ancient boulder temples.',
    slug: 'cultural'
  },
  {
    id: 'col-wild',
    title: 'Western Ghats & Wildlife',
    subtitle: 'Rainforest canopies, waterfalls & coffee trails',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    description: 'Encounters with raw nature, deodar forests in Manali, coffee trails in Coorg, and Nilgiri Tahr sanctuaries.',
    slug: 'adventure'
  },
  {
    id: 'col-slow',
    title: 'Slow Living & Backwaters',
    subtitle: 'Wellness, private houseboats & tea estates',
    category: 'Leisure',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    description: 'Unhurried days drifting along tranquil Kerala backwaters and breathing crisp mountain air in lush tea valleys.',
    slug: 'leisure'
  },
  {
    id: 'col-sacred',
    title: 'Sacred Southern Odyssey',
    subtitle: 'Meenakshi Amman, Pamban bridge & three oceans',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    description: 'Walk through ancient temple corridors in Madurai and Rameswaram, and gaze upon the three-ocean confluence at Kanyakumari.',
    slug: 'cultural'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-kerala',
    slug: 'a-slower-way-to-discover-kerala',
    title: 'A Slower Way to Discover Kerala: Backwaters Beyond the Tourist Trail',
    category: 'Destination Guides',
    readTime: '6 min read',
    date: 'October 18, 2026',
    author: 'Travel Editorial Desk',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'How stepping away from crowded hubs unlocks the meditative silence of narrow canals, village fish markets, and authentic Ayurvedic living.',
    content: [
      'Travel in South India often races against a checklist: three hill stations, two beaches, and an afternoon on a boat. Yet Kerala yields its true magic only when you deliberately slow your pace.',
      'In the secluded waterways south of Alleppey—where motorboats cannot navigate and only wooden canoes glide—the morning begins not with sirens, but with the soft rhythmic dip of an oar. Fishermen cast their nets before sunrise, while school children wave from canal banks.',
      'When you choose an exclusive private houseboat with Yazhi Holidays, you are not merely a spectator. Your onboard chef visits local waterside fishermen to select freshly caught Karimeen (pearl spot), seasoning it with hand-ground spices and banana leaf wraps.',
      'Pair this with a stay in Munnar’s lesser-known tea valleys, where colonial bungalows still brew single-estate golden tips, and you have not just taken a vacation; you have experienced slow living in its purest form.'
    ]
  },
  {
    id: 'blog-nilgiris-journey',
    slug: 'the-magic-of-the-nilgiris-and-palani-hills',
    title: 'The Magic of the Nilgiris: A Discerning Guide to Ooty and Kodaikanal',
    category: 'Hill Station Guides',
    readTime: '7 min read',
    date: 'October 04, 2026',
    author: 'Senior Travel Concierge',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'From the blue eucalyptus mist of the Nilgiris to the secluded pine trails of Kodaikanal, here is how to experience South India’s crown hill stations in luxury.',
    content: [
      'The Western Ghats of Tamil Nadu hold some of the subcontinent’s most evocative hill geography. Rising sharply from the plains, the Nilgiris and Palani hills offer relief from the tropical heat with temperatures that echo an eternal spring.',
      'To experience Ooty at its best, step beyond the bustling town center into heritage tea estates where single-origin leaves are still withered using time-tested orthodox methods. The UNESCO Nilgiri Mountain Toy Train remains an unmissable engineering marvel, puffing through mountain tunnels and wooden trestle bridges.',
      'Crossing into Kodaikanal reveals a gentler, more intimate atmosphere: morning walks through the whispering pine forests, boating across the serene central lake, and breathing air scented with blooming wild lilies.',
      'With dedicated AC private transport and boutique heritage reservations, Yazhi Holidays ensures your hill journey is as effortless as it is unforgettable.'
    ]
  },
  {
    id: 'blog-sacred-circuit',
    slug: 'the-sacred-coast-madurai-to-kanyakumari',
    title: 'The Sacred Coast: Journeying from Madurai to Rameswaram and Kanyakumari',
    category: 'Heritage Inspiration',
    readTime: '8 min read',
    date: 'September 22, 2026',
    author: 'Bespoke Travel Consultant',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Explore ancient sculpted gopurams, the engineering poetry of Pamban Bridge, and the three-ocean confluence at India’s southern tip.',
    content: [
      'Tamil Nadu’s southern belt is a tapestry of living faith, classical Dravidian architecture, and dramatic coastal beauty.',
      'Madurai’s Meenakshi Amman Temple stands as an architectural wonder of the ancient world. Its towering gopurams, encrusted with thousands of brightly painted stucco deities, shelter corridors that have echoed with devotional hymns for over two millennia.',
      'Driving east across the Pamban Sea Bridge, the turquoise waters of the Gulf of Mannar open before you. Rameswaram’s temple corridors, with their 1,200 intricately carved granite pillars, lead onward to the ghost town of Dhanushkodi where the Bay of Bengal meets the Indian Ocean.',
      'Completing the journey at Kanyakumari, watching the sunset and sunrise across the three embracing seas from Vivekananda Rock, leaves an imprint that stays with you long after you return home.'
    ]
  }
];

export const TESTIMONIALS: ReviewTestimonial[] = [
  {
    id: 'rev-1',
    customerName: 'Karthik & Deepa Sundaram',
    destination: 'Ooty & Coorg, Tamil Nadu & Karnataka',
    travelDate: 'October 2026',
    rating: 5,
    comment: 'Yazhi Holidays crafted an unforgettable private hill retreat for our anniversary. The colonial tea bungalow in Ooty, the aroma of coffee blossoms in Coorg, and our courteous chauffeur made every mountain pass completely effortless. Highly recommended!',
    tripType: 'Honeymoon & Hill Retreat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true
  },
  {
    id: 'rev-2',
    customerName: 'Dr. S. Ramakrishnan & Family',
    destination: 'Mysore, Wayanad & Ooty Circuit',
    travelDate: 'September 2026',
    rating: 5,
    comment: 'Travelling with three generations—from my 78-year-old mother to our grandchildren—requires meticulous pacing. Yazhi Holidays arranged a spacious luxury AC coach with gentle drives, ground-floor heritage rooms, and punctual temple visits. Flawless hospitality!',
    tripType: 'Multi-Generational Family Tour',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    verified: true
  },
  {
    id: 'rev-3',
    customerName: 'Meera & Arvind Nair',
    destination: 'Munnar & Alleppey Backwaters, Kerala',
    travelDate: 'August 2026',
    rating: 5,
    comment: 'The private wooden houseboat drifting along Alleppey’s quiet canals at dawn was sheer poetry. Our personal chef prepared authentic Karimeen pollichathu and the tea estate resort in Munnar was misty and secluded. Truly bespoke.',
    tripType: 'Curated Leisure & Nature',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    verified: true
  },
  {
    id: 'rev-4',
    customerName: 'Ananya & Rohan Sengupta',
    destination: 'Jaipur & Rajasthan Heritage Circuit',
    travelDate: 'July 2026',
    rating: 5,
    comment: 'Walking through Amber Fort at golden hour with our Yazhi heritage guide felt like stepping back in time. The boutique haveli stay and private Rajasthani folk dinner were the highlights of our year.',
    tripType: 'Royal Heritage & Culture',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    verified: true
  },
  {
    id: 'rev-5',
    customerName: 'Venkatesh & Priya Balaji',
    destination: 'Madurai, Rameswaram & Kanyakumari',
    travelDate: 'June 2026',
    rating: 5,
    comment: 'From the majestic Gopurams of Meenakshi Temple to the sunrise across three oceans in Kanyakumari, everything was arranged with spiritual respect and five-star comfort. Zero stress throughout.',
    tripType: 'Sacred Southern Heritage',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    verified: true
  }
];

export const FAQS = [
  {
    category: 'Booking & Customization',
    question: 'How do I start planning a customized trip with Yazhi Holidays?',
    answer: 'You can begin by using our interactive Custom Trip Planner on this website, or reach out directly to our team via WhatsApp or phone (6380792722). A dedicated travel specialist will understand your preferred pace, dates, budget, and travel companions, and prepare a personalized draft itinerary within 24 hours.'
  },
  {
    category: 'Booking & Customization',
    question: 'Can all holiday packages be customized?',
    answer: 'Yes, absolutely. Every domestic package displayed on our website serves as a carefully curated foundation. We can modify duration, swap hotels, add private excursions, or combine multiple Indian destinations according to your personal preferences.'
  },
  {
    category: 'Vehicles & Chauffeurs',
    question: 'What kind of vehicles and transport do you provide?',
    answer: 'We provide dedicated, sanitized private air-conditioned touring vehicles—from luxury sedans and premium SUVs (Innova Crysta) to spacious luxury mini-coaches and tourist buses for larger families—with courteous, experienced drivers who know the ghat roads and regional routes thoroughly.'
  },
  {
    category: 'Payments & Pricing',
    question: 'What is the payment schedule for booking a journey?',
    answer: 'Typically, bookings are confirmed with a 25% to 30% initial deposit to secure hotel allocations and private transfers. The balance is settled prior to final voucher issuance in transparent, structured milestones. All prices are quoted clearly in Indian Rupees (INR) with no hidden surcharges.'
  },
  {
    category: 'On-Tour Support',
    question: 'What support is available while we are travelling?',
    answer: 'Every traveler receives a dedicated WhatsApp concierge channel active 24/7 throughout their trip. Whether you need an impromptu restaurant recommendation, hotel check-in assistance, or timing adjustments with your chauffeur, our team is always just a message away.'
  }
];
