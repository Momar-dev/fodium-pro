export type PartnerCategory =
  | 'sponsor'
  | 'exposant'
  | 'media'
  | 'institution'
  | 'prestataire'
  | 'restauration'
  | 'securite'
  | 'technique';

export interface PartnerCategoryInfo {
  id: PartnerCategory;
  label: string;
  description: string;
  badgeColor: string;
}

export const PARTNER_CATEGORIES: PartnerCategoryInfo[] = [
  { id: 'sponsor', label: 'Sponsor', description: 'Financement et visibilité officielle', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  { id: 'exposant', label: 'Exposant', description: 'Stands d’exposition et vente directe', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  { id: 'media', label: 'Média', description: 'Couverture presse, radio, TV & influence', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  { id: 'institution', label: 'Institution', description: 'Mairies, ministères, préfectures', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { id: 'prestataire', label: 'Prestataire', description: 'Scénographie, son, lumière & logistique', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  { id: 'restauration', label: 'Restauration', description: 'Food trucks, traiteurs et buvettes', badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
  { id: 'securite', label: 'Sécurité', description: 'Agents de gardiennage & secours pompiers', badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  { id: 'technique', label: 'Partenaire technique', description: 'Fournisseurs internet, énergie & matériel', badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
];

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'draft';

export interface TicketCategoryItem {
  id: string;
  name: string;
  price: number;
  capacity: number;
  sold: number;
  description?: string;
  features?: string[];
}

export interface ProEvent {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  city: string;
  status: EventStatus;
  bannerUrl: string;
  description: string;
  totalCapacity: number;
  ticketsSold: number;
  totalRevenue: number;
  currency: string;
  categories: TicketCategoryItem[];
  alertMessage?: string;
  organizerName: string;
  isMainFeatured?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  email?: string;
  eventId: string;
  eventTitle: string;
  ticketsSold: number;
  quota: number;
  revenueGenerated: number;
  status: 'actif' | 'en_attente' | 'inactif';
  commissionRate: number; // percentage
  city: string;
  dateAdded: string;
}

export interface ControlAgent {
  id: string;
  name: string;
  matricule: string;
  phone: string;
  eventId: string;
  eventTitle: string;
  assignedGate: string;
  scansCount: number;
  status: 'actif' | 'en_pause' | 'hors_ligne';
  batteryLevel?: number;
  lastActiveTime?: string;
}

export interface Partner {
  id: string;
  name: string;
  company: string;
  category: PartnerCategory;
  contactName: string;
  email: string;
  phone: string;
  eventId: string;
  eventTitle: string;
  status: 'confirme' | 'en_discussion' | 'contrat_signe';
  contributionValue?: number;
  notes?: string;
  boothLocation?: string;
  dateAdded: string;
}

export interface PhysicalTicketRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  ticketCategoryId: string;
  ticketCategoryName: string;
  quantity: number;
  secureFormat: 'hologramme_qr' | 'standard_qr';
  deliveryAddress: string;
  contactName: string;
  contactPhone: string;
  status: 'en_traitement' | 'en_impression' | 'expedie' | 'livre';
  dateRequested: string;
  notes?: string;
  estimatedDeliveryDate: string;
}

export interface SaleRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  buyerName: string;
  buyerPhone: string;
  categoryName: string;
  quantity: number;
  amount: number;
  paymentMethod: 'wave' | 'orange_money' | 'card' | 'especes';
  timestamp: string;
  channel: 'online' | 'vendeur_physique' | 'guichet';
  vendorName?: string;
}

export interface ExpenseItem {
  id: string;
  eventId: string;
  title: string;
  category: 'scene_son' | 'securite' | 'communication' | 'logistique' | 'restauration' | 'droits_sacem';
  amount: number;
  vendorName: string;
  status: 'paye' | 'en_attente';
  date: string;
}

export interface AccessControlData {
  totalScanned: number;
  validTickets: number;
  invalidAttempts: number;
  peakHour: string;
  currentRatePerHour: number;
  gates: {
    gateName: string;
    agentName: string;
    scanned: number;
    capacityPerHour: number;
  }[];
  hourlyEvolution: {
    hour: string;
    scans: number;
  }[];
}

export interface OrganizationInfo {
  name: string;
  legalName: string;
  ninea: string;
  rccm: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  waveBusinessId: string;
  omMarchandId: string;
  bankAccount: string;
}

export interface ProUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
  organization: OrganizationInfo;
  pinCode: string;
}
