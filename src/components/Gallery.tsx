import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ChangeEvent } from 'react';
import { X, Maximize2, Plus, Loader2, Play } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  size: 'small' | 'large';
  title?: string;
}

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
    <section id="gallery" className="py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              SOCIAL HUB
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight text-balance">
              OUR <span className="text-secondary italic">DIGITAL CLUBHOUSE</span>
            </h2>
            <p className="mt-4 text-gray-400 font-light tracking-wide">
              Bonded By Cricket, Brothers By Choice. 🏏 Swindon based cricket club.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <label className="relative flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 cursor-pointer shadow-xl w-full md:w-auto justify-center">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>{isUploading ? 'UPLOADING...' : 'UPLOAD MEDIA'}</span>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
            {uploadError && (
              <p className="text-red-500 text-xs font-bold bg-red-500/10 px-4 py-2 rounded-full">
                {uploadError}
              </p>
            )}
          </div>
        </div>

        {true || (items.length === 0 && !isLoading) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <Plus className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-white font-display font-bold tracking-widest uppercase text-lg mb-2">
              Captured Moments
            </p>
            <p className="text-gray-500 text-sm italic">
              Social Hub Content - Coming Soon
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="h-[200px] md:h-[290px] rounded-3xl bg-white/5 animate-pulse" />
              ))
            ) : (
              items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedItem(item)}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer ${item.size === 'large' ? 'col-span-2 row-span-2 h-[400px] md:h-[600px]' : 'h-[200px] md:h-[290px]'
                    }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title || `Gallery ${index}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-xl">
                      <Maximize2 className="w-8 h-8 text-primary" />
                    </div>
                    <span className="mt-4 text-white font-display font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 uppercase text-xs">
                      View {item.type}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px] opacity-50">
            Captured Moments • BBCC Swindon
          </p>
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
