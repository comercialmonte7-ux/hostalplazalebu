import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, Star, Phone, Mail, Instagram, Facebook, 
  ChevronRight, Hotel, Utensils, Compass, Bus, Heart,
  Quote, Menu, X
} from 'lucide-react';
import { Concierge } from './components/Concierge';
import { 
  ATTRACTIONS, GASTRONOMY, HOSTAL_SERVICES, 
  EMERGENCY_NUMBERS, TESTIMONIALS, MEDICAL_INFO,
  FAQS, GALLERY, ROOM_TYPES
} from './constants';

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left hover:text-orange-500 transition-colors"
      >
        <span className="font-serif text-xl font-bold">{question}</span>
        <ChevronRight className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-4 text-gray-500 leading-relaxed max-w-2xl px-4 border-l-2 border-orange-500 ml-2"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'El Hostal', href: '#hostal' },
    { name: 'Habitaciones', href: '#habitaciones' },
    { name: 'Atracciones', href: '#atracciones' },
    { name: 'Gastronomía', href: '#gastronomia' },
    { name: 'Servicios', href: '#servicios' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`font-serif font-bold text-xl md:text-2xl tracking-tight transition-colors ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'}`}>
            Hostal Plaza <span className="text-orange-500">Lebu</span>
          </div>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-orange-500 transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/56995739562"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Reservar
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors py-2 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/56995739562"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold mt-4 text-center"
              >
                Reservar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

const ImageWithFallback = ({ src, alt, className, fallback = "https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80&w=1920&auto=format&fit=crop" }: any) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={(e: any) => {
        e.target.src = fallback;
      }}
    />
  );
};

