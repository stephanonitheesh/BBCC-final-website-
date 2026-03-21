import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Star, 
  Shield, 
  Zap, 
  Activity,
  Calendar,
  ChevronRight,
  Play,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

export default function PlayerProfile() {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/players');
        const galleryResponse = await fetch('/api/gallery');
        
        if (response.ok && galleryResponse.ok) {
          const playersData = await response.json();
          const galleryData = await galleryResponse.json();
          
          // Find the specific player
          const playerItem = playersData.find((p: any) => p.id === id);

          if (playerItem) {
            setPlayer({
              ...playerItem,
              bio: playerItem.bio || `A dedicated member of the Bonded Brothers CC, known for their passion for the game and commitment to the team's success. Captured here in the Social Hub, this player represents the spirit of Swindon cricket.`
            });
          }

          // Action shots from the gallery
          setGalleryItems(galleryData.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingGallery(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-secondary animate-spin" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary mb-4">Player Not Found</h2>
          <Link to="/" className="text-secondary font-bold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-primary">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {player.image && (
            <img 
              src={player.image} 
              alt={player.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          )}
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-primary/20 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-secondary mb-8 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Squad
            </Link>
            
            <span className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-4">
              {player.role || 'Squad Member'}
            </span>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-none mb-4">
              {player.name?.split(' ')[0]}<br />
              <span className="text-secondary italic">{player.name?.split(' ').slice(1).join(' ')}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Stats & Info */}
      <section className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Stats Cards */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-secondary/20 transition-colors" />
                
                <h3 className="text-secondary font-bold tracking-widest uppercase text-xs mb-8 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Career Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Matches</p>
                    <p className="text-3xl font-display font-bold">{player.stats?.matches || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Total Runs</p>
                    <p className="text-3xl font-display font-bold text-secondary">{player.stats?.runs || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Wickets</p>
                    <p className="text-3xl font-display font-bold">{player.stats?.wickets || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Highest Score</p>
                    <p className="text-3xl font-display font-bold">{player.stats?.highestScore || 0}</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Batting Style</span>
                    <span className="text-sm font-medium">{player.battingStyle || 'Right-hand bat'}</span>
                  </div>
                  {player.bowlingStyle && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Bowling Style</span>
                      <span className="text-sm font-medium">{player.bowlingStyle || 'Right-arm medium'}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-secondary rounded-[2rem] p-8 text-primary shadow-xl"
              >
                <h3 className="font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Best Performance
                </h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-display font-bold leading-none">
                      {player.role === 'Bowler' ? (player.stats?.bestBowling || '0/0') : (player.stats?.highestScore || 0)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-black mt-2 opacity-60">
                      {player.role === 'Bowler' ? 'Best Bowling Figure' : 'Highest Individual Score'}
                    </p>
                  </div>
                  <Shield className="w-12 h-12 opacity-20" />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bio & Action Shots */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-3xl font-display font-bold text-primary mb-6 flex items-center gap-4">
                  Player <span className="text-secondary italic">Biography</span>
                  <div className="h-px flex-grow bg-gray-100" />
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  {player.bio || 'No biography available for this player.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-primary flex items-center gap-4">
                    Action <span className="text-secondary italic">Shots</span>
                  </h2>
                  <Link to="/#gallery" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-primary transition-colors">
                    View Social Hub
                  </Link>
                </div>

                {isLoadingGallery ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="aspect-square rounded-3xl bg-gray-100 animate-pulse" />
                    ))}
                  </div>
                ) : galleryItems.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryItems.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-3xl overflow-hidden group shadow-lg"
                      >
                        {item.type === 'video' ? (
                          <div className="w-full h-full relative">
                            <video src={item.url} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={item.url} 
                            alt="Action Shot" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ChevronRight className="w-8 h-8 text-secondary" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 px-8 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 text-center">
                    <Activity className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No action shots captured yet.</p>
                  </div>
                )}
              </motion.div>

              {/* Skills Radar-like Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { label: 'Technique', value: player.stats?.technique || 85, icon: Target },
                  { label: 'Power', value: player.stats?.power || 78, icon: Zap },
                  { label: 'Consistency', value: player.stats?.consistency || 92, icon: Shield },
                ].map((skill, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-secondary transition-colors">
                    <skill.icon className="w-6 h-6 text-secondary mb-4" />
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{skill.label}</span>
                      <span className="text-lg font-display font-bold text-primary">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                        className="h-full bg-secondary"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-primary text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            WANT TO PLAY <span className="text-secondary italic">WITH US?</span>
          </h2>
          <p className="text-xl text-white/60 mb-12 font-light">
            BBCC Swindon is always looking for new talent. Join our community and start your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-secondary text-primary px-10 py-5 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
            >
              CONTACT US TO JOIN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
