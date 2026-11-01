import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  X,
  Phone,
  RotateCcw,
  Camera,
  Image,
  UploadCloud,
  Star,
  EyeOff,
  Calendar
} from 'lucide-react';
import { checkAdminAuth, adminLogout, AdminUser } from '../services/authService';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/enquiryService';
import { 
  getCatalogPackages, 
  saveCatalogPackage, 
  deleteCatalogPackage, 
  getCatalogDestinations, 
  saveCatalogDestination, 
  deleteCatalogDestination, 
  resetCatalogToDefault 
} from '../services/catalogService';
import { 
  getReviews, 
  saveReview, 
  deleteReview, 
  uploadAdminImage, 
  resetReviewsToDefault 
} from '../services/reviewService';
import { 
  getCustomerMemories, 
  saveCustomerMemory, 
  saveMultipleCustomerMemories, 
  deleteCustomerMemory, 
  togglePublishCustomerMemory, 
  uploadCustomerPhoto, 
  loadSampleMemories, 
  clearAllMemories,
  STANDARD_DOMESTIC_DESTINATIONS 
} from '../services/customerMemoryService';
import { EnquirySubmission, TravelPackage, Destination, TripType, RegionType, ReviewTestimonial, CustomerMemory } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'packages' | 'destinations' | 'reviews' | 'customer_memories' | 'settings'>('overview');

  // Data states
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<ReviewTestimonial[]>([]);
  const [customerMemories, setCustomerMemories] = useState<CustomerMemory[]>([]);

  // Customer Memories Management State
  const [editingMemory, setEditingMemory] = useState<CustomerMemory | null>(null);
  const [isNewMemoryModal, setIsNewMemoryModal] = useState(false);
  const [isUploadingMemory, setIsUploadingMemory] = useState(false);
  const [memoryUploadError, setMemoryUploadError] = useState('');
  const [stagedFiles, setStagedFiles] = useState<{ file: File; preview: string; name: string }[]>([]);

  // Staged upload batch metadata form state
  const [batchMemoryDestination, setBatchMemoryDestination] = useState('Ooty');
  const [batchMemoryCustomDest, setBatchMemoryCustomDest] = useState('');
  const [batchMemoryTripType, setBatchMemoryTripType] = useState('Family Tour');
  const [batchMemoryCustomTripType, setBatchMemoryCustomTripType] = useState('');
  const [batchMemoryDate, setBatchMemoryDate] = useState(`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`);
  const [batchMemoryCaption, setBatchMemoryCaption] = useState('');
  const [batchMemoryPublish, setBatchMemoryPublish] = useState(true);

  // Filter & Search states for memories tab
  const [memoryFilterDest, setMemoryFilterDest] = useState('All');
  const [memoryFilterStatus, setMemoryFilterStatus] = useState<'All' | 'Published' | 'Draft'>('All');
  const [memorySearch, setMemorySearch] = useState('');

  // Destination Photo Management State
  const [managingPhotosDestination, setManagingPhotosDestination] = useState<Destination | null>(null);

  // Review Management State
  const [editingReview, setEditingReview] = useState<ReviewTestimonial | null>(null);
  const [isNewReview, setIsNewReview] = useState(false);

  // Upload progress and error state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');


  // Filter & Search states
  const [enquiryFilter, setEnquiryFilter] = useState<string>('All');
  const [enquirySearch, setEnquirySearch] = useState<string>('');

  // Selected Enquiry Modal Inspector
  const [inspectEnquiry, setInspectEnquiry] = useState<EnquirySubmission | null>(null);
  const [inspectorNotes, setInspectorNotes] = useState<string>('');

  // Package Edit Modal
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
  const [isNewPackage, setIsNewPackage] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    businessPhone: '6380792722',
    whatsappNumber: '6380792722',
    email: '',
    address: 'Sulur, Coimbatore, Tamil Nadu, India',
    operatingHours: 'Mon - Sat: 9:30 AM - 7:30 PM IST'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    const user = checkAdminAuth();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    setCurrentUser(user);
    loadData();
  }, [navigate]);

  const loadData = () => {
    setEnquiries(getEnquiries());
    setPackages(getCatalogPackages());
    setDestinations(getCatalogDestinations());
    setReviews(getReviews());
    setCustomerMemories(getCustomerMemories(true));
  };

  // Customer Memories Handlers
  const handleTogglePublishMemory = (id: string) => {
    const res = togglePublishCustomerMemory(id);
    if (res.success) {
      loadData();
    } else {
      alert(res.error || 'Failed to update publish status.');
    }
  };

  const handleDeleteMemory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer memory photograph?')) {
      const res = deleteCustomerMemory(id);
      if (res.success) {
        loadData();
      } else {
        alert(res.error || 'Failed to delete customer memory.');
      }
    }
  };

  const handleSaveEditedMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory) return;
    const res = saveCustomerMemory(editingMemory);
    if (res.success) {
      setEditingMemory(null);
      loadData();
    } else {
      alert(res.error || 'Failed to save customer memory.');
    }
  };

  const handleFileSelectForStaging = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setMemoryUploadError('');
    const newStaged: { file: File; preview: string; name: string }[] = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validTypes.includes(file.type.toLowerCase())) {
        setMemoryUploadError('Some files were skipped: Only JPG, PNG, and WebP images are permitted.');
        continue;
      }
      if (file.size > MAX_SIZE) {
        setMemoryUploadError('Some files exceeded the 5MB size limit.');
        continue;
      }
      newStaged.push({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      });
    }

    setStagedFiles(prev => [...prev, ...newStaged]);
  };

  const handleRemoveStagedFile = (idx: number) => {
    setStagedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleBatchSubmitMemories = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stagedFiles.length === 0) {
      setMemoryUploadError('Please select at least one customer photograph to upload.');
      return;
    }

    setIsUploadingMemory(true);
    setMemoryUploadError('');

    try {
      const finalDest = batchMemoryDestination === 'Other / Custom' 
        ? (batchMemoryCustomDest.trim() || 'Domestic Tour') 
        : batchMemoryDestination;
      
      const finalTripType = batchMemoryTripType === 'Other / Custom'
        ? (batchMemoryCustomTripType.trim() || 'Holiday Tour')
        : batchMemoryTripType;

      const createdList: CustomerMemory[] = [];

      for (let i = 0; i < stagedFiles.length; i++) {
        const item = stagedFiles[i];
        const uploadRes = await uploadCustomerPhoto(item.file);
        if (!uploadRes.success || !uploadRes.url) {
          throw new Error(uploadRes.error || `Failed to upload ${item.name}`);
        }

        createdList.push({
          id: `mem-${Date.now()}-${i}`,
          imageUrl: uploadRes.url,
          destination: finalDest,
          tripType: finalTripType,
          tripDate: batchMemoryDate.trim() || 'October 2026',
          caption: batchMemoryCaption.trim() || undefined,
          isPublished: batchMemoryPublish,
          isFeatured: i === 0,
          aspectRatio: 'landscape',
          createdAt: new Date().toISOString()
        });
      }

      const saveRes = saveMultipleCustomerMemories(createdList);
      if (!saveRes.success) {
        throw new Error(saveRes.error || 'Failed to save customer memories.');
      }

      setStagedFiles([]);
      setBatchMemoryCaption('');
      setBatchMemoryCustomDest('');
      setBatchMemoryCustomTripType('');
      setIsNewMemoryModal(false);
      loadData();
    } catch (err: any) {
      setMemoryUploadError(err.message || 'Error uploading customer photos.');
    } finally {
      setIsUploadingMemory(false);
    }
  };

  const handleReplacePhotoInEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMemory) return;

    setIsUploadingMemory(true);
    setMemoryUploadError('');
    try {
      const res = await uploadCustomerPhoto(file);
      if (res.success && res.url) {
        setEditingMemory({ ...editingMemory, imageUrl: res.url });
      } else {
        setMemoryUploadError(res.error || 'Failed to replace image.');
      }
    } catch (err: any) {
      setMemoryUploadError(err.message || 'Failed to replace image.');
    } finally {
      setIsUploadingMemory(false);
    }
  };

  const handleLoadSampleMemories = () => {
    loadSampleMemories();
    loadData();
  };

  const handleClearAllMemories = () => {
    if (window.confirm('Are you sure you want to remove all customer memory photos and restore the initial empty state?')) {
      clearAllMemories();
      loadData();
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  // Status update
  const handleStatusChange = (id: string, newStatus: EnquirySubmission['status']) => {
    updateEnquiryStatus(id, newStatus);
    loadData();
    if (inspectEnquiry && inspectEnquiry.id === id) {
      setInspectEnquiry({ ...inspectEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string) => {
    updateEnquiryStatus(id, inspectEnquiry?.status || 'In Progress', inspectorNotes);
    loadData();
    if (inspectEnquiry) {
      setInspectEnquiry({ ...inspectEnquiry, adminNotes: inspectorNotes });
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      deleteEnquiry(id);
      loadData();
      if (inspectEnquiry?.id === id) setInspectEnquiry(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ref', 'Date', 'Status', 'Customer', 'Phone', 'Email', 'Destination', 'Adults', 'Kids', 'Budget'];
    const rows = enquiries.map(e => [
      e.referenceNumber,
      e.createdAt,
      e.status,
      `"${e.customerName}"`,
      `"${e.phone}"`,
      e.email,
      `"${e.destination || ''}"`,
      e.adultsCount,
      e.childrenCount,
      `"${e.budgetRange || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `yazhi_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    saveCatalogPackage(editingPackage);
    setEditingPackage(null);
    loadData();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this holiday package?')) {
      deleteCatalogPackage(id);
      loadData();
    }
  };

  // Destination Photo Management Handlers
  const handlePhotoUploadForDestination = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'hero' | 'thumbnail' | 'gallery'
  ) => {
    if (!e.target.files || !e.target.files[0] || !managingPhotosDestination) return;
    const file = e.target.files[0];
    setIsUploading(true);
    setUploadError('');

    const res = await uploadAdminImage(file, 'destination');
    setIsUploading(false);
    if (!res.success || !res.url) {
      setUploadError(res.error || 'Failed to upload photo.');
      return;
    }

    const currentDest = destinations.find(d => d.id === managingPhotosDestination.id) || managingPhotosDestination;
    let updatedDest: Destination;

    if (type === 'hero') {
      updatedDest = { ...currentDest, heroImage: res.url };
    } else if (type === 'thumbnail') {
      updatedDest = { ...currentDest, thumbnail: res.url };
    } else {
      const currentGallery = currentDest.gallery || [];
      updatedDest = { ...currentDest, gallery: [...currentGallery, res.url] };
    }

    saveCatalogDestination(updatedDest);
    setManagingPhotosDestination(updatedDest);
    loadData();
    e.target.value = '';
  };

  const handleRemoveGalleryPhoto = (urlToRemove: string) => {
    if (!managingPhotosDestination) return;
    const currentDest = destinations.find(d => d.id === managingPhotosDestination.id) || managingPhotosDestination;
    const updatedGallery = (currentDest.gallery || []).filter(u => u !== urlToRemove);
    const updatedDest: Destination = { ...currentDest, gallery: updatedGallery };
    saveCatalogDestination(updatedDest);
    setManagingPhotosDestination(updatedDest);
    loadData();
  };

  const handleDeleteDestination = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination from the catalog?')) {
      deleteCatalogDestination(id);
      loadData();
      if (managingPhotosDestination?.id === id) setManagingPhotosDestination(null);
    }
  };

  // Review Management Handlers
  const handlePhotoUploadForReview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !editingReview) return;
    const file = e.target.files[0];
    setIsUploading(true);
    setUploadError('');

    const res = await uploadAdminImage(file, 'review');
    setIsUploading(false);
    if (!res.success || !res.url) {
      setUploadError(res.error || 'Failed to upload customer photo.');
      return;
    }

    setEditingReview({ ...editingReview, avatar: res.url, photo: res.url });
    e.target.value = '';
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    saveReview(editingReview);
    setEditingReview(null);
    loadData();
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      deleteReview(id);
      loadData();
    }
  };

  const handleOpenNewReview = () => {
    setIsNewReview(true);
    setEditingReview({
      id: `rev-${Date.now()}`,
      customerName: '',
      destination: 'Ooty & Nilgiri Hills, Tamil Nadu',
      travelDate: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
      rating: 5,
      comment: '',
      tripType: 'Family Holiday',
      avatar: '',
      verified: true
    });
  };


  const handleCreateNewPackageModal = () => {
    setIsNewPackage(true);
    setEditingPackage({
      id: `pkg-${Date.now()}`,
      slug: `custom-package-${Date.now()}`,
      title: 'New Curated Journey',
      destinationSlug: 'bali',
      destinationName: 'Bali, Indonesia',
      durationDays: 5,
      durationNights: 4,
      durationLabel: '5 Days / 4 Nights',
      startingPriceINR: 45000,
      tripType: 'Honeymoon',
      region: 'International',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
      overview: 'A bespoke travel package handcrafted with exceptional care and verified stays.',
      inclusions: ['4-Star/5-Star Boutique Stays', 'Daily Breakfast', 'Private Airport Transfers'],
      exclusions: ['International Flights', 'Visa on Arrival Fees', 'Personal Gratuities'],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome Dinner',
          location: 'Arrival Hub',
          description: 'Meet and greet by private chauffeur and hotel check-in.',
          mealsIncluded: 'Dinner',
          stay: 'Boutique Resort'
        }
      ],
      accommodationType: 'Boutique Deluxe Resort',
      transportType: 'Private AC Chauffeur Vehicle',
      highlights: ['Private Sightseeing', 'Authentic Dining', '24/7 Concierge Support'],
      cancellationPolicy: ['Free cancellation up to 15 days before departure.']
    });
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesFilter = enquiryFilter === 'All' || e.status === enquiryFilter;
    const matchesSearch = !enquirySearch.trim() ||
      e.customerName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.destination && e.destination.toLowerCase().includes(enquirySearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredCustomerMemories = customerMemories.filter(m => {
    const matchesDest = memoryFilterDest === 'All' || m.destination.toLowerCase() === memoryFilterDest.toLowerCase();
    const matchesStatus = memoryFilterStatus === 'All' 
      ? true 
      : memoryFilterStatus === 'Published' 
      ? m.isPublished 
      : !m.isPublished;
    const matchesSearch = !memorySearch.trim() ||
      m.destination.toLowerCase().includes(memorySearch.toLowerCase()) ||
      (m.caption && m.caption.toLowerCase().includes(memorySearch.toLowerCase())) ||
      (m.tripType && m.tripType.toLowerCase().includes(memorySearch.toLowerCase())) ||
      m.tripDate.toLowerCase().includes(memorySearch.toLowerCase());
    return matchesDest && matchesStatus && matchesSearch;
  });

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-sand-ivory flex flex-col pt-16">
      
      {/* Top Admin Bar */}
      <header className="bg-navy-midnight text-white border-b border-navy-royal/60 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-luxury-dark">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-gold-metallic to-gold-royal shadow-gold-glow flex-shrink-0">
            <img src="/yazhi-logo.jpg" alt="Yazhi Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className="font-serif text-lg font-semibold text-white">Yazhi Holidays Concierge Console</span>
            <span className="text-[10px] font-mono text-gold-royal uppercase block">Logged in as {currentUser?.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" target="_blank" className="text-xs text-sand-ivory/80 hover:text-gold-royal transition-colors hidden sm:block">
            View Live Site &rarr;
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-700/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-sand-border pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'enquiries', label: `Customer Enquiries (${newEnquiriesCount} New)`, icon: MessageSquare },
            { id: 'packages', label: `Packages (${packages.length})`, icon: Package },
            { id: 'destinations', label: `Destinations & Photos (${destinations.length})`, icon: MapPin },
            { id: 'reviews', label: `Reviews & Photos (${reviews.length})`, icon: Star },
            { id: 'customer_memories', label: `Happy Customers (${customerMemories.length})`, icon: Camera },
            { id: 'settings', label: 'Company Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy-midnight text-gold-royal shadow-sm'
                  : 'bg-white text-slate-body border border-sand-border hover:bg-sand-card'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">TOTAL ENQUIRIES</span>
                <span className="font-serif text-3xl font-bold text-navy-primary">{enquiries.length}</span>
                <span className="text-[11px] text-emerald-600 block mt-2 font-medium">Recorded in system</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">PENDING LEADS</span>
                <span className="font-serif text-3xl font-bold text-gold-metallic">{newEnquiriesCount}</span>
                <span className="text-[11px] text-slate-muted block mt-2">Requires concierge contact</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">PACKAGES</span>
                <span className="font-serif text-3xl font-bold text-navy-primary">{packages.length}</span>
                <span className="text-[11px] text-slate-muted block mt-2">Domestic & Intl</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">DESTINATIONS</span>
                <span className="font-serif text-3xl font-bold text-navy-primary">{destinations.length}</span>
                <span className="text-[11px] text-slate-muted block mt-2">Curated locations</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">CUSTOMER MEMORIES</span>
                <span className="font-serif text-3xl font-bold text-gold-metallic">{customerMemories.length}</span>
                <span className="text-[11px] text-emerald-600 block mt-2 font-medium">
                  {customerMemories.filter(m => m.isPublished).length} Live on Website
                </span>
              </div>
            </div>

            {/* Recent Enquiries Feed */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                    Recent Customer Enquiries
                  </h3>
                  <p className="text-xs text-slate-muted">Latest travel requests submitted through planner and website</p>
                </div>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-semibold text-gold-metallic hover:underline"
                >
                  Manage All ({enquiries.length}) &rarr;
                </button>
              </div>

              <div className="divide-y divide-sand-border">
                {enquiries.slice(0, 5).map(e => (
                  <div key={e.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-navy-primary">{e.referenceNumber}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                          e.status === 'New' ? 'bg-amber-100 text-amber-800' :
                          e.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          e.status === 'Quoted' ? 'bg-purple-100 text-purple-800' :
                          e.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {e.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-navy-primary mt-1">{e.customerName}</h4>
                      <p className="text-xs text-slate-muted">
                        {e.destination} • {e.adultsCount} Adults • Method: {e.preferredContact} ({e.phone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e.id, ev.target.value as any)}
                        className="px-2 py-1 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => {
                          setInspectEnquiry(e);
                          setInspectorNotes(e.adminNotes || '');
                        }}
                        className="p-1.5 text-navy-primary hover:text-gold-metallic rounded bg-sand-card"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Customer Travel Enquiries ({filteredEnquiries.length})
                </h3>
                <p className="text-xs text-slate-muted">Review, update statuses, add concierge notes, or export records</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-navy-primary border border-sand-border hover:bg-sand-card flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-gold-metallic" />
                  <span>Export to CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-muted absolute left-3 top-3" />
                <input
                  type="text"
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  placeholder="Search customer, reference number, destination..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['All', 'New', 'Contacted', 'In Progress', 'Quoted', 'Completed', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setEnquiryFilter(st)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap ${
                      enquiryFilter === st
                        ? 'bg-navy-midnight text-gold-royal border-gold-royal'
                        : 'bg-sand-ivory text-slate-body border-sand-border hover:bg-sand-card'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sand-card text-slate-muted font-mono uppercase text-[10px] border-b border-sand-border">
                  <tr>
                    <th className="py-3 px-3">Ref ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Guest Name</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Destination</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-border">
                  {filteredEnquiries.map(e => (
                    <tr key={e.id} className="hover:bg-sand-card/30">
                      <td className="py-3 px-3 font-mono font-semibold text-navy-primary">{e.referenceNumber}</td>
                      <td className="py-3 px-3 text-slate-muted">{new Date(e.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-3 font-medium text-navy-primary">{e.customerName}</td>
                      <td className="py-3 px-3">
                        <span className="block">{e.phone}</span>
                        <span className="text-[10px] text-slate-muted">{e.preferredContact}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-body">{e.destination || 'Custom'}</td>
                      <td className="py-3 px-3">
                        <select
                          value={e.status}
                          onChange={(ev) => handleStatusChange(e.id, ev.target.value as any)}
                          className={`text-xs px-2 py-1 rounded font-semibold ${
                            e.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            e.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            e.status === 'Quoted' ? 'bg-purple-100 text-purple-800' :
                            e.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setInspectEnquiry(e);
                            setInspectorNotes(e.adminNotes || '');
                          }}
                          className="p-1.5 bg-sand-card rounded text-navy-primary hover:text-gold-metallic"
                          title="Inspect & Add Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEnquiry(e.id)}
                          className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: PACKAGE MANAGEMENT */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Holiday Packages Catalog ({packages.length})
                </h3>
                <p className="text-xs text-slate-muted">Create, edit duration, pricing in INR, itinerary days, and inclusions</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCreateNewPackageModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Package</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reset catalog to verified default packages?')) {
                      resetCatalogToDefault();
                      loadData();
                    }
                  }}
                  className="p-2 text-slate-muted hover:text-navy-primary bg-sand-card rounded-lg"
                  title="Reset to default"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(p => (
                <div key={p.id} className="border border-sand-border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                  <div className="h-44 relative overflow-hidden">
                    <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-navy-midnight/80 text-gold-royal">
                      {p.tripType} • {p.region}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-gold-metallic block">{p.destinationName} • {p.durationLabel}</span>
                      <h4 className="font-serif text-xl font-semibold text-navy-primary mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-muted mt-2 line-clamp-2">{p.overview}</p>
                    </div>

                    <div className="pt-3 border-t border-sand-border flex items-center justify-between">
                      <span className="font-mono text-base font-bold text-navy-primary">₹{p.startingPriceINR.toLocaleString('en-IN')}</span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsNewPackage(false);
                            setEditingPackage(p);
                          }}
                          className="p-1.5 rounded bg-sand-card text-navy-primary hover:text-gold-metallic"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(p.id)}
                          className="p-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: DESTINATIONS & PHOTO MANAGEMENT */}
        {activeTab === 'destinations' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-border">
              <div>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Domestic Destinations & Photos ({destinations.length})
                </h3>
                <p className="text-xs text-slate-muted">
                  Manage domestic destination photos, thumbnails, and gallery collections. All edits update live on the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset destinations catalog to verified Indian destinations?')) {
                      resetCatalogToDefault();
                      loadData();
                    }
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-sand-border bg-sand-card text-navy-primary hover:bg-sand-ivory flex items-center gap-1.5"
                  title="Reset to default domestic destinations"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map(d => (
                <div key={d.id} className="border border-sand-border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between group">
                  <div className="h-40 relative overflow-hidden">
                    <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-navy-midnight/85 text-gold-royal border border-gold-royal/30">
                      {d.region}
                    </span>
                    <button
                      onClick={() => setManagingPhotosDestination(d)}
                      className="absolute inset-0 bg-navy-midnight/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-gold-light font-semibold backdrop-blur-[2px]"
                    >
                      <Camera className="w-4 h-4 text-gold-royal" />
                      <span>Manage Photos</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-muted uppercase">{d.country}</span>
                      <h4 className="font-serif text-base font-semibold text-navy-primary">{d.name}</h4>
                      <p className="text-xs text-slate-muted line-clamp-2 mt-1">{d.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-sand-border flex items-center justify-between">
                      <button
                        onClick={() => setManagingPhotosDestination(d)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-midnight text-gold-royal hover:bg-navy-royal transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Camera className="w-3.5 h-3.5 text-gold-royal" />
                        <span>Photos</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <Link to={`/destinations/${d.slug}`} target="_blank" className="p-1.5 text-slate-muted hover:text-navy-primary" title="View destination page">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteDestination(d.id)}
                          className="p-1.5 text-red-600 hover:text-red-800"
                          title="Delete destination"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER REVIEWS & TESTIMONIALS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-border">
              <div>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Customer Reviews & Photos ({reviews.length})
                </h3>
                <p className="text-xs text-slate-muted">
                  Manage verified guest testimonials, customer photos, star ratings, and review feedback displayed dynamically on the public website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset reviews to verified default customer testimonials?')) {
                      resetReviewsToDefault();
                      loadData();
                    }
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-sand-border bg-sand-card text-navy-primary hover:bg-sand-ivory flex items-center gap-1.5"
                  title="Reset to default reviews"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
                <button
                  onClick={handleOpenNewReview}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map(r => (
                <div key={r.id} className="border border-sand-border rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold-royal/40 bg-sand-card flex items-center justify-center">
                          {r.avatar || r.photo ? (
                            <img src={r.avatar || r.photo} alt={r.customerName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-serif font-bold text-navy-primary text-base">
                              {r.customerName.charAt(0) || 'G'}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-semibold text-navy-primary leading-tight">{r.customerName}</h4>
                          <span className="text-[11px] font-mono text-gold-metallic block">{r.tripType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gold-royal">
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-royal" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-body italic line-clamp-3 leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sand-border flex items-center justify-between text-[11px] font-mono text-slate-muted">
                    <div>
                      <span className="block text-navy-primary font-medium">{r.destination}</span>
                      <span>{r.travelDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setIsNewReview(false);
                          setEditingReview(r);
                        }}
                        className="p-1.5 rounded bg-sand-card text-navy-primary hover:text-gold-metallic"
                        title="Edit Review & Photo"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="p-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HAPPY CUSTOMERS TRIP MEMORIES MANAGEMENT */}
        {activeTab === 'customer_memories' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-border">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                    Happy Customers Gallery Management
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sand-card text-gold-metallic border border-sand-border">
                    {customerMemories.length} Photos ({customerMemories.filter(m => m.isPublished).length} Published)
                  </span>
                </div>
                <p className="text-xs text-slate-muted mt-1">
                  Upload genuine domestic trip photos (Ooty, Munnar, Kodaikanal, Coorg, Goa, etc.), edit captions, and control which photos appear publicly.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleLoadSampleMemories}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-sand-border bg-sand-card text-navy-primary hover:bg-sand-ivory flex items-center gap-1.5 transition-colors"
                  title="Populate authentic demonstration domestic trip photos"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gold-metallic" />
                  <span>Load Sample Trip Memories</span>
                </button>

                {customerMemories.length > 0 && (
                  <button
                    onClick={handleClearAllMemories}
                    className="px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1.5 transition-colors"
                    title="Clear all photos to restore empty state"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setStagedFiles([]);
                    setMemoryUploadError('');
                    setIsNewMemoryModal(true);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Customer Photos</span>
                </button>
              </div>
            </div>

            {/* Privacy and Photography Consent Notice */}
            <div className="bg-sand-ivory/80 border border-gold-royal/30 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-body">
              <Sparkles className="w-5 h-5 text-gold-royal flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-navy-primary">Responsible Photography & Guest Privacy Notice:</span>
                <p className="text-slate-muted mt-0.5 leading-relaxed">
                  Only authentic photographs taken during Yazhi Holidays domestic tours are permitted. Ensure appropriate traveler consent is obtained before publishing identifiable customer photos, especially for family groups and children. Unchecking "Published" keeps photos safely stored in your admin console without displaying them to the public.
                </p>
              </div>
            </div>

            {/* Filters & Search Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                {/* Destination Filter */}
                <select
                  value={memoryFilterDest}
                  onChange={(e) => setMemoryFilterDest(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary font-medium"
                >
                  <option value="All">All Destinations ({customerMemories.length})</option>
                  {STANDARD_DOMESTIC_DESTINATIONS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                  {Array.from(new Set(customerMemories.map(m => m.destination)))
                    .filter(d => !STANDARD_DOMESTIC_DESTINATIONS.includes(d))
                    .map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                  value={memoryFilterStatus}
                  onChange={(e) => setMemoryFilterStatus(e.target.value as any)}
                  className="px-3 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Published">Published ({customerMemories.filter(m => m.isPublished).length})</option>
                  <option value="Draft">Drafts / Unpublished ({customerMemories.filter(m => !m.isPublished).length})</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-3.5 h-3.5 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={memorySearch}
                  onChange={(e) => setMemorySearch(e.target.value)}
                  placeholder="Search caption, trip type, date..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary"
                />
              </div>
            </div>

            {/* Memories Grid Display */}
            {filteredCustomerMemories.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-sand-border rounded-2xl bg-sand-ivory/40">
                <Camera className="w-12 h-12 text-gold-royal/50 mx-auto mb-3" />
                <h4 className="font-serif text-lg text-navy-primary font-semibold mb-1">
                  No Customer Memories Found
                </h4>
                <p className="text-xs text-slate-muted max-w-md mx-auto mb-5 leading-relaxed">
                  {customerMemories.length === 0 
                    ? "Your customer gallery is currently empty. Click 'Upload Customer Photos' to add real customer trip photos, or click 'Load Sample Trip Memories' to populate demonstration domestic photos."
                    : "No photographs match your active destination or status filters. Try clearing your search or filter."
                  }
                </p>
                {customerMemories.length === 0 ? (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setStagedFiles([]);
                        setMemoryUploadError('');
                        setIsNewMemoryModal(true);
                      }}
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light"
                    >
                      Upload First Photo
                    </button>
                    <button
                      onClick={handleLoadSampleMemories}
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-sand-border bg-white text-navy-primary hover:bg-sand-ivory"
                    >
                      Load Sample Photos
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMemoryFilterDest('All');
                      setMemoryFilterStatus('All');
                      setMemorySearch('');
                    }}
                    className="text-xs text-gold-metallic font-semibold hover:underline"
                  >
                    Reset Active Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCustomerMemories.map(m => (
                  <div 
                    key={m.id}
                    className="bg-white rounded-2xl border border-sand-border shadow-sm overflow-hidden flex flex-col justify-between group hover:border-gold-royal/50 transition-all"
                  >
                    {/* Photo with Overlay Badges */}
                    <div className="relative h-48 bg-navy-midnight overflow-hidden">
                      <img 
                        src={m.imageUrl} 
                        alt={m.caption || m.destination} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />

                      {/* Destination & Trip Type Badge */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                          {m.destination}
                        </span>
                        {m.tripType && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-white/90 text-navy-primary backdrop-blur-md">
                            {m.tripType}
                          </span>
                        )}
                      </div>

                      {/* Status indicator on image */}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-semibold flex items-center gap-1 backdrop-blur-md ${
                          m.isPublished 
                            ? 'bg-emerald-600/90 text-white border border-emerald-400/30' 
                            : 'bg-amber-600/90 text-white border border-amber-400/30'
                        }`}>
                          {m.isPublished ? <CheckCircle2 className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                          <span>{m.isPublished ? 'Published' : 'Draft / Hidden'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Caption */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-muted mb-2">
                          <span className="flex items-center gap-1 text-gold-metallic">
                            <Calendar className="w-3 h-3" />
                            <span>{m.tripDate}</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-body leading-relaxed line-clamp-3 mb-3">
                          {m.caption ? `“${m.caption}”` : <span className="text-slate-muted italic">No caption provided</span>}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-sand-border flex items-center justify-between">
                        <button
                          onClick={() => handleTogglePublishMemory(m.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold flex items-center gap-1 transition-colors ${
                            m.isPublished
                              ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          }`}
                          title={m.isPublished ? 'Click to Unpublish from website' : 'Click to Publish to public website'}
                        >
                          {m.isPublished ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-amber-600" />}
                          <span>{m.isPublished ? 'Live' : 'Hidden'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingMemory(m);
                              setMemoryUploadError('');
                            }}
                            className="p-1.5 rounded bg-sand-card text-navy-primary hover:bg-sand-ivory border border-sand-border transition-colors"
                            title="Edit Photo Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMemory(m.id)}
                            className="p-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}


        {/* TAB 7: COMPANY SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                Agency & Brand Configuration
              </h3>
              <p className="text-xs text-slate-muted">Official business contact details displayed across the website and footer</p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Agency contact settings successfully updated!</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">Business Phone:</label>
                <input
                  type="text"
                  value={settings.businessPhone}
                  onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">WhatsApp Concierge Number:</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">Official Email Address:</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">Registered Office Address:</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">Business Hours:</label>
                <input
                  type="text"
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary font-sans"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 4000);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* INSPECT ENQUIRY MODAL */}
      {inspectEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-midnight/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-sand-ivory w-full max-w-2xl rounded-2xl shadow-luxury-dark border border-sand-border overflow-hidden">
            <div className="bg-navy-midnight text-white px-6 py-4 flex items-center justify-between border-b border-navy-royal/60">
              <div>
                <span className="text-[10px] font-mono text-gold-royal uppercase">ENQUIRY RECORD INSPECTOR</span>
                <h3 className="font-serif text-2xl font-semibold">{inspectEnquiry.referenceNumber}</h3>
              </div>
              <button
                onClick={() => setInspectEnquiry(null)}
                className="p-1.5 text-sand-ivory hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-slate-body max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-sand-border">
                <div>
                  <span className="text-slate-muted block font-mono">GUEST NAME</span>
                  <span className="font-semibold text-navy-primary text-sm">{inspectEnquiry.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">PHONE</span>
                  <a href={`tel:${inspectEnquiry.phone}`} className="text-navy-primary font-medium hover:underline block">{inspectEnquiry.phone}</a>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">EMAIL</span>
                  <a href={`mailto:${inspectEnquiry.email}`} className="text-navy-primary font-medium hover:underline block">{inspectEnquiry.email}</a>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">DESTINATION</span>
                  <span className="text-navy-primary font-semibold">{inspectEnquiry.destination || 'Custom'}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">TRAVELLERS</span>
                  <span className="text-navy-primary">{inspectEnquiry.adultsCount} Adults, {inspectEnquiry.childrenCount} Kids</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">PREFERRED CONTACT</span>
                  <span className="text-gold-metallic font-semibold">{inspectEnquiry.preferredContact}</span>
                </div>
              </div>

              {inspectEnquiry.specialRequests && (
                <div className="p-3 bg-white rounded-xl border border-sand-border">
                  <span className="text-slate-muted block font-mono mb-1">GUEST NOTES & SPECIAL REQUESTS:</span>
                  <p className="text-xs text-slate-body">{inspectEnquiry.specialRequests}</p>
                </div>
              )}

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-navy-primary mb-1 font-mono uppercase">
                  Update Lead Status:
                </label>
                <select
                  value={inspectEnquiry.status}
                  onChange={(ev) => handleStatusChange(inspectEnquiry.id, ev.target.value as any)}
                  className="px-3 py-2 bg-white border border-sand-border rounded-lg text-navy-primary font-sans text-xs w-full"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="block text-xs font-semibold text-navy-primary mb-1 font-mono uppercase">
                  Internal Staff & Concierge Notes:
                </label>
                <textarea
                  rows={3}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  placeholder="e.g. Spoke to client on phone. Quoted private pool villa. Awaiting flight confirmation..."
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-navy-primary font-sans text-xs resize-none"
                ></textarea>
                <button
                  type="button"
                  onClick={() => handleSaveNotes(inspectEnquiry.id)}
                  className="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-navy-midnight bg-gold-royal hover:bg-gold-light transition-colors"
                >
                  Save Internal Notes
                </button>
              </div>

              {/* Direct Quick Contact Action */}
              <div className="pt-4 border-t border-sand-border flex items-center justify-between">
                <a
                  href={`https://wa.me/${inspectEnquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inspectEnquiry.customerName)},%20this%20is%20Yazhi%20Holidays%20regarding%20your%20enquiry%20${encodeURIComponent(inspectEnquiry.referenceNumber)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Initiate WhatsApp Chat with Guest</span>
                </a>

                <button
                  onClick={() => setInspectEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-muted hover:text-navy-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE PACKAGE MODAL */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-midnight/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-sand-ivory w-full max-w-2xl rounded-2xl shadow-luxury-dark border border-sand-border overflow-hidden">
            <div className="bg-navy-midnight text-white px-6 py-4 flex items-center justify-between border-b border-navy-royal/60">
              <h3 className="font-serif text-2xl font-semibold">
                {isNewPackage ? 'Create New Holiday Package' : `Edit ${editingPackage.title}`}
              </h3>
              <button
                onClick={() => setEditingPackage(null)}
                className="p-1.5 text-sand-ivory hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-6 space-y-4 text-xs text-slate-body max-h-[75vh] overflow-y-auto font-sans">
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase">Package Title:</label>
                <input
                  type="text"
                  required
                  value={editingPackage.title}
                  onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-sm text-navy-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Destination Name:</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.destinationName}
                    onChange={(e) => setEditingPackage({ ...editingPackage, destinationName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Duration Label:</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.durationLabel}
                    onChange={(e) => setEditingPackage({ ...editingPackage, durationLabel: e.target.value })}
                    placeholder="e.g. 6 Days / 5 Nights"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Starting Price (INR):</label>
                  <input
                    type="number"
                    required
                    value={editingPackage.startingPriceINR}
                    onChange={(e) => setEditingPackage({ ...editingPackage, startingPriceINR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs font-mono text-navy-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Trip Type:</label>
                  <select
                    value={editingPackage.tripType}
                    onChange={(e) => setEditingPackage({ ...editingPackage, tripType: e.target.value as TripType })}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  >
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Family">Family</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Leisure">Leisure</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Region:</label>
                  <select
                    value={editingPackage.region}
                    onChange={(e) => setEditingPackage({ ...editingPackage, region: e.target.value as RegionType })}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase">Hero Image URL:</label>
                <input
                  type="url"
                  required
                  value={editingPackage.heroImage}
                  onChange={(e) => setEditingPackage({ ...editingPackage, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase">Package Overview:</label>
                <textarea
                  rows={3}
                  required
                  value={editingPackage.overview}
                  onChange={(e) => setEditingPackage({ ...editingPackage, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-sand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-muted hover:text-navy-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESTINATION PHOTO MANAGEMENT MODAL */}
      {managingPhotosDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-midnight/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-luxury-dark border border-sand-border space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sand-border">
              <div>
                <span className="text-[10px] font-mono uppercase text-gold-metallic block tracking-wider">ADMIN PHOTO MANAGER</span>
                <h3 className="font-serif text-2xl font-semibold text-navy-primary">
                  {managingPhotosDestination.name}
                </h3>
                <p className="text-xs text-slate-muted">{managingPhotosDestination.tagline}</p>
              </div>
              <button
                onClick={() => {
                  setManagingPhotosDestination(null);
                  setUploadError('');
                }}
                className="p-2 text-slate-muted hover:text-navy-primary rounded-full hover:bg-sand-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Uploading indicator & errors */}
            {isUploading && (
              <div className="p-3 rounded-xl bg-gold-royal/10 border border-gold-royal/30 flex items-center gap-2 text-xs text-navy-primary font-mono animate-pulse">
                <UploadCloud className="w-4 h-4 text-gold-royal animate-bounce" />
                <span>Processing & securely saving image to server storage...</span>
              </div>
            )}
            {uploadError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Section 1: Hero Cover Photo */}
            <div className="space-y-3 pb-6 border-b border-sand-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary flex items-center gap-2">
                    <Image className="w-4 h-4 text-gold-royal" />
                    <span>Hero Cover Photo</span>
                  </h4>
                  <p className="text-xs text-slate-muted">Displayed prominently on the destination detail header</p>
                </div>
                <label className="cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-midnight text-gold-royal hover:bg-navy-royal transition-colors flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Replace Hero</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => handlePhotoUploadForDestination(e, 'hero')}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="h-48 sm:h-56 rounded-xl overflow-hidden border border-sand-border relative bg-sand-card">
                <img
                  src={managingPhotosDestination.heroImage}
                  alt={managingPhotosDestination.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Section 2: Thumbnail Photo */}
            <div className="space-y-3 pb-6 border-b border-sand-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary flex items-center gap-2">
                    <Image className="w-4 h-4 text-gold-royal" />
                    <span>Card Thumbnail Photo</span>
                  </h4>
                  <p className="text-xs text-slate-muted">Used in destination portfolio cards and catalog grids</p>
                </div>
                <label className="cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-midnight text-gold-royal hover:bg-navy-royal transition-colors flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Replace Thumbnail</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => handlePhotoUploadForDestination(e, 'thumbnail')}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="w-48 h-32 rounded-xl overflow-hidden border border-sand-border bg-sand-card">
                <img
                  src={managingPhotosDestination.thumbnail}
                  alt={`${managingPhotosDestination.name} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Section 3: Gallery Photos Collection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gold-royal" />
                    <span>Gallery Photos ({managingPhotosDestination.gallery?.length || 0})</span>
                  </h4>
                  <p className="text-xs text-slate-muted">High-resolution scenery gallery displayed on the public page</p>
                </div>
                <label className="cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gold-royal text-navy-midnight hover:bg-gold-light transition-colors flex items-center gap-1.5 shadow-sm">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload to Gallery</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => handlePhotoUploadForDestination(e, 'gallery')}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(managingPhotosDestination.gallery || []).map((imgUrl, idx) => (
                  <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-sand-border group bg-sand-card">
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveGalleryPhoto(imgUrl)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md"
                      title="Delete photo from gallery"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-sand-border flex justify-end">
              <button
                onClick={() => {
                  setManagingPhotosDestination(null);
                  setUploadError('');
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER REVIEW EDITOR MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-midnight/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-luxury-dark border border-sand-border space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-sand-border">
              <div>
                <span className="text-[10px] font-mono uppercase text-gold-metallic block tracking-wider">ADMIN REVIEW MANAGER</span>
                <h3 className="font-serif text-2xl font-semibold text-navy-primary">
                  {isNewReview ? 'Add Verified Customer Review' : 'Edit Customer Review & Photo'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingReview(null);
                  setUploadError('');
                }}
                className="p-2 text-slate-muted hover:text-navy-primary rounded-full hover:bg-sand-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Status / Errors */}
            {isUploading && (
              <div className="p-3 rounded-xl bg-gold-royal/10 border border-gold-royal/30 flex items-center gap-2 text-xs text-navy-primary font-mono animate-pulse">
                <UploadCloud className="w-4 h-4 text-gold-royal animate-bounce" />
                <span>Uploading customer photo to secure storage...</span>
              </div>
            )}
            {uploadError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs font-sans">
              {/* Customer Photo Upload Section */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-sand-card border border-sand-border">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-royal/50 flex-shrink-0 bg-white flex items-center justify-center">
                  {editingReview.avatar || editingReview.photo ? (
                    <img src={editingReview.avatar || editingReview.photo} alt="Customer avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-serif text-xl font-bold text-navy-primary">
                      {editingReview.customerName.charAt(0) || 'G'}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="font-semibold text-navy-primary block">Customer Profile Photo</span>
                  <p className="text-[11px] text-slate-muted">Admin-only image upload. Stored securely and displayed on public reviews.</p>
                  <div className="flex items-center gap-2 pt-1">
                    <label className="cursor-pointer px-3 py-1 rounded text-[11px] font-semibold bg-navy-midnight text-gold-royal hover:bg-navy-royal transition-colors inline-flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={handlePhotoUploadForReview}
                        disabled={isUploading}
                      />
                    </label>
                    {(editingReview.avatar || editingReview.photo) && (
                      <button
                        type="button"
                        onClick={() => setEditingReview({ ...editingReview, avatar: '', photo: '' })}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Name & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Customer Name:</label>
                  <input
                    type="text"
                    required
                    value={editingReview.customerName}
                    onChange={(e) => setEditingReview({ ...editingReview, customerName: e.target.value })}
                    placeholder="e.g. Karthik & Deepa Sundaram"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Domestic Destination:</label>
                  <input
                    type="text"
                    required
                    value={editingReview.destination}
                    onChange={(e) => setEditingReview({ ...editingReview, destination: e.target.value })}
                    placeholder="e.g. Ooty & Nilgiri Hills, Tamil Nadu"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
              </div>

              {/* Travel Date & Trip Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Travel Date / Month:</label>
                  <input
                    type="text"
                    required
                    value={editingReview.travelDate}
                    onChange={(e) => setEditingReview({ ...editingReview, travelDate: e.target.value })}
                    placeholder="e.g. October 2026"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Trip Type:</label>
                  <input
                    type="text"
                    required
                    value={editingReview.tripType}
                    onChange={(e) => setEditingReview({ ...editingReview, tripType: e.target.value })}
                    placeholder="e.g. Honeymoon & Hill Retreat"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
              </div>

              {/* Star Rating & Verified Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase">Rating (1-5 Stars):</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-navy-primary">
                    <input
                      type="checkbox"
                      checked={editingReview.verified !== false}
                      onChange={(e) => setEditingReview({ ...editingReview, verified: e.target.checked })}
                      className="rounded text-gold-royal focus:ring-gold-royal"
                    />
                    <span>Verified Guest Badge</span>
                  </label>
                </div>
              </div>

              {/* Comment Text */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase">Customer Review Quote:</label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                  placeholder="Enter genuine customer testimonial..."
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary resize-none"
                />
              </div>

              <div className="pt-4 border-t border-sand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null);
                    setUploadError('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-muted hover:text-navy-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light disabled:opacity-50"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD MULTIPLE CUSTOMER MEMORIES */}
      {isNewMemoryModal && (
        <div className="fixed inset-0 z-50 bg-navy-midnight/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-sand-border shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-sand-border mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy-primary">
                  Upload Customer Trip Photos
                </h3>
                <p className="text-xs text-slate-muted mt-1">
                  Upload multiple genuine photos of customers enjoying domestic tours with Yazhi Holidays.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewMemoryModal(false);
                  setStagedFiles([]);
                  setMemoryUploadError('');
                }}
                className="p-2 text-slate-muted hover:text-navy-primary rounded-full hover:bg-sand-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {memoryUploadError && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{memoryUploadError}</span>
              </div>
            )}

            <form onSubmit={handleBatchSubmitMemories} className="space-y-5 text-xs">
              
              {/* File Dropzone & Multi-file selection */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1.5 uppercase tracking-wider">
                  Select Customer Photos (Single or Multiple):
                </label>
                <div className="border-2 border-dashed border-sand-border hover:border-gold-royal/60 rounded-2xl p-6 text-center bg-sand-ivory/50 transition-colors cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelectForStaging}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <UploadCloud className="w-10 h-10 text-gold-royal mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-navy-primary text-sm">
                      Click to browse or drag & drop customer photos
                    </span>
                    <span className="text-slate-muted text-[11px] mt-1 font-mono">
                      JPG, PNG, or WebP • Max 5MB per image • Multiple selection allowed
                    </span>
                  </div>
                </div>
              </div>

              {/* Staged files preview strip */}
              {stagedFiles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-navy-primary font-mono text-[11px]">
                      Selected Photos ({stagedFiles.length}):
                    </span>
                    <button
                      type="button"
                      onClick={() => setStagedFiles([])}
                      className="text-[11px] text-red-600 hover:underline"
                    >
                      Remove All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2 bg-sand-card rounded-xl border border-sand-border">
                    {stagedFiles.map((staged, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden group border border-sand-border aspect-square bg-navy-midnight">
                        <img src={staged.preview} alt={staged.name} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveStagedFile(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 inset-x-0 p-1 bg-navy-midnight/80 text-[9px] text-white truncate font-mono">
                          {staged.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Domestic Destination Selector + Custom text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Domestic Destination:
                  </label>
                  <select
                    value={batchMemoryDestination}
                    onChange={(e) => setBatchMemoryDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary font-medium"
                  >
                    {STANDARD_DOMESTIC_DESTINATIONS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                    <option value="Other / Custom">Other / Custom Destination...</option>
                  </select>
                </div>

                {batchMemoryDestination === 'Other / Custom' ? (
                  <div>
                    <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Specify Custom Destination Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={batchMemoryCustomDest}
                      onChange={(e) => setBatchMemoryCustomDest(e.target.value)}
                      placeholder="e.g. Hampi, Rameshwaram, Pondicherry"
                      className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Trip Date / Season:
                    </label>
                    <input
                      type="text"
                      required
                      value={batchMemoryDate}
                      onChange={(e) => setBatchMemoryDate(e.target.value)}
                      placeholder="e.g. October 2026 or 15 Nov 2026"
                      className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                    />
                  </div>
                )}
              </div>

              {batchMemoryDestination === 'Other / Custom' && (
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Trip Date / Season:
                  </label>
                  <input
                    type="text"
                    required
                    value={batchMemoryDate}
                    onChange={(e) => setBatchMemoryDate(e.target.value)}
                    placeholder="e.g. October 2026 or 15 Nov 2026"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
              )}

              {/* Trip Type / Category */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                  Tour Type / Group Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Family Tour',
                    'Friends Group Tour',
                    'Couple Getaway',
                    'Tour Bus Group',
                    'Hill Station Tour',
                    'Sightseeing',
                    'Waterfalls & Adventure',
                    'Other / Custom'
                  ].map((tt) => (
                    <button
                      type="button"
                      key={tt}
                      onClick={() => setBatchMemoryTripType(tt)}
                      className={`p-2 rounded-lg border text-left text-[11px] font-medium transition-all ${
                        batchMemoryTripType === tt
                          ? 'bg-navy-midnight text-gold-royal border-gold-royal shadow-sm'
                          : 'bg-white text-slate-body border-sand-border hover:bg-sand-ivory'
                      }`}
                    >
                      {tt}
                    </button>
                  ))}
                </div>
                {batchMemoryTripType === 'Other / Custom' && (
                  <input
                    type="text"
                    required
                    value={batchMemoryCustomTripType}
                    onChange={(e) => setBatchMemoryCustomTripType(e.target.value)}
                    placeholder="e.g. Corporate Offsite, Temple Circuit"
                    className="w-full mt-2 px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                )}
              </div>

              {/* Optional Caption */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                  Optional Story / Caption:
                </label>
                <textarea
                  rows={2}
                  value={batchMemoryCaption}
                  onChange={(e) => setBatchMemoryCaption(e.target.value)}
                  placeholder="e.g. Beautiful memories from our Ooty trip with Yazhi Holidays!"
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary resize-none"
                />
              </div>

              {/* Publish Toggle Checkbox */}
              <div className="p-3.5 bg-sand-card rounded-xl border border-sand-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-navy-primary block">Publish to Live Website</span>
                  <span className="text-[11px] text-slate-muted">When enabled, these photos will immediately appear in the public Happy Customers gallery.</span>
                </div>
                <input
                  type="checkbox"
                  checked={batchMemoryPublish}
                  onChange={(e) => setBatchMemoryPublish(e.target.checked)}
                  className="w-5 h-5 rounded text-gold-royal focus:ring-gold-royal cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-sand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewMemoryModal(false);
                    setStagedFiles([]);
                    setMemoryUploadError('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-muted hover:text-navy-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingMemory || stagedFiles.length === 0}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isUploadingMemory && <span className="animate-spin text-sm">↻</span>}
                  <span>{isUploadingMemory ? 'Uploading Photos...' : `Upload & Save (${stagedFiles.length})`}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CUSTOMER MEMORY */}
      {editingMemory && (
        <div className="fixed inset-0 z-50 bg-navy-midnight/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-sand-border shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-sand-border mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy-primary">
                  Edit Customer Memory Photo
                </h3>
                <p className="text-xs text-slate-muted mt-1">
                  Update destination, trip date, caption, or replace photograph.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingMemory(null);
                  setMemoryUploadError('');
                }}
                className="p-2 text-slate-muted hover:text-navy-primary rounded-full hover:bg-sand-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {memoryUploadError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{memoryUploadError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEditedMemory} className="space-y-4 text-xs">
              
              {/* Image Preview & Replace Photo Input */}
              <div className="flex items-center gap-4 p-3 bg-sand-card rounded-xl border border-sand-border">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-navy-midnight border border-gold-royal/30">
                  <img src={editingMemory.imageUrl} alt="Memory Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Replace Photograph:
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand-border bg-white text-navy-primary hover:bg-sand-ivory cursor-pointer font-medium shadow-sm">
                    <Camera className="w-3.5 h-3.5 text-gold-royal" />
                    <span>Choose New Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleReplacePhotoInEdit}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-muted mt-1 font-mono">JPG, PNG, WebP up to 5MB</p>
                </div>
              </div>

              {/* Destination & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Domestic Destination:
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMemory.destination}
                    onChange={(e) => setEditingMemory({ ...editingMemory, destination: e.target.value })}
                    placeholder="e.g. Ooty"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Trip Date / Season:
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMemory.tripDate}
                    onChange={(e) => setEditingMemory({ ...editingMemory, tripDate: e.target.value })}
                    placeholder="e.g. October 2026"
                    className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                  />
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                  Tour Type / Group Category:
                </label>
                <input
                  type="text"
                  value={editingMemory.tripType || ''}
                  onChange={(e) => setEditingMemory({ ...editingMemory, tripType: e.target.value })}
                  placeholder="e.g. Family Tour, Friends Group, Bus Tour"
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                  Caption / Memory Story:
                </label>
                <textarea
                  rows={3}
                  value={editingMemory.caption || ''}
                  onChange={(e) => setEditingMemory({ ...editingMemory, caption: e.target.value })}
                  placeholder="Enter caption..."
                  className="w-full px-3 py-2 bg-white border border-sand-border rounded-lg text-xs text-navy-primary resize-none"
                />
              </div>

              {/* Publish Toggle */}
              <div className="p-3 bg-sand-card rounded-xl border border-sand-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-navy-primary block">Display on Public Website</span>
                  <span className="text-[11px] text-slate-muted">Toggle visibility in Happy Customers gallery</span>
                </div>
                <input
                  type="checkbox"
                  checked={editingMemory.isPublished}
                  onChange={(e) => setEditingMemory({ ...editingMemory, isPublished: e.target.checked })}
                  className="w-5 h-5 rounded text-gold-royal focus:ring-gold-royal cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-sand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMemory(null);
                    setMemoryUploadError('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-muted hover:text-navy-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingMemory}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

