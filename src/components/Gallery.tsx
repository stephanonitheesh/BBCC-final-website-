import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ChangeEvent } from 'react';
import { X, Maximize2, Plus, Loader2, Play, Instagram } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video' | 'iframe';
  url: string;
  size: 'small' | 'large';
  title?: string;
  thumbnail?: string;
}

const FEATURED_VIDEOS: GalleryItem[] = [
  {
    type: 'iframe',
    url: 'https://www.instagram.com/reel/DRsmStVDVYR/embed/',
    thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400&h=600',
    title: 'Featured Video 1',
    size: 'small'
  },
  {
    type: 'iframe',
    url: 'https://www.instagram.com/reel/DRxzMj2iOhf/embed/',
    thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400&h=600',
    title: 'Featured Video 2',
    size: 'small'
  },
  {
    type: 'iframe',
    url: 'https://www.instagram.com/reel/DVDvY0vjQQ3/embed/',
    thumbnail: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&q=80&w=400&h=600',
    title: 'Featured Video 3',
    size: 'small'
  }
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (retries = 3) => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to fetch gallery items:', error);
      if (retries > 0) {
        console.log(`Retrying fetch... (${retries} attempts left)`);
        setTimeout(() => fetchItems(retries - 1), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only images and videos (mp4, webm) are allowed!');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File size must be less than 50MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('title', file.name.split('.')[0]);
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems(prev => [newItem, ...prev]);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload catch error:', error);
      setUploadError(`Network error during upload: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              SOCIAL HUB
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            MEDIA <span className="text-secondary italic">HUB</span>
          </h2>
            <p className="mt-4 text-gray-400 font-light tracking-wide">
              Bonded By Cricket, Brothers By Choice. 🏏 Swindon based cricket club.
            </p>
          </div>


        </div>

        {/* --- Featured Videos Section --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-8 h-8 text-secondary fill-secondary" />
            <h3 className="text-2xl font-display font-bold text-white tracking-wide uppercase">Featured Videos</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {FEATURED_VIDEOS.map((video, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedItem(video)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer block shadow-2xl bg-white/5"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-center items-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-90 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 ml-1 fill-primary" />
                    </div>
                    <p className="text-white font-bold tracking-wide text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">Play Video</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-primary/95 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-all z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                  />
                ) : selectedItem.type === 'iframe' ? (
                  <iframe 
                    src={selectedItem.url} 
                    className="w-full max-w-[400px] h-[80vh] min-h-[500px] bg-white rounded-2xl shadow-xl border border-white/10"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              <div className="flex flex-col items-center text-center">
                <h3 className="text-white font-display font-bold text-xl md:text-2xl">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
