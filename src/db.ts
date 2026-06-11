import { RSVP } from './types';

// Default wishes to pre-populate the wedding guestbook on first load so the UI looks beautiful,
// warm, and authentic.
const INITIAL_RSVPS: RSVP[] = [
  {
    id: 'wish-1',
    name: 'Pooja & Pankaj Kadam',
    guestsCount: 2,
    foodPreference: 'veg',
    wish: 'Congratulations Jyoti and Mayuresh! Seeing you two together brings so much joy. Wishing you a lifetime of love, laughter, and endless adventure!',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'attending',
  },
  {
    id: 'wish-2',
    name: 'Kajol Phadtare',
    guestsCount: 1,
    foodPreference: 'non-veg',
    wish: 'Overjoyed to celebrate this beautiful milestone with you! Cheers to a companionship of 12 years finally culminating in forever.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'attending',
  },
  {
    id: 'wish-3',
    name: 'Kanchan & Gajanan Phadtare',
    guestsCount: 2,
    foodPreference: 'veg',
    wish: 'Best wishes to the perfect couple. May your love grow stronger with each passing day. Can’t wait for June 23rd!',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'attending',
  },
  {
    id: 'wish-4',
    name: 'Akash Shelar',
    guestsCount: 1,
    foodPreference: 'veg',
    wish: 'So happy for you two! May your married life be filled with wonderful memories. Big hugs!',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'attending',
  }
];

const LOCAL_STORAGE_KEY = 'wedding_invitation_rsvps_v1';

export function getRSVPs(): RSVP[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      // Initialize with default RSVPs
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_RSVPS));
      return INITIAL_RSVPS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return INITIAL_RSVPS;
  }
}

export function saveRSVP(rsvp: Omit<RSVP, 'id' | 'createdAt'>): RSVP {
  const current = getRSVPs();
  const newRsvp: RSVP = {
    ...rsvp,
    id: 'rsvp-' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  
  const updated = [newRsvp, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  
  // Trigger a custom event to notify components of list updates
  window.dispatchEvent(new Event('rsvps-updated'));
  
  return newRsvp;
}

export function deleteRSVP(id: string): void {
  const current = getRSVPs();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('rsvps-updated'));
}

export function resetRSVPs(): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_RSVPS));
  window.dispatchEvent(new Event('rsvps-updated'));
}
