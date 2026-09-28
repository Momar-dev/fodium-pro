import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProEvent,
  Vendor,
  ControlAgent,
  Partner,
  PhysicalTicketRequest,
  SaleRecord,
  ExpenseItem,
  AccessControlData,
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_VENDORS,
  INITIAL_AGENTS,
  INITIAL_PARTNERS,
  INITIAL_PHYSICAL_REQUESTS,
  RECENT_SALES,
  INITIAL_EXPENSES,
  WALO_ACCESS_CONTROL,
} from '../data/mockData';

interface ProDataContextType {
  events: ProEvent[];
  vendors: Vendor[];
  agents: ControlAgent[];
  partners: Partner[];
  physicalRequests: PhysicalTicketRequest[];
  sales: SaleRecord[];
  expenses: ExpenseItem[];
  accessControl: AccessControlData;
  activeQuickAction: 'event' | 'ticket' | 'vendor' | 'agent' | 'partner' | null;
  openQuickActionModal: boolean;
  setOpenQuickActionModal: (open: boolean) => void;
  setActiveQuickAction: (action: 'event' | 'ticket' | 'vendor' | 'agent' | 'partner' | null) => void;
  addEvent: (data: Partial<ProEvent>) => ProEvent;
  updateEvent: (id: string, updatedData: Partial<ProEvent>) => void;
  deleteEvent: (id: string) => void;
  addVendor: (data: Omit<Vendor, 'id' | 'ticketsSold' | 'revenueGenerated' | 'dateAdded'>) => Vendor;
  deleteVendor: (id: string) => void;
  addAgent: (data: Omit<ControlAgent, 'id' | 'scansCount' | 'batteryLevel' | 'lastActiveTime'>) => ControlAgent;
  deleteAgent: (id: string) => void;
  addPartner: (data: Omit<Partner, 'id' | 'dateAdded'>) => Partner;
  deletePartner: (id: string) => void;
  addPhysicalTicketRequest: (data: Omit<PhysicalTicketRequest, 'id' | 'dateRequested' | 'estimatedDeliveryDate' | 'status'>) => PhysicalTicketRequest;
  addExpense: (data: Omit<ExpenseItem, 'id' | 'date'>) => ExpenseItem;
  getEventById: (id: string) => ProEvent | undefined;
}

const ProDataContext = createContext<ProDataContextType | undefined>(undefined);

export const ProDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<ProEvent[]>(() => {
    const saved = localStorage.getItem('fodium_pro_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('fodium_pro_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [agents, setAgents] = useState<ControlAgent[]>(() => {
    const saved = localStorage.getItem('fodium_pro_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('fodium_pro_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [physicalRequests, setPhysicalRequests] = useState<PhysicalTicketRequest[]>(() => {
    const saved = localStorage.getItem('fodium_pro_physical_requests');
    return saved ? JSON.parse(saved) : INITIAL_PHYSICAL_REQUESTS;
  });

  const [sales] = useState<SaleRecord[]>(RECENT_SALES);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [accessControl] = useState<AccessControlData>(WALO_ACCESS_CONTROL);

  const [openQuickActionModal, setOpenQuickActionModal] = useState<boolean>(false);
  const [activeQuickAction, setActiveQuickAction] = useState<'event' | 'ticket' | 'vendor' | 'agent' | 'partner' | null>(null);

  useEffect(() => {
    localStorage.setItem('fodium_pro_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_physical_requests', JSON.stringify(physicalRequests));
  }, [physicalRequests]);

  const addEvent = (data: Partial<ProEvent>): ProEvent => {
    const id = (data.title || 'event')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-') + '-' + Math.floor(Math.random() * 1000);

    const newEvent: ProEvent = {
      id,
      title: data.title || 'Nouvel Événement',
      subtitle: data.subtitle || 'Événement officiel Kanzey Media',
      date: data.date || '2026-12-30',
      time: data.time || '19:00',
      location: data.location || 'Dakar Arena',
      city: data.city || 'Dakar',
      status: (data.status as any) || 'upcoming',
      bannerUrl: data.bannerUrl || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
      description: data.description || 'Description de l’événement...',
      totalCapacity: data.totalCapacity || 1000,
      ticketsSold: 0,
      totalRevenue: 0,
      currency: 'FCFA',
      categories: data.categories && data.categories.length > 0 ? data.categories : [
        { id: `cat-std-${id}`, name: 'Pass Standard', price: 3000, capacity: 800, sold: 0 },
        { id: `cat-vip-${id}`, name: 'Pass VIP', price: 10000, capacity: 200, sold: 0 },
      ],
      organizerName: 'Kanzey Media Group',
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updatedData: Partial<ProEvent>) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          return {
            ...ev,
            ...updatedData,
          };
        }
        return ev;
      })
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const addVendor = (data: Omit<Vendor, 'id' | 'ticketsSold' | 'revenueGenerated' | 'dateAdded'>): Vendor => {
    const newVendor: Vendor = {
      ...data,
      id: `vnd-${Date.now()}`,
      ticketsSold: 0,
      revenueGenerated: 0,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setVendors((prev) => [newVendor, ...prev]);
    return newVendor;
  };

  const deleteVendor = (id: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  const addAgent = (data: Omit<ControlAgent, 'id' | 'scansCount' | 'batteryLevel' | 'lastActiveTime'>): ControlAgent => {
    const newAgent: ControlAgent = {
      ...data,
      id: `agt-${Date.now()}`,
      scansCount: 0,
      batteryLevel: 100,
      lastActiveTime: 'À l’instant',
    };
    setAgents((prev) => [newAgent, ...prev]);
    return newAgent;
  };

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const addPartner = (data: Omit<Partner, 'id' | 'dateAdded'>): Partner => {
    const newPartner: Partner = {
      ...data,
      id: `part-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setPartners((prev) => [newPartner, ...prev]);
    return newPartner;
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  const addPhysicalTicketRequest = (
    data: Omit<PhysicalTicketRequest, 'id' | 'dateRequested' | 'estimatedDeliveryDate' | 'status'>
  ): PhysicalTicketRequest => {
    const newReq: PhysicalTicketRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'en_traitement',
      dateRequested: new Date().toISOString().split('T')[0],
      estimatedDeliveryDate: 'Sous 48h ouvrées',
    };
    setPhysicalRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const addExpense = (data: Omit<ExpenseItem, 'id' | 'date'>): ExpenseItem => {
    const newExp: ExpenseItem = {
      ...data,
      id: `exp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setExpenses((prev) => [newExp, ...prev]);
    return newExp;
  };

  const getEventById = (id: string): ProEvent | undefined => {
    return events.find((e) => e.id === id);
  };

  return (
    <ProDataContext.Provider
      value={{
        events,
        vendors,
        agents,
        partners,
        physicalRequests,
        sales,
        expenses,
        accessControl,
        activeQuickAction,
        openQuickActionModal,
        setOpenQuickActionModal,
        setActiveQuickAction,
        addEvent,
        updateEvent,
        deleteEvent,
        addVendor,
        deleteVendor,
        addAgent,
        deleteAgent,
        addPartner,
        deletePartner,
        addPhysicalTicketRequest,
        addExpense,
        getEventById,
      }}
    >
      {children}
    </ProDataContext.Provider>
  );
};

export const useProData = () => {
  const context = useContext(ProDataContext);
  if (!context) {
    throw new Error('useProData must be used within a ProDataProvider');
  }
  return context;
};
