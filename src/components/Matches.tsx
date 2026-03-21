import { motion } from 'motion/react';
import { Calendar, MapPin, Trophy } from 'lucide-react';

export default function Matches() {
  const staticMatches = [
    {
      id: 2,
      type: 'RECENT',
      date: 'AUG 15, 2024',
      time: '06:00 PM',
      location: 'Riverside Ground',
      opponent: 'Blue Brigade CC',
      tournament: 'Division 4',
      result: 'WON BY 1 RUN (173/3 vs 172/9)',
      logo: 'https://picsum.photos/seed/cricket2/100/100'
    },
    {
      id: 3,
      type: 'RECENT',
      date: 'JUL 25, 2024',
      time: '06:00 PM',
      location: 'Central Park Oval',
      opponent: 'Shrivenham CC',
      tournament: 'Division 4',
      result: 'WON BY 66 RUNS (160/6 vs 94/5)',
      logo: 'https://picsum.photos/seed/cricket3/100/100'
    },
    {
      id: 4,
      type: 'RECENT',
      date: 'JUL 11, 2024',
      time: '06:00 PM',
      location: 'Lydiard Park',
      opponent: 'Lydiard Millicent CC',
      tournament: 'Division 4',
      result: 'WON BY 8 WICKETS (140/5 vs 143/2)',
      logo: 'https://picsum.photos/seed/cricket4/100/100'
    },
    {
      id: 5,
      type: 'RECENT',
      date: 'JUN 27, 2024',
      time: '06:00 PM',
      location: 'Nationwide Ground',
      opponent: 'Nationwide House CC',
      tournament: 'Division 4',
      result: 'LOST BY 58 RUNS (141/6 vs 83/9)',
      logo: 'https://picsum.photos/seed/cricket5/100/100'
    }
  ];

  return (
    <section id="matches" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            MATCH CENTER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
            RECENT <span className="text-secondary italic">FIXTURES & RESULTS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest performances.
            Relive the moments and celebrate the victories with the brothers!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {staticMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="p-4 text-center font-bold text-sm tracking-widest uppercase bg-primary text-white">
                {match.type} MATCH
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8 gap-2">
                  <div className="text-center flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-primary/10 shadow-md">
                      <img src="/bbcc-logo-official.jpg" alt="Bonded Brothers CC" className="w-full h-full object-contain p-1" />
                    </div>
                    <p className="font-bold text-primary text-[10px] sm:text-sm truncate uppercase">BBCC</p>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-display font-bold text-gray-300 italic px-2">VS</span>
                  </div>

                  <div className="text-center flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center p-2 overflow-hidden">
                      <img src={match.logo} alt={match.opponent} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <p className="font-bold text-primary text-[10px] sm:text-sm uppercase truncate">{match.opponent}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{match.date} • {match.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{match.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Trophy className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{match.tournament}</span>
                  </div>
                </div>

                {match.result && (
                  <div className="mt-8 p-4 bg-primary/5 rounded-2xl text-center">
                    <p className="text-primary font-bold tracking-widest uppercase text-sm">
                      RESULT: <span className="text-secondary">{match.result}</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))
          }
        </div>
      </div>
    </section>
  );
}