export default function App() {
  const [activeGastronomyTab, setActiveGastronomyTab] = useState('Todos');

  const filteredGastronomy = GASTRONOMY.filter(g => {
    if (activeGastronomyTab === 'Todos') return true;
    if (activeGastronomyTab === 'Mariscos') return g.type.toLowerCase().includes('mariscos') || g.type.toLowerCase().includes('pescados');
    if (activeGastronomyTab === 'Internacional') return g.type.toLowerCase().includes('internacional');
    if (activeGastronomyTab === 'Tradicional') return g.type.toLowerCase().includes('tradicional');
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-end pb-32 overflow-hidden text-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <ImageWithFallback 
          src={GALLERY[0]} 
          alt="Hostal Plaza Lebu Exterior" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-4 drop-shadow-2xl">
              Hostal Plaza Lebu
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg max-w-3xl font-light">
              Comodidad y tranquilidad en el corazón de Lebu, <br className="hidden md:block" /> el lugar perfecto para tu descanso.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#habitaciones" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-xl shadow-orange-500/20">
                Ver Habitaciones <ChevronRight size={18} />
              </a>
              <a href="#atracciones" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                Guía Turística
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Rooms Section (Moved Up) */}
      <section id="habitaciones" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/30 -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Alojamiento</span>
              <h2 className="font-serif text-5xl font-bold mt-4">Nuestras Habitaciones</h2>
              <p className="text-gray-500 mt-2">Tarifas claras y comodidad garantizada en el centro.</p>
            </div>
          </div>

          {/* Mobile Quick Prices */}
          <div className="md:hidden mb-12 bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <h3 className="font-serif text-lg mb-6 text-gray-800 flex items-center gap-2">
              <Star size={16} className="text-orange-500 fill-orange-500" /> Tarifas Disponibles
            </h3>
            <div className="space-y-4">
              {ROOM_TYPES.map((room, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <room.icon size={18} className="text-orange-500" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{room.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tight font-medium">{room.capacity}</div>
                    </div>
                  </div>
                  <div className="text-orange-600 font-bold text-lg">{room.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {ROOM_TYPES.map((room, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group relative overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallback="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1920&auto=format&fit=crop"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                    <room.icon size={20} />
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col items-center flex-grow">
                  <h3 className="font-serif text-xl font-bold mb-2 text-center">{room.name}</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{room.capacity}</p>
                  <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed flex-grow">{room.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50 w-full text-center">
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Valor por noche</span>
                    <div className="font-bold text-2xl text-orange-500 transition-colors">{room.price}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-24 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="text-center md:text-left">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Mucho más que dormir</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">Servicios & Productos</h2>
              <p className="text-gray-500 mt-2">Complementa tu estadía con nuestras experiencias exclusivas.</p>
            </div>
            <a href="https://wa.me/56995739562" className="bg-[#151619] text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 transition-all flex items-center gap-2">
              Consultar Tarifas <Compass size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {HOSTAL_SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <service.icon size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-tight">{service.name}</h4>
                <p className="text-[10px] text-gray-400 mt-1">Consultar disponibilidad</p>
              </motion.div>
            ))}
          </div>

          {/* Special Experience Highlight */}
          <div className="mt-12 p-8 md:p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -z-10 opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="lg:w-1/2">
              <div className="bg-orange-500 text-white text-[10px] uppercase font-bold tracking-[0.2em] px-4 py-1 rounded-full w-fit mb-6">Recomendado</div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Desayuno Continental con Sabores Locales</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Comienza tu día con el aroma del café recién tostado y productos artesanales de la zona de Lebu. El punto de partida ideal para tus aventuras.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 italic">
                  <Utensils size={14} className="text-orange-500" /> Previa coordinación
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 italic">
                  <Heart size={14} className="text-orange-500" /> Productos locales
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop" 
                className="rounded-2xl h-48 w-full object-cover shadow-md"
                alt="Desayuno 1"
                fallback="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format"
              />
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop" 
                className="rounded-2xl h-48 w-full object-cover shadow-md mt-8"
                alt="Desayuno 2"
                fallback="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hostal Showcase (Moved Down) */}
      <section id="hostal" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-orange-500 mb-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold tracking-widest ml-2">ESTADÍA SUPERIOR</span>
              </div>
              <h2 className="font-serif text-5xl font-bold mb-6 text-gray-900 leading-tight">Ubicación Perfecta, <br/>Comodidades Modernas.</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Ubicado estratégicamente frente a la Plaza de Armas, nuestro hostal combina la tradición lebuense con el confort contemporáneo. Disfruta de habitaciones diseñadas para el descanso después de un día de aventura.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {HOSTAL_SERVICES.slice(0, 4).map((s, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <div className="bg-orange-50 p-2 rounded-full text-orange-500">
                      <s.icon size={18} />
                    </div>
                    <span className="font-medium text-gray-700 text-sm">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src={GALLERY[6]} 
                alt="Plaza de Armas Lebu" 
                className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
                fallback="https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80&w=1920&auto=format&fit=crop"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#151619] p-8 rounded-3xl text-white z-20 shadow-xl hidden md:block">
                <div className="text-4xl font-serif font-bold mb-1 text-orange-500">4.9/5</div>
                <div className="text-xs uppercase tracking-widest text-gray-400">Ambiente 100% Madera</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Bento */}
      <section id="atracciones" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold mb-4">Atracciones de Lebu</h2>
            <p className="text-gray-500">Lo mejor de nuestra ciudad seleccionado para ti.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTRACTIONS.map((a, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`${a.color} p-8 rounded-3xl group cursor-pointer transition-all border border-transparent hover:border-black/5 flex flex-col`}
              >
                <div className="bg-white/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-gray-800">
                  <a.icon size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">{a.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{a.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1">
                    {[...Array(a.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="currentColor" className="text-orange-500" />
                    ))}
                  </div>
                  {a.map && (
                    <a 
                      href={a.map} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 bg-white/40 p-2 rounded-lg hover:bg-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gastronomy List */}
      <section id="gastronomia" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-gray-900">Gastronomía Recomendada</h2>
            <p className="text-gray-500">Sabores que no te puedes perder durante tu visita a Lebu.</p>
          </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0">
            {['Todos', 'Mariscos', 'Internacional', 'Tradicional'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveGastronomyTab(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
                  activeGastronomyTab === cat 
                    ? 'bg-orange-500 text-white border-orange-600 shadow-md transform scale-105' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <motion.div layout className="space-y-4">
            {filteredGastronomy.map((g, i) => (
              <motion.div 
                layout
                key={g.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-xl transition-all group"
              >
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-2xl font-bold text-gray-900">{g.name}</h3>
                    <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{g.rating}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 font-medium uppercase tracking-wider">{g.type}</p>
                  <p className="text-gray-600 leading-relaxed max-w-xl">{g.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {g.phone && (
                    <a 
                      href={`tel:${g.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-full text-sm font-bold hover:bg-orange-100 transition-all shadow-sm group-hover:scale-105"
                    >
                      <Phone size={16} /> {g.phone}
                    </a>
                  )}
                  {g.map && (
                    <a 
                      href={g.map} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#151619] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-md group-hover:scale-105"
                    >
                      <MapPin size={16} /> Ver Mapa
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredGastronomy.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-medium">
                No hay resultados para esta categoría.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Quote size={48} className="text-orange-100 fill-orange-50" />
            <h2 className="font-serif text-5xl font-bold">Voces de nuestros huéspedes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" className="text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="font-bold text-sm uppercase tracking-widest">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <h2 className="font-serif text-5xl font-bold max-w-lg leading-tight">Vive la experiencia Hostal Plaza</h2>
            <div className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">[ 06 / GALLERY ]</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[600px]">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Habitación 1" />
            </div>
            <div className="overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Habitación 2" />
            </div>
            <div className="overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Habitación 3" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[3]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Habitación 4" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[7]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Baño" fallback="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1920&auto=format&fit=crop" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-3xl group">
              <ImageWithFallback src={GALLERY[8]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Atracción" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Información útil</span>
            <h2 className="font-serif text-5xl font-bold mt-4 mb-6">Preguntas Frecuentes</h2>
            <p className="text-gray-500 mb-8">Todo lo que necesitas saber antes de tu llegada a Lebu.</p>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm font-bold mb-2">¿Atención 24/7?</div>
              <p className="text-xs text-gray-400">Sí, nuestra recepción está siempre disponible para asistirte con registros nocturnos o emergencias.</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency & Services */}
      <section id="servicios" className="py-24 bg-[#151619] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-4xl font-bold mb-8 italic">Servicios y Contacto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <Phone size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Teléfono / WhatsApp</div>
                      <div className="font-bold">
                        <a href="tel:+56995739562" className="hover:text-orange-500 transition-colors">+56 9 9573 9562</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <Mail size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">E-mail</div>
                      <div className="font-bold">hostalplazalebu@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <MapPin size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Dirección</div>
                      <div className="font-bold">Plaza de Armas, Lebu, Chile</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-orange-500">Números de Emergencia</h4>
                  <div className="space-y-4">
                    {EMERGENCY_NUMBERS.map((e, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                        <span className="text-sm">{e.name}</span>
                        <span className="font-bold text-orange-500 font-mono">{e.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-orange-500 rounded-3xl p-8 text-[#151619]">
                <h3 className="font-serif text-3xl font-bold mb-4">¿Preguntas?</h3>
                <p className="mb-6 opacity-80 text-sm">Prueba nuestro conserje virtual pulsando en el icono flotante. ¡Te ayudará con todo lo que necesites!</p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-[#151619] text-white rounded-full hover:scale-110 transition-transform">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="p-3 bg-[#151619] text-white rounded-full hover:scale-110 transition-transform">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#151619] text-white/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs uppercase tracking-[0.2em]">© 2026 Hostal Plaza Lebu - Guía Turística Premium (v2.5) - FALLBACK READY</div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-3 rounded-2xl shadow-2xl flex gap-3">
          <a 
            href="https://wa.me/56995739562" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-center text-sm shadow-lg shadow-green-500/20"
          >
            WhatsApp
          </a>
          <a 
            href="#habitaciones" 
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold text-center text-sm shadow-lg shadow-orange-500/20"
          >
            Habitaciones
          </a>
        </div>
      </div>

      {/* Virtual Assistant */}
      <Concierge />
    </div>
  );
}

