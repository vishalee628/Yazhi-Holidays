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
  Clock, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  X,
  Phone,
  Mail,
  RotateCcw
} from 'lucide-react';
import { checkAdminAuth, adminLogout, AdminUser } from '../services/authService';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/enquiryService';
import { getCatalogPackages, saveCatalogPackage, deleteCatalogPackage, getCatalogDestinations, saveCatalogDestination, deleteCatalogDestination, resetCatalogToDefault } from '../services/catalogService';
import { EnquirySubmission, TravelPackage, Destination, TripType, RegionType } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'packages' | 'destinations' | 'settings'>('overview');

  // Data states
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

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
    businessPhone: '+91 98400 12345',
    whatsappNumber: '+91 98400 12345',
    email: 'concierge@yazhiholidays.com',
    address: 'Anna Nagar, Chennai, Tamil Nadu, India — 600040',
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
            { id: 'destinations', label: `Destinations (${destinations.length})`, icon: MapPin },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">TOTAL ENQUIRIES</span>
                <span className="font-serif text-4xl font-bold text-navy-primary">{enquiries.length}</span>
                <span className="text-[11px] text-emerald-600 block mt-2 font-medium">Recorded in system</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">NEW PENDING LEADS</span>
                <span className="font-serif text-4xl font-bold text-gold-metallic">{newEnquiriesCount}</span>
                <span className="text-[11px] text-slate-muted block mt-2">Requires concierge contact</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">PUBLISHED PACKAGES</span>
                <span className="font-serif text-4xl font-bold text-navy-primary">{packages.length}</span>
                <span className="text-[11px] text-slate-muted block mt-2">Across Domestic & Intl</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-border shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-muted block mb-1">ACTIVE DESTINATIONS</span>
                <span className="font-serif text-4xl font-bold text-navy-primary">{destinations.length}</span>
                <span className="text-[11px] text-slate-muted block mt-2">All curated locations</span>
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

        {/* TAB 4: DESTINATIONS MANAGEMENT */}
        {activeTab === 'destinations' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Destinations Portfolio ({destinations.length})
                </h3>
                <p className="text-xs text-slate-muted">Curated domestic and international destinations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map(d => (
                <div key={d.id} className="border border-sand-border rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="h-36 relative overflow-hidden">
                    <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-navy-midnight/80 text-gold-royal">
                      {d.region}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono text-slate-muted uppercase">{d.country}</span>
                    <h4 className="font-serif text-lg font-semibold text-navy-primary">{d.name}</h4>
                    <p className="text-xs text-slate-muted line-clamp-2">{d.tagline}</p>
                    <div className="pt-2 border-t border-sand-border flex items-center justify-between text-xs font-mono">
                      <span>From ₹{d.startingPriceINR.toLocaleString('en-IN')}</span>
                      <Link to={`/destinations/${d.slug}`} target="_blank" className="text-gold-metallic hover:underline">
                        View &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMPANY SETTINGS */}
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

    </div>
  );
};
