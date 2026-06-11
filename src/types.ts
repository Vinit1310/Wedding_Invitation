export interface RSVP {
  id: string;
  name: string;
  guestsCount: number;
  foodPreference: 'veg' | 'non-veg' | 'none';
  wish: string;
  createdAt: string;
  status: 'attending' | 'declined';
}
