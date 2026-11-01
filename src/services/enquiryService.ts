import { EnquirySubmission } from '../types';

const STORAGE_KEY = 'yazhi_holidays_enquiries_v2';

const INITIAL_ENQUIRIES: EnquirySubmission[] = [
  {
    id: 'enq-101',
    referenceNumber: 'YZH-2026-8492',
    createdAt: '2026-10-28T14:30:00Z',
    status: 'In Progress',
    customerName: 'Aditya & Pooja Verma',
    email: 'aditya.verma@example.com',
    phone: '+91 98840 92831',
    preferredContact: 'WhatsApp',
    destination: 'Ooty, Tamil Nadu',
    packageSlug: 'ooty-nilgiri-hills-mist-and-heritage-railway',
    departureCity: 'Chennai',
    travelDate: '2026-12-15',
    flexibleDates: true,
    durationDays: 4,
    adultsCount: 2,
    childrenCount: 0,
    budgetRange: '₹25,000–₹50,000',
    experiencePreferences: ['Honeymoon', 'Relaxation', 'Luxury stays'],
    specialRequests: 'Celebrating 1st anniversary. Requesting private heritage bungalow suite and tea estate walk.',
    adminNotes: 'Contacted over WhatsApp on 29 Oct. Shared upgraded heritage tea estate villa options in Coonoor.'
  },
  {
    id: 'enq-102',
    referenceNumber: 'YZH-2026-7241',
    createdAt: '2026-10-29T09:15:00Z',
    status: 'New',
    customerName: 'Rajeshwari Swaminathan',
    email: 'rajeshwari.s@example.com',
    phone: '+91 94441 55678',
    preferredContact: 'Phone Call',
    destination: 'Kashmir',
    packageSlug: 'kashmir-paradise-on-earth-dal-lake-and-meadows',
    departureCity: 'Bangalore',
    travelDate: '2027-04-10',
    flexibleDates: false,
    durationDays: 6,
    adultsCount: 4,
    childrenCount: 1,
    budgetRange: '₹50,000–₹1,00,000',
    experiencePreferences: ['Family activities', 'Nature', 'Culture'],
    specialRequests: 'Family holiday with elderly parent (requires ground floor luxury houseboat) and 10yo child.',
    adminNotes: 'New lead. Assigned to senior domestic specialist.'
  },
  {
    id: 'enq-103',
    referenceNumber: 'YZH-2026-6180',
    createdAt: '2026-10-27T17:45:00Z',
    status: 'Quoted',
    customerName: 'Vivek Chandrasekhar',
    email: 'v.chandrasekhar@example.com',
    phone: '+91 97909 33214',
    preferredContact: 'Email',
    destination: 'Kerala, India',
    packageSlug: 'kerala-backwaters-hills-and-slow-living',
    departureCity: 'Coimbatore',
    travelDate: '2026-11-20',
    flexibleDates: true,
    durationDays: 5,
    adultsCount: 2,
    childrenCount: 2,
    budgetRange: '₹25,000–₹50,000',
    experiencePreferences: ['Relaxation', 'Nature', 'Food experiences'],
    specialRequests: 'Pure vegetarian meal preferences for entire houseboat and Munnar stay.',
    adminNotes: 'Detailed quotation with pure-veg private chef sent on 28 Oct. Awaiting token advance.'
  }
];

export const getEnquiries = (): EnquirySubmission[] => {
  try {
    // Clean up legacy v1 key with Bali/Switzerland
    if (localStorage.getItem('yazhi_holidays_enquiries')) {
      localStorage.removeItem('yazhi_holidays_enquiries');
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ENQUIRIES;
  }
};

export const saveEnquiry = (enquiry: Omit<EnquirySubmission, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): EnquirySubmission => {
  const current = getEnquiries();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newSubmission: EnquirySubmission = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    referenceNumber: `YZH-2026-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  const updated = [newSubmission, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save enquiry in localStorage', err);
  }
  return newSubmission;
};

export const updateEnquiryStatus = (id: string, status: EnquirySubmission['status'], adminNotes?: string): boolean => {
  const current = getEnquiries();
  const index = current.findIndex(e => e.id === id);
  if (index === -1) return false;

  current[index].status = status;
  if (adminNotes !== undefined) {
    current[index].adminNotes = adminNotes;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return true;
};

export const deleteEnquiry = (id: string): boolean => {
  const current = getEnquiries();
  const updated = current.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};
