import { Destination, TravelPackage, Collection, BlogPost, ReviewTestimonial } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-bali',
    slug: 'bali',
    name: 'Bali',
    tagline: 'Island of the Gods, Sacred Temples & Azure Coastlines',
    country: 'Indonesia',
    region: 'International',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'From emerald terraced rice fields in Ubud to dramatic sea temples in Uluwatu, Bali captivates the soul with its spiritual warmth, private pool sanctuary villas, and enchanting sunset beaches.',
    bestTimeToVisit: 'April to October (Dry season with pleasant breezes)',
    duration: '6 to 8 Days',
    startingPriceINR: 48500,
    featured: true,
    categories: ['Honeymoon', 'Leisure', 'Cultural', 'International'],
    highlights: [
      'Private sunset cruise along Uluwatu cliffs',
      'Traditional sunrise blessing in sacred Tirta Empul',
      'Floating breakfast overlooking jungle ravines in Ubud',
      'Artisanal coffee tasting and royal palace architecture'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival in Denpasar & Transfer to Seminyak', description: 'Private luxury transfer to beachfront villa, welcome drink and leisure sunset.' },
      { day: 2, title: 'Uluwatu Sunset & Kecak Fire Dance', description: 'Visit Padang Padang beach, dramatic cliff temple and cliffside dinner.' },
      { day: 3, title: 'Ubud Heartlands & Tegallalang Terraces', description: 'Scenic drive to Ubud, royal palace exploration and artisanal woodcraft village.' },
      { day: 4, title: 'Sacred Water Temples & Waterfall Expedition', description: 'Spiritual experience at Tirta Empul and hidden Tegenungan falls.' },
      { day: 5, title: 'Nusa Penida Island Day Voyage', description: 'High-speed catamaran cruise to Kelingking T-Rex cliff and crystal bay.' },
      { day: 6, title: 'Spa Ritual & Departure', description: 'Traditional Balinese floral bath and private airport drop-off.' }
    ],
    travelTips: [
      'Visa on Arrival (VoA) is easily available for Indian passport holders with 30-day validity.',
      'Modest attire (sarongs provided at entry) is required when visiting sacred temples.',
      'Indonesian Rupiah (IDR) is the local currency; credit cards are widely accepted in resorts.'
    ]
  },
  {
    id: 'dest-switzerland',
    slug: 'switzerland',
    name: 'Switzerland',
    tagline: 'Alpine Grandeur, Pristine Glaciers & Scenic Panoramic Railways',
    country: 'Switzerland',
    region: 'International',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Experience fairytale peaks, mirror-like lakes, and timeless alpine villages. Travel aboard world-famous panoramic trains like the Glacier Express and breathe crisp mountain air atop Mt. Titlis.',
    bestTimeToVisit: 'May to September (Alpine meadows) or Dec to March (Winter snowscapes)',
    duration: '7 to 10 Days',
    startingPriceINR: 165000,
    featured: true,
    categories: ['Family', 'Honeymoon', 'Adventure', 'International'],
    highlights: [
      'First-class Swiss Travel Pass for seamless panoramic train transit',
      'Rotair revolving cable car ascent to Mount Titlis glacier park',
      'Lake Lucerne vintage paddle-steamer private boat cruise',
      'Strolls through car-free Zermatt beneath the iconic Matterhorn'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival in Zurich & Scenic Train to Lucerne', description: 'Scenic rail journey along Lake Zurich, Chapel Bridge walk.' },
      { day: 2, title: 'Mount Titlis Snow Experience', description: 'Ascend to 3,020m with Cliff Walk and ice flyer chairlift.' },
      { day: 3, title: 'GoldenPass Panoramic Rail to Interlaken', description: 'Ride through emerald valleys and crystalline lakes to Jungfrau gateway.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe Expedition', description: 'Cogwheel train journey inside Sphinx observatory and ice palace.' },
      { day: 5, title: 'Zermatt & The Matterhorn Viewpoints', description: 'Alpine wonderland stroll and Gornergrat panoramic railway.' },
      { day: 6, title: 'Lake Geneva & Montreux Chillon Castle', description: 'Vineyard terraces of Lavaux and lakeside promenade.' },
      { day: 7, title: 'Zurich Old Town & Homeward Flight', description: 'Bahnhofstrasse shopping and departure.' }
    ],
    travelTips: [
      'Schengen Visa required; Yazhi Holidays provides complete documentation guidance.',
      'The Swiss Travel Pass includes unlimited journeys on trains, boats, and city trams.',
      'Tap water in Switzerland is among the purest in the world; bring reusable flasks.'
    ]
  },
  {
    id: 'dest-kerala',
    slug: 'kerala',
    name: 'Kerala',
    tagline: 'God’s Own Country: Tranquil Backwaters, Tea Mists & Slow Living',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Drift through palm-fringed backwaters aboard private handcrafted houseboats, wake up to fragrant mist in the rolling tea estates of Munnar, and rejuvenate with authentic Ayurvedic therapies.',
    bestTimeToVisit: 'September to March (Pleasant and cool) & June to August (Ayurveda monsoon)',
    duration: '5 to 7 Days',
    startingPriceINR: 26900,
    featured: true,
    categories: ['Family', 'Honeymoon', 'Cultural', 'Leisure'],
    highlights: [
      'Exclusive overnight luxury Kettuvallam houseboat with private chef',
      'Munnar tea museum and organic plantation sensory walks',
      'Kathakali classical dance and Kalaripayattu martial arts show',
      'Spice garden trails and heritage Fort Kochi colonial architecture'
    ],
    itinerarySummary: [
      { day: 1, title: 'Cochin Arrival & Fort Kochi Heritage', description: 'Chinese fishing nets, spice bazaars, and colonial evening stroll.' },
      { day: 2, title: 'Scenic Ascent to Munnar Hill Country', description: 'Cheeyappara waterfalls, tea slopes, and heritage boutique resort check-in.' },
      { day: 3, title: 'Eravikulam National Park & Tea Trails', description: 'Spot the endangered Nilgiri Tahr and learn orthodox tea manufacturing.' },
      { day: 4, title: 'Thekkady Spice Plantations & Periyar Lake', description: 'Cardamom and pepper walks followed by bamboo boat safari.' },
      { day: 5, title: 'Alleppey Backwaters Private Houseboat Cruise', description: 'Board your private AC houseboat for traditional Karimeen fish curries and canal views.' }
    ],
    travelTips: [
      'Fly into Cochin (COK) or Trivandrum (TRV) airport for optimal travel circuits.',
      'Book houseboats with certified green palm ratings for eco-friendly comfort.',
      'Evenings in Munnar can be pleasantly brisk; light woolens are recommended.'
    ]
  },
  {
    id: 'dest-dubai',
    slug: 'dubai',
    name: 'Dubai & UAE',
    tagline: 'Futuristic Architectural Marvels & Golden Desert Evenings',
    country: 'United Arab Emirates',
    region: 'International',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An oasis of awe where ultra-modern architecture touches the clouds and ancient Bedouin culture breathes over endless golden dunes. Luxury dining, shopping festivals, and world-class theme parks.',
    bestTimeToVisit: 'November to April (Warm sunshine and cool desert nights)',
    duration: '5 to 6 Days',
    startingPriceINR: 42000,
    featured: true,
    categories: ['Family', 'Adventure', 'Leisure', 'International'],
    highlights: [
      'Burj Khalifa 124th & 125th floor observation deck sunset access',
      'Luxury red-dune desert safari with vintage Land Cruisers and BBQ',
      'Private yacht cruise through Dubai Marina and Atlantis The Palm',
      'Museum of the Future interactive visionary exhibits'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Marina Dhow Cruise Dinner', description: 'Airport welcome, transfer to luxury hotel, illuminated marina dinner cruise.' },
      { day: 2, title: 'Half-Day City Tour & Burj Khalifa Observation', description: 'Dubai Frame, Jumeirah Mosque, Dubai Mall, and fountain show.' },
      { day: 3, title: 'Desert Safari with Bedouin Campfire & Stargazing', description: 'Dune bashing, camel trek, falconry, and authentic Arabian dinner.' },
      { day: 4, title: 'Museum of the Future & Miracle Garden', description: 'Immersive technology marvels and the world largest natural flower garden.' },
      { day: 5, title: 'Old Dubai Gold Souk & Departure', description: 'Abra boat ride across Dubai Creek, aromatic spice souk, airport transfer.' }
    ],
    travelTips: [
      'Quick electronic 30-day tourist visa processed within 3 to 4 business days.',
      'Friday to Sunday is the UAE weekend; malls and attractions stay open late.',
      'Metro system is extremely clean, efficient, and features women-only carriages.'
    ]
  },
  {
    id: 'dest-maldives',
    slug: 'maldives',
    name: 'Maldives',
    tagline: 'Azure Overwater Sanctuaries & Pristine Coral Atolls',
    country: 'Maldives',
    region: 'International',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The epitome of island luxury. Step directly from your overwater villa into crystalline turquoise waters teeming with rays and tropical coral life. Complete seclusion and barefoot sophistication.',
    bestTimeToVisit: 'November to April (Clear azure skies and calm waters)',
    duration: '4 to 5 Days',
    startingPriceINR: 89000,
    featured: true,
    categories: ['Honeymoon', 'Leisure', 'International'],
    highlights: [
      'Overwater bungalow with glass floor panels and private plunge pool',
      'Scenic seaplane transfer soaring over breathtaking turquoise atolls',
      'Candlelit sandbank dinner under a canopy of stars',
      'Guided snorkel safari alongside gentle sea turtles and reef rays'
    ],
    itinerarySummary: [
      { day: 1, title: 'Male International Arrival & Seaplane Transfer', description: 'Iconic aerial flight over turquoise lagoons to your private island resort.' },
      { day: 2, title: 'Lagoon Relaxation & Sunset Dolphin Cruise', description: 'Snorkeling straight from your sun deck, complimentary water sports, catamaran cruise.' },
      { day: 3, title: 'Rejuvenation Spa & Private Beachfront Dining', description: 'Overwater couple massage with soothing sound of gentle waves.' },
      { day: 4, title: 'Farewell Dip & Return Transfer', description: 'Champagne breakfast, last swim in crystal reef, speedboat to airport.' }
    ],
    travelTips: [
      'Free 30-day tourist visa granted upon arrival for all international guests.',
      'Seaplanes operate exclusively during daylight hours (6:00 AM to 4:00 PM).',
      'All-inclusive meal plans are highly recommended for peace of mind.'
    ]
  },
  {
    id: 'dest-thailand',
    slug: 'thailand',
    name: 'Thailand',
    tagline: 'Siam Heritage, Golden Temples & Tropical Andaman Islands',
    country: 'Thailand',
    region: 'International',
    heroImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A vibrant kaleidoscope of ancient Buddhist temples in Bangkok, turquoise limestone karsts in Phuket and Krabi, world-renowned street gastronomy, and serene wellness retreats.',
    bestTimeToVisit: 'November to early April (Pleasant dry season)',
    duration: '5 to 7 Days',
    startingPriceINR: 38000,
    featured: true,
    categories: ['Family', 'Honeymoon', 'Adventure', 'International'],
    highlights: [
      'Private speedboat island hopping to Phi Phi & Maya Bay',
      'Bangkok Grand Palace and emerald Buddha temple tour',
      'Chao Phraya Princess luxury dinner cruise with live jazz',
      'Ethical elephant sanctuary interaction in Chiang Mai or Phuket'
    ],
    itinerarySummary: [
      { day: 1, title: 'Bangkok Arrival & Temple Wonders', description: 'Wat Pho reclining Buddha and vibrant Tuk-Tuk exploration.' },
      { day: 2, title: 'Floating Markets & Chao Phraya River Cruise', description: 'Damnoen Saduak canals and illuminated evening buffet.' },
      { day: 3, title: 'Flight to Phuket & Beachfront Check-in', description: 'Patong beach promenade and sunset at Promthep Cape.' },
      { day: 4, title: 'Phi Phi Islands Speedboat Expedition', description: 'Snorkel in turquoise lagoons, coral reefs, and Maya Bay sands.' },
      { day: 5, title: 'Thai Cooking Masterclass & Departure', description: 'Learn authentic Tom Yum and Pad Thai secrets before heading home.' }
    ],
    travelTips: [
      'Visa-free entry frequently available for Indian travelers (check seasonal waivers).',
      'Local currency is Thai Baht (THB); QR payments and cash are widely prevalent.'
    ]
  },
  {
    id: 'dest-kashmir',
    slug: 'kashmir',
    name: 'Kashmir',
    tagline: 'Paradise on Earth: Floating Shikaras, Meadow Pines & Snow Passes',
    country: 'India',
    region: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Immerse in the timeless poetry of Srinagar’s Dal Lake, the exhilarating snowy slopes of Gulmarg, and the pine-scented rivers of Pahalgam. Unmatched hospitality and breathtaking Himalayan vistas.',
    bestTimeToVisit: 'March to October (Blooming gardens & lush valleys) or Dec to Feb (Snow lovers)',
    duration: '6 to 7 Days',
    startingPriceINR: 34500,
    featured: false,
    categories: ['Honeymoon', 'Family', 'Adventure'],
    highlights: [
      'Heritage handcrafted cedarwood houseboat stay on Nigeen Lake',
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
  }
];

