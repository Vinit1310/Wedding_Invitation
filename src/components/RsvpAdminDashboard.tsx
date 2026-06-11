import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Trash2, Shield, RotateCcw, UserCheck, Utensils, MessagesSquare } from 'lucide-react';
import { getRSVPs, deleteRSVP, resetRSVPs } from '../db';
import { RSVP } from '../types';

export default function RsvpAdminDashboard() {
  const [list, setList] = useState<RSVP[]>([]);
  const [secured, setSecured] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = () => {
    setList(getRSVPs());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('rsvps-updated', loadData);
    return () => window.removeEventListener('rsvps-updated', loadData);
  }, []);

  // Passcode to keep attendee names mildly private or secure
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim() === '2026' || password.trim() === 'love' || password.trim().toLowerCase() === 'jyoti') {
      setSecured(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect wedding passcode. (Hint: Year of wedding, 2026)');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this response?')) {
      deleteRSVP(id);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all RSVPs to the default seed data?')) {
      resetRSVPs();
    }
  };

  // Stats calculation
  const totalResponses = list.length;
  const totalGuests = list.reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const vegCount = list.filter(item => item.foodPreference === 'veg').reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const nonVegCount = list.filter(item => item.foodPreference === 'non-veg').reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const nonePreferenceCount = totalGuests - (vegCount + nonVegCount);

  if (!secured) {
    return (
      <section className="py-24 px-6 md:px-12 relative z-20 flex flex-col items-center">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-gold/15 paper-texture text-center">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 text-primary">
            <Shield size={24} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-2">Guest List Security</h2>
          <p className="font-sans text-xs text-wine-grey mb-6 leading-relaxed">
            Please enter the wedding year (<strong className="text-primary font-bold">2026</strong>) to securely view the registered list of attending relatives and friends.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="e.g. 2026"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-rose-light/40 border border-primary/20 focus:border-gold focus:ring-0 text-center py-3 rounded-md font-sans focus:outline-none placeholder:text-gray-400"
            />
            {errorMsg && <p className="text-red-700 text-xs font-semibold">{errorMsg}</p>}
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/95 text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-md transition-all active:scale-95 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 relative z-20 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header segment with quick reset action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight">
              Invitation Attendee Dashboard
            </h2>
            <p className="font-sans text-sm text-wine-grey font-medium leading-none">
              Track real-time responses, headcount estimates, and congratulations messages.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-white hover:bg-rose-light/50 border border-primary/10 hover:border-primary/30 text-wine-grey hover:text-primary text-xs uppercase tracking-widest font-sans font-bold px-4 py-2.5 rounded transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gold/15 shadow-md flex items-center gap-4">
            <div className="p-3.5 bg-primary/5 rounded-lg text-primary">
              <ClipboardList size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-sans tracking-widest text-[#4c0011] font-bold mb-1">
                Total RSVPs
              </span>
              <span className="font-serif text-2xl md:text-3xl font-black text-primary">
                {totalResponses}
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gold/15 shadow-md flex items-center gap-4">
            <div className="p-3.5 bg-primary/5 rounded-lg text-primary">
              <UserCheck size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-sans tracking-widest text-[#4c0011] font-bold mb-1">
                Attending Guests
              </span>
              <span className="font-serif text-2xl md:text-3xl font-black text-primary">
                {totalGuests}
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gold/15 shadow-md flex items-center gap-4">
            <div className="p-3.5 bg-green-50 rounded-lg text-green-800">
              <Utensils size={20} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-sans tracking-widest text-green-800 font-bold mb-1">
                Veg Catering Split
              </span>
              <span className="font-serif text-2xl md:text-3xl font-black text-green-800">
                {vegCount} <span className="text-xs font-sans text-green-700/60 font-semibold font-sans">guests</span>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gold/15 shadow-md flex items-center gap-4">
            <div className="p-3.5 bg-red-50 rounded-lg text-red-800">
              <Utensils size={20} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-sans tracking-widest text-red-800 font-bold mb-1">
                Non-Veg Catering Split
              </span>
              <span className="font-serif text-2xl md:text-3xl font-black text-red-800">
                {nonVegCount} <span className="text-xs font-sans text-red-700/60 font-semibold font-sans">guests</span>
              </span>
            </div>
          </div>

        </div>

        {/* Guest Responses Table Container */}
        <div className="bg-white shadow-xl rounded-xl border border-primary/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-rose-light border-b border-primary/5 text-left">
                  <th className="px-6 py-4.5 font-sans text-[10px] uppercase tracking-wider text-[#4c0011] font-bold">Guest Name</th>
                  <th className="px-6 py-4.5 font-sans text-[10px] uppercase tracking-wider text-[#4c0011] font-bold">Members</th>
                  <th className="px-6 py-4.5 font-sans text-[10px] uppercase tracking-wider text-[#4c0011] font-bold">Congratulations Note</th>
                  <th className="px-6 py-4.5 font-sans text-[10px] uppercase tracking-wider text-[#4c0011] font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-light">
                {list.map((item) => (
                  <tr key={item.id} className="hover:bg-rose-light/20 transition-all font-sans text-[13px] text-wine-grey">
                    <td className="px-6 py-4.5 font-serif font-black text-primary text-base">
                      {item.name}
                    </td>
                    <td className="px-6 py-4.5 select-none font-bold">
                      {item.guestsCount} {item.guestsCount === 1 ? 'Member' : 'Members'}
                    </td>
                    <td className="px-6 py-4.5 max-w-xs italic text-wine-grey/85 font-medium truncate" title={item.wish}>
                      {item.wish ? `"${item.wish}"` : <span className="text-gray-400 not-italic">- no message -</span>}
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                        title="Remove attendee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {list.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-sans italic">
                      There are no registered RSVPs yet. Send out the invitation link to see responses compile!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
