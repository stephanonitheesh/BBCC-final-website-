import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, ChevronRight, Loader2, User, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  bio?: string;
  stats: {
    matches?: number;
    runs: number;
    wickets: number;
    highestScore?: number;
    bestBowling?: string;
    technique?: number;
    power?: number;
    consistency?: number;
  };
  image: string;
}

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPlayers();
    fetchGallery();
  }, []);

  const fetchPlayers = async () => {
    try {
      // Try the API first
      let response = await fetch('/api/players');

      // If API fails or is not available (e.g. static deployment), try the static JSON file
      if (!response.ok) {
        console.log('API not available, falling back to static players.json');
        response = await fetch('/players.json');
      }

      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        throw new Error('Failed to fetch from both API and static fallback');
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
      // Final attempt: try static JSON directly in case of network error during API call
      try {
        const staticResponse = await fetch('/players.json');
        if (staticResponse.ok) {
          const staticData = await staticResponse.json();
          setPlayers(staticData);
        }
      } catch (staticError) {
        console.error('Static fallback also failed:', staticError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        const images = data.filter((item: any) => item.type === 'image').map((item: any) => item.url);
        setGalleryImages(images);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    }
  };

  const handleSavePlayer = async () => {
    if (!editingPlayer) return;
    setIsSaving(true);
    try {
      const updatedPlayers = players.map(p => p.id === editingPlayer.id ? editingPlayer : p);
      const response = await fetch('/api/players/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlayers),
      });
      if (response.ok) {
        setPlayers(updatedPlayers);
        setEditingPlayer(null);
      }
    } catch (error) {
      console.error('Failed to save player:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section id="players" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              THE SQUAD
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-primary leading-tight"
            >
              MEET OUR <span className="text-secondary italic">CHAMPIONS</span>
            </motion.h2>
          </div>

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${isEditMode ? 'bg-primary text-white' : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
          >
            {isEditMode ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span>{isEditMode ? 'FINISH EDITING' : 'EDIT SQUAD'}</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-secondary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-1">
                      {player.role}
                    </p>
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-secondary" /> {player.stats.runs} Runs
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-secondary" /> {player.stats.wickets} Wkts
                      </span>
                    </div>
                  </div>

                  {isEditMode ? (
                    <button
                      onClick={() => setEditingPlayer({
                        id: player.id || String(Date.now()),
                        name: player.name || 'New Player',
                        image: player.image || 'https://picsum.photos/seed/p/400/500',
                        role: player.role || 'Batsman',
                        battingStyle: player.battingStyle || 'Right-hand bat',
                        bowlingStyle: player.bowlingStyle || 'Right-arm medium',
                        bio: player.bio || '',
                        stats: {
                          matches: 0,
                          runs: 0,
                          wickets: 0,
                          highestScore: 0,
                          bestBowling: '0/0',
                          technique: 85,
                          power: 78,
                          consistency: 92,
                          ...(player.stats || {})
                        }
                      })}
                      className="absolute top-4 right-4 w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-10"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <Link to={`/player/${player.id}`} className="absolute inset-0 z-0">
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {editingPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-2xl font-display font-bold text-primary">Edit Player Profile</h3>
                  <button onClick={() => setEditingPlayer(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Full Name</label>
                      <input
                        type="text"
                        value={editingPlayer.name}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Role</label>
                      <select
                        value={editingPlayer.role}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      >
                        <option>Batsman</option>
                        <option>Bowler</option>
                        <option>All-rounder</option>
                        <option>Wicket-keeper</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Batting Style</label>
                      <input
                        type="text"
                        value={editingPlayer.battingStyle || ''}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, battingStyle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Bowling Style</label>
                      <input
                        type="text"
                        value={editingPlayer.bowlingStyle || ''}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, bowlingStyle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-400 block">Select Profile Picture</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {galleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setEditingPlayer({ ...editingPlayer, image: img })}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${editingPlayer.image === img ? 'border-secondary scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        >
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Biography</label>
                    <textarea
                      value={editingPlayer.bio || ''}
                      onChange={(e) => setEditingPlayer({ ...editingPlayer, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none"
                      placeholder="Tell us about the player..."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Matches</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.matches || 0}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, matches: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Runs</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.runs}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, runs: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Wickets</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.wickets}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, wickets: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Highest Score</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.highestScore || 0}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, highestScore: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Best Bowling</label>
                      <input
                        type="text"
                        value={editingPlayer.stats.bestBowling || '0/0'}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, bestBowling: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Technique %</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.technique || 85}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, technique: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Power %</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.power || 78}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, power: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Consistency %</label>
                      <input
                        type="number"
                        value={editingPlayer.stats.consistency || 92}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, consistency: parseInt(e.target.value) || 0 } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 flex gap-4">
                  <button
                    onClick={() => setEditingPlayer(null)}
                    className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSavePlayer}
                    disabled={isSaving}
                    className="flex-1 bg-secondary text-primary px-6 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>SAVE CHANGES</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manage Photos link removed as per user request */}
      </div>
    </section >
  );
}