export const PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-bali-escape',
    slug: 'bali-island-days-and-sunset-evenings',
    title: 'Bali: Island Days & Sunset Evenings',
    destinationSlug: 'bali',
    destinationName: 'Bali, Indonesia',
    durationDays: 6,
    durationNights: 5,
    durationLabel: '6 Days / 5 Nights',
    startingPriceINR: 48500,
    tripType: 'Honeymoon',
    region: 'International',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
    overview: 'An exquisite romantic escape carefully balanced between the cultural calm of Ubud and the vibrant coastal sunsets of Seminyak. Includes private pool villa stays, sunset temple tours, and couples spa ceremonies.',
    inclusions: [
      '3 Nights in Seminyak 5-Star Boutique Beach Resort',
      '2 Nights in Private Pool Luxury Villa in Ubud',
      'Daily lavish buffet breakfasts and 2 curated candlelit dinners',
      'All airport and inter-hotel transfers in private air-conditioned vehicle',
      'Uluwatu sunset tour with reserved VIP Kecak dance seating',
      'Full-day Nusa Penida island speedboat tour with lunch',
      'Traditional 90-minute Balinese couple massage ritual',
      '24/7 dedicated Yazhi Holidays concierge on WhatsApp'
    ],
    exclusions: [
      'International roundtrip flights (can be bundled upon request)',
      'Indonesia Visa on Arrival fee (~USD 35 per person)',
      'Personal expenses, gratuities, and unlisted beverages',
      'Travel insurance (highly recommended, add-on available)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Paradise & Sunset by the Ocean',
        location: 'Seminyak',
        description: 'Meet your private chauffeur upon arrival at Denpasar International Airport. Enjoy a scenic ride to your resort in Seminyak. Check in, enjoy your tropical welcome drink, and relax on the pristine beach.',
        mealsIncluded: 'Dinner',
        stay: 'The Kayon Seminyak or similar 5-star resort'
      },
      {
        day: 2,
        title: 'Uluwatu Sea Temple & Cliffside Fire Dance',
        location: 'Uluwatu',
        description: 'Spend your morning relaxing poolside. In the afternoon, journey to the dramatic limestone cliffs of Uluwatu Temple perched 70 meters above the Indian Ocean. Witness the hypnotic Kecak dance as the sun sets into the horizon, followed by a romantic seafood dinner.',
        mealsIncluded: 'Breakfast, Dinner',
        stay: 'The Kayon Seminyak'
      },
      {
        day: 3,
        title: 'Nusa Penida Catamaran Island Voyage',
        location: 'Nusa Penida',
        description: 'Board a luxury catamaran to the dramatic island of Nusa Penida. Visit the world-famous Kelingking T-Rex cliff, swim in crystal turquoise bays, and explore Angel’s Billabong with private guide.',
        mealsIncluded: 'Breakfast, Lunch',
        stay: 'The Kayon Seminyak'
      },
      {
        day: 4,
        title: 'Transfer to Jungle Sanctuaries of Ubud',
        location: 'Ubud',
        description: 'After breakfast, embark on a scenic countryside drive into the emerald hills of Ubud. Check into your private pool villa overlooking mist-veiled jungle ravines. Experience a traditional 90-minute couples Balinese spa ritual.',
        mealsIncluded: 'Breakfast',
        stay: 'Kamandalu Ubud Private Pool Villa'
      },
      {
        day: 5,
        title: 'Tegallalang Terraces & Sacred Water Blessing',
        location: 'Ubud',
        description: 'Early morning walk through the sculpted Tegallalang rice terraces with morning golden light. Visit the sacred water temple Tirta Empul for a spiritual purification ceremony, followed by an artisanal coffee estate tour.',
        mealsIncluded: 'Breakfast, Special Farewell Dinner',
        stay: 'Kamandalu Ubud Private Pool Villa'
      },
      {
        day: 6,
        title: 'Floating Breakfast & Homeward Journey',
        location: 'Denpasar',
        description: 'Delight in an iconic floating breakfast served right in your private pool. Soak in the last hours of tropical serenity before your private transfer to Denpasar Airport for your return journey.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '5-Star Beach Resort & Private Pool Jungle Villa',
    transportType: 'Private AC Chauffeur-driven Vehicle + Fast Catamaran',
    highlights: [
      'Private pool villa with floating breakfast in Ubud',
      'VIP front-row seats for Uluwatu cliff Kecak dance',
      'Exclusive couples spa ritual & candlelit dinner',
      'Full private island tour of Nusa Penida'
    ],
    cancellationPolicy: [
      'Free cancellation up to 21 days before departure.',
      '50% refund between 20 to 10 days before departure.',
      'Non-refundable within 9 days of travel.'
    ]
  },
  {
    id: 'pkg-swiss-alpine',
    slug: 'switzerland-alpine-views-and-scenic-railways',
    title: 'Switzerland: Alpine Views & Scenic Railways',
    destinationSlug: 'switzerland',
    destinationName: 'Switzerland',
    durationDays: 7,
    durationNights: 6,
    durationLabel: '7 Days / 6 Nights',
    startingPriceINR: 165000,
    tripType: 'Family',
    region: 'International',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
    overview: 'Glide through picture-postcard Swiss valleys and snow-crowned peaks aboard legendary panoramic trains. Experience Lucerne, Interlaken, Mt. Titlis, Jungfraujoch, and car-free Zermatt with first-class convenience.',
    inclusions: [
      '6 Nights accommodation in centrally located 4-star boutique Swiss hotels',
      'Swiss Travel Pass (Consecutive) with unlimited rail, boat, and tram transit',
      'Excursion to Mount Titlis with revolving Rotair cable car & Ice Flyer',
      'Excursion to Jungfraujoch – Top of Europe with cogwheel train',
      'Scenic cruise on Lake Lucerne aboard historic steamship',
      'Daily hearty Swiss buffet breakfasts',
      'Complimentary city walking orientation maps and audio guides',
      'Dedicated Schengen visa itinerary and document preparation'
    ],
    exclusions: [
      'International flights (can be added upon request)',
      'Schengen Visa fee and VFS service charges',
      'Lunches, dinners, and personal expenditures',
      'City tourist taxes payable directly at hotels (approx. CHF 3–5 per night)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Zurich Arrival & Scenic Rail to Lucerne',
        location: 'Lucerne',
        description: 'Arrive at Zurich Airport and board your comfortable Swiss train to the charming medieval town of Lucerne. Check in and take an evening stroll across the historic wooden Chapel Bridge.',
        mealsIncluded: 'Breakfast',
        stay: 'Hotel Radisson Blu Lucerne or similar'
      },
      {
        day: 2,
        title: 'Mount Titlis & Glacier Snow Park',
        location: 'Engelberg / Titlis',
        description: 'Ascend to Engelberg and board the world’s first rotating cable car, Titlis Rotair, to 3,020 meters. Walk the thrilling Cliff Walk suspension bridge and enter the Glacier Cave.',
        mealsIncluded: 'Breakfast',
        stay: 'Hotel Radisson Blu Lucerne'
      },
      {
        day: 3,
        title: 'GoldenPass Line to Alpine Interlaken',
        location: 'Interlaken',
        description: 'Experience the panoramic GoldenPass train journey through rolling meadows, crystal lakes, and mountain passes to Interlaken situated between Lake Thun and Lake Brienz.',
        mealsIncluded: 'Breakfast',
        stay: 'Hotel Krebs Interlaken or similar'
      },
      {
        day: 4,
        title: 'Jungfraujoch - Top of Europe at 3,454m',
        location: 'Jungfraujoch',
        description: 'Ride the modern Eiger Express tri-cable gondola and cogwheel railway inside the mountain to Europe’s highest railway station. Gaze out at the Great Aletsch Glacier.',
        mealsIncluded: 'Breakfast',
        stay: 'Hotel Krebs Interlaken'
      },
      {
        day: 5,
        title: 'Zermatt & The Iconic Matterhorn',
        location: 'Zermatt',
        description: 'Travel by train into the Valais valley to car-free Zermatt. Take the Gornergrat cogwheel train up to 3,089m for breathtaking vistas of the pyramid-shaped Matterhorn.',
        mealsIncluded: 'Breakfast',
        stay: 'Hotel National Zermatt or similar'
      },
      {
        day: 6,
        title: 'Lake Geneva & Montreux Chateau de Chillon',
        location: 'Montreux',
        description: 'Board the train to the Swiss Riviera town of Montreux on Lake Geneva. Visit the medieval Chillon Castle jutting directly into the lake, framed by snowcapped Dents du Midi.',
        mealsIncluded: 'Breakfast',
        stay: 'Eurotel Montreux or similar'
      },
      {
        day: 7,
        title: 'Zurich Old Town & Homeward Departure',
        location: 'Zurich',
        description: 'Enjoy a morning train to Zurich. Time for chocolate tasting and Swiss watches along Bahnhofstrasse before boarding your evening flight home.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: 'Centrally Located 4-Star Boutique Alpine Hotels',
    transportType: 'Swiss Travel Pass (First-Class Rail, Cable Cars, Steamboats)',
    highlights: [
      'Top of Europe Jungfraujoch cogwheel expedition',
      'Rotair revolving cable car up Mount Titlis',
      'First-class panoramic rail journeys through alpine passes',
      'Car-free Zermatt and iconic Matterhorn views'
    ],
    cancellationPolicy: [
      'Free cancellation up to 30 days before departure.',
      '75% refund between 29 to 15 days before departure.',
      'Non-refundable within 14 days of travel.'
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    slug: 'kerala-backwaters-hills-and-slow-living',
    title: 'Kerala: Backwaters, Hills & Slow Living',
    destinationSlug: 'kerala',
    destinationName: 'Kerala, India',
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
    id: 'pkg-dubai-desert',
    slug: 'dubai-modern-wonders-and-desert-nights',
    title: 'Dubai: Modern Wonders & Desert Nights',
    destinationSlug: 'dubai',
    destinationName: 'Dubai & UAE',
    durationDays: 5,
    durationNights: 4,
    durationLabel: '5 Days / 4 Nights',
    startingPriceINR: 42000,
    tripType: 'Adventure',
    region: 'International',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
    overview: 'Witness futuristic spectacles alongside the timeless mystique of the Arabian desert. Marvel at the Burj Khalifa, explore the Museum of the Future, and feast beneath desert stars in an authentic Bedouin camp.',
    inclusions: [
      '4 Nights in 5-Star Dubai Marina or Downtown hotel',
      'Daily international buffet breakfast',
      'Burj Khalifa 124th & 125th floor non-prime observatory tickets',
      'Red Dune Desert Safari in 4x4 Land Cruiser with dune bashing, camel rides & BBQ dinner',
      'Dubai Marina luxury glass Dhow cruise with international dinner buffet',
      'Museum of the Future entry tickets',
      'Roundtrip airport transfers in private vehicle',
      'UAE tourist visa processing assistance'
    ],
    exclusions: [
      'International roundtrip airfare (available on request)',
      'Tourism Dirham fee (AED 15-20 per room per night payable at hotel)',
      'Alcoholic beverages and personal shopping expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise',
        location: 'Dubai Marina',
        description: 'Private airport pickup and hotel check-in. In the evening, step onto a beautifully illuminated luxury dhow cruising through the glittering canals of Dubai Marina with live music and dinner.',
        mealsIncluded: 'Dinner',
        stay: 'Media Rotana or similar 5-star property'
      },
      {
        day: 2,
        title: 'Modern Marvels & Burj Khalifa Sunset',
        location: 'Downtown Dubai',
        description: 'Explore the Palm Jumeirah, drive past Atlantis, and visit Dubai Mall. Ascend the world’s tallest tower, Burj Khalifa, to the 124th floor for panoramic views over the Persian Gulf.',
        mealsIncluded: 'Breakfast',
        stay: 'Media Rotana Dubai'
      },
      {
        day: 3,
        title: 'Red Dune Safari & Bedouin Campfire Gala',
        location: 'Lahbab Desert',
        description: 'Afternoon pickup for thrilling 4x4 dune bashing across golden Arabian dunes. Try sandboarding, watch the sunset, and enjoy Tanoura dancing, fire shows, and BBQ dinner in desert camp.',
        mealsIncluded: 'Breakfast, BBQ Dinner',
        stay: 'Media Rotana Dubai'
      },
      {
        day: 4,
        title: 'Museum of the Future & Miracle Garden',
        location: 'Sheikh Zayed Road',
        description: 'Step into 2071 at the award-winning Museum of the Future. Afterwards, lose yourself among 150 million blooming flowers at the Dubai Miracle Garden.',
        mealsIncluded: 'Breakfast',
        stay: 'Media Rotana Dubai'
      },
      {
        day: 5,
        title: 'Old Dubai Souks & Airport Departure',
        location: 'Deira / Airport',
        description: 'Cross the Dubai Creek on a traditional wooden Abra boat, shop for authentic spices and gold, before your private chauffeur transfers you to Dubai Airport for departure.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '5-Star Downtown / Marina Hotel',
    transportType: 'Private AC Sedans + 4x4 Desert Cruiser',
    highlights: [
      'Burj Khalifa 124th floor observation ticket',
      'Red dune bashing & authentic desert camp with live entertainment',
      'Museum of the Future entry',
      'Marina luxury Dhow dinner cruise'
    ],
    cancellationPolicy: [
      'Free cancellation up to 15 days before departure.',
      '50% refund between 14 to 7 days before departure.',
      'Non-refundable within 6 days of travel.'
    ]
  },
  {
    id: 'pkg-maldives-sanctuary',
    slug: 'maldives-private-water-villa-sanctuary',
    title: 'Maldives: Private Water Villa Sanctuary',
    destinationSlug: 'maldives',
    destinationName: 'Maldives',
    durationDays: 4,
    durationNights: 3,
    durationLabel: '4 Days / 3 Nights',
    startingPriceINR: 89000,
    tripType: 'Honeymoon',
    region: 'International',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80',
    overview: 'Unadulterated romance in the azure Indian Ocean. Stay in an iconic overwater villa, step directly into coral waters, and enjoy all-inclusive dining, sunset cruises, and rejuvenating couples wellness.',
    inclusions: [
      '3 Nights in Luxury Overwater Villa with private sun terrace',
      'Roundtrip scenic speed-boat / seaplane transfers from Velana Airport',
      'All-Inclusive Meal Plan: Unlimited gourmet dining and selected beverages',
      'Sunset dolphin cruise with champagne',
      'Complimentary snorkeling equipment and non-motorized water sports',
      'Green Tax and all resort service charges included',
      'Special honeymoon amenities: Flower bed decoration and fruit basket'
    ],
    exclusions: [
      'International flights (can be bundled)',
      'Motorized water sports (jet ski, parasailing)',
      'Spa treatments outside package inclusions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Male & Lagoon Speedboat Transfer',
        location: 'North Male Atoll',
        description: 'Arrive at Velana International Airport, meet your resort concierge, and board a speedboat cutting through turquoise waters to your private island retreat. Check into your overwater villa.',
        mealsIncluded: 'Dinner & Cocktails',
        stay: 'Adaaran Prestige Ocean Villas or similar luxury 5-star'
      },
      {
        day: 2,
        title: 'Barefoot Luxury & House Reef Snorkeling',
        location: 'Private Island Lagoon',
        description: 'Wake up to panoramic ocean views. Snorkel directly from your villa stairs into coral gardens. In the evening, set sail on a sunset dolphin cruise.',
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        stay: 'Adaaran Prestige Ocean Villas'
      },
      {
        day: 3,
        title: 'Overwater Spa & Private Sandbank Dining',
        location: 'Private Island Lagoon',
        description: 'Enjoy a relaxing morning, optional couples massage with sound of the waves, and an unforgettable candlelit dining experience under the equatorial night sky.',
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        stay: 'Adaaran Prestige Ocean Villas'
      },
      {
        day: 4,
        title: 'Morning Dip & Homeward Speedboat Transfer',
        location: 'Male Airport',
        description: 'Take one last swim in the warm azure lagoon and savor a fresh tropical breakfast before your speedboat transfer back to Male Airport for your flight.',
        mealsIncluded: 'Breakfast',
        stay: 'Departure'
      }
    ],
    accommodationType: '5-Star Luxury Overwater Bungalow',
    transportType: 'Resort Speedboat / Seaplane',
    highlights: [
      'Direct lagoon access from overwater villa sundeck',
      'Full All-Inclusive gourmet dining & cocktails',
      'Sunset cruise in search of wild spinner dolphins',
      'Complete seclusion and personalized island hospitality'
    ],
    cancellationPolicy: [
      'Free cancellation up to 25 days before departure.',
      '50% refund between 24 to 15 days before departure.',
      'Non-refundable within 14 days of travel.'
    ]
  },
  {
    id: 'pkg-kashmir-paradise',
    slug: 'kashmir-floating-serenity-and-snowy-passes',
    title: 'Kashmir: Floating Serenity & Snowy Passes',
    destinationSlug: 'kashmir',
    destinationName: 'Kashmir, India',
    durationDays: 6,
    durationNights: 5,
    durationLabel: '6 Days / 5 Nights',
    startingPriceINR: 34500,
    tripType: 'Family',
    region: 'Domestic',
    featured: false,
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
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-romantic',
    title: 'Romantic Escapes',
    subtitle: 'Intimate retreats & honeymoon sanctuaries',
    category: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80',
    description: 'Private pool villas, candlelit shores, and discreet luxury crafted for unforgettable beginnings.',
    slug: 'honeymoon'
  },
  {
    id: 'col-family',
    title: 'Family Time',
    subtitle: 'Moments to cherish across generations',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    description: 'Thoughtfully paced journeys with private transport, child-friendly stays, and enriching discoveries.',
    slug: 'family'
  },
  {
    id: 'col-borders',
    title: 'Beyond Borders',
    subtitle: 'Curated international expeditions',
    category: 'International',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    description: 'From Swiss alpine summits to Arabian sand dunes, seamless international travel with dedicated assistance.',
    slug: 'international'
  },
  {
    id: 'col-wild',
    title: 'Wild & Wonderful',
    subtitle: 'Safaris, rainforests & untouched nature',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    description: 'Encounters with raw nature, jungle ravines, mountain passes, and pristine coastal ecosystems.',
    slug: 'adventure'
  },
  {
    id: 'col-slow',
    title: 'Slow Travel',
    subtitle: 'Wellness, tea estates & mindful pauses',
    category: 'Leisure',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    description: 'Unhurried days drifting along tranquil backwaters and breathing crisp mountain air in lush tea estates.',
    slug: 'leisure'
  },
  {
    id: 'col-culture',
    title: 'Culture & Heritage',
    subtitle: 'Timeless monuments, arts & living traditions',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80',
    description: 'Walk through ancient temple corridors, colonial spice ports, and sacred heritage architecture.',
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
    id: 'blog-first-intl',
    slug: 'how-to-plan-your-first-international-holiday',
    title: 'How to Plan Your First International Holiday: A Comprehensive Guide',
    category: 'Planning Guides',
    readTime: '8 min read',
    date: 'October 04, 2026',
    author: 'Senior Travel Concierge',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'From passport validity rules and visa processing to forex smart cards and pacing your itinerary, here is everything you need to know.',
    content: [
      'Crossing an international border for the first time is one of life’s landmark milestones. However, the logistics—visas, forex conversions, flight connections, and local regulations—can quickly feel overwhelming without experienced guidance.',
      'The foundational rule is passport health: ensure your passport has at least six months of validity from your planned date of return, with at least two blank consecutive pages for immigration stamps.',
      'For Indian travellers embarking on their maiden international trip, destinations like Dubai, Bali, and Thailand offer ideal comfort: straightforward visa-on-arrival or swift e-visa processes, world-class hospitality, and plenty of vegetarian and Indian dining choices alongside local gastronomy.',
      'Our team at Yazhi Holidays handles the intricate groundwork—from flight booking alignments to verified hotel vouchers and dedicated WhatsApp concierge support—so you can travel with complete tranquility.'
    ]
  },
  {
    id: 'blog-honeymoon',
    slug: 'finding-the-perfect-honeymoon-destination',
    title: 'Finding the Perfect Honeymoon Destination: Tropical Islands vs European Charm',
    category: 'Honeymoon Inspiration',
    readTime: '7 min read',
    date: 'September 22, 2026',
    author: 'Bespoke Travel Consultant',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Should you choose an overwater bungalow in the Maldives or a scenic railway through Swiss alpine meadows? We break down the romantic contrast.',
    content: [
      'Every couple dreams of an idyllic honeymoon, but the choice between serene tropical seclusion and rich cultural romance depends on how you want your days to unfold.',
      'If your vision is pure barefoot relaxation—waking to the sound of turquoise waves, snorkeling with reef rays from your sun terrace, and enjoying dinners on private sandbanks—the Maldives or Bali private pool villas are unmatched.',
      'If, on the other hand, romance for you means riding panoramic trains through snow-crowned alpine peaks, walking through cobblestone Swiss villages, and sharing fondue under the shadow of the Matterhorn, Switzerland is an unbeatable classic.',
      'At Yazhi Holidays, we often recommend tailoring the trip to your individual rhythm, ensuring neither partner feels rushed while every moment feels deeply personal.'
    ]
  }
];

export const TESTIMONIALS: ReviewTestimonial[] = [
  {
    id: 'rev-1',
    customerName: 'Karthik & Deepa Sundaram',
    destination: 'Bali, Indonesia',
    travelDate: 'September 2026',
    rating: 5,
    comment: 'Yazhi Holidays crafted our dream honeymoon in Bali. The private pool villa in Ubud and the VIP seats at the Uluwatu Kecak dance were breathtaking. Flawless transfers and always responsive on WhatsApp.',
    tripType: 'Honeymoon Package'
  },
  {
    id: 'rev-2',
    customerName: 'Dr. S. Ramakrishnan & Family',
    destination: 'Switzerland',
    travelDate: 'July 2026',
    rating: 5,
    comment: 'Travelling with elderly parents and teenagers can be stressful, but the Swiss itinerary was paced with extreme care. The first-class rail passes and hotel locations near the stations made everything effortless.',
    tripType: 'Family Holiday'
  },
  {
    id: 'rev-3',
    customerName: 'Meera & Arvind Nair',
    destination: 'Kerala Backwaters',
    travelDate: 'August 2026',
    rating: 5,
    comment: 'The private houseboat in Alleppey was unlike anything we had seen before—spotlessly clean, exquisite Kerala cuisine, and genuine calm away from the tourist crowds. Truly bespoke.',
    tripType: 'Curated Leisure'
  }
];

export const FAQS = [
  {
    category: 'Booking & Customization',
    question: 'How do I start planning a customized trip with Yazhi Holidays?',
    answer: 'You can begin by using our interactive Custom Trip Planner on this website, or reach out directly to our team via WhatsApp or phone (+91 98400 12345). A dedicated travel specialist will understand your preferred pace, dates, budget, and travel companions, and prepare a personalized draft itinerary within 24 hours.'
  },
  {
    category: 'Booking & Customization',
    question: 'Can all holiday packages be customized?',
    answer: 'Yes, absolutely. Every package displayed on our website serves as a carefully curated foundation. We can modify duration, swap hotels, add private excursions, or combine multiple destinations according to your personal preferences.'
  },
  {
    category: 'Visas & Documentation',
    question: 'Does Yazhi Holidays assist with visas and travel insurance?',
    answer: 'Yes. For all international journeys (Schengen Europe, Dubai, Indonesia, Thailand, etc.), we provide complete visa advisory, document review, and official flight/hotel itinerary vouchers for submission. We also offer comprehensive international travel insurance options.'
  },
  {
    category: 'Payments & Pricing',
    question: 'What is the payment schedule for booking a journey?',
    answer: 'Typically, bookings are confirmed with a 25% to 30% initial deposit to secure hotel allocations and private transfers. The balance is settled prior to final voucher issuance in transparent, structured milestones. All prices are quoted clearly in Indian Rupees (INR) with no hidden surcharges.'
  },
  {
    category: 'On-Tour Support',
    question: 'What support is available while we are travelling?',
    answer: 'Every traveler receives a dedicated WhatsApp concierge channel active 24/7 throughout their trip. Whether you need an impromptu restaurant reservation, flight timing updates, or assistance with local chauffeurs, our team is always just a message away.'
  }
];
