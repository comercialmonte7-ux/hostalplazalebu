import { MapPin, Star, Waves, Mountain, Camera, Utensils, ShieldAlert, Fish, Bike, Compass, Bed, BedDouble, Heart, Home } from 'lucide-react';
import heroJpg from './assets/hero-1.jpg';
import habSingle from './assets/hab-single.jpg';
import habDoble from './assets/hab-doble.jpg';
import habMatrimonial from './assets/hab-matrimonial.jpg';
import habTriple from './assets/hab-triple.jpg';
import habCuadruple from './assets/hab-cuadruple.jpg';
import plazaLebu from './assets/plaza-lebu.jpg';
import bath1 from './assets/bath-1.jpg';
import bath2 from './assets/bath-2.jpg';
import logoPng from './assets/logo-final.png';

export { logoPng };

export const ATTRACTIONS = [
  {
    name: "Cavernas de Benavides",
    rating: 5,
    description: "Impresionantes cuevas naturales con un valor histórico profundo, un imperdible en Lebu.",
    icon: Mountain,
    color: "bg-amber-100",
    map: "https://maps.google.com/?q=Cavernas+de+Benavides+Lebu",
  },
  {
    name: "Playa Millaneco",
    rating: 5,
    description: "Arena blanca y olas perfectas para el surf. Ideal para caminatas reflexivas al amanecer.",
    icon: Waves,
    color: "bg-blue-100",
    map: "https://maps.google.com/?q=Playa+Millaneco+Lebu",
  },
  {
    name: "Parque del Carbón",
    rating: 5,
    description: "Un tributo a la historia minera de la región con senderos y monumentos industriales.",
    icon: Compass,
    color: "bg-gray-100",
    map: "https://maps.google.com/?q=Parque+del+Carbon+Lebu",
  },
  {
    name: "Cerro La Cruz",
    rating: 5,
    description: "El mejor mirador panorámico de Lebu, donde el río se encuentra con el océano.",
    icon: Camera,
    color: "bg-green-100",
    map: "https://maps.google.com/?q=Cerro+La+Cruz+Lebu",
  },
  {
    name: "Costanera Lebu",
    rating: 5,
    description: "Perfecta para paseos al atardecer, con hermosas vistas al río y actividades culturales.",
    icon: MapPin,
    color: "bg-teal-100",
    map: "https://maps.google.com/?q=Costanera+Lebu",
  },
  {
    name: "Plaza de Armas",
    rating: 5,
    description: "El corazón de la ciudad, justo frente a nuestro hostal en Lebu. Alojamiento cerca de la plaza, rodeado de historia y vida local.",
    icon: MapPin,
    color: "bg-rose-100",
    map: "https://maps.google.com/?q=Plaza+de+Armas+Lebu",
  }
];

export const GASTRONOMY = [
  {
    name: "Torres De Río",
    type: "Tradicional",
    rating: "4.8/5",
    description: "La mejor gastronomía marina con vista privilegiada al río. Pescados frescos y platos tradicionales de la zona.",
    map: "https://maps.google.com/?q=Torres+de+Rio+Lebu",
    phone: "+56 9 5781 9663"
  },
  {
    name: "El Buen Sazón",
    type: "Mariscos",
    rating: "4.7/5",
    description: "Famoso por su sazón casero y exquisitos jardines de mariscos en el corazón del puerto. Comida típica chilena.",
    map: "https://maps.google.com/?q=El+Buen+Sazon+Lebu",
    phone: "+56 9 2019 4451"
  },
  {
    name: "Il Torino",
    type: "Internacional",
    rating: "4.5/5",
    description: "Auténtica cocina italiana reconocida por sus pastas artesanales y ambiente acogedor.",
    map: "https://maps.google.com/?q=Il+Torino+Lebu",
    phone: "+56 9 9345 5678"
  },
  {
    name: "Caviahue Koru",
    type: "Internacional",
    rating: "4.9/5",
    description: "Experiencia culinaria de alto nivel fusionando productos locales con técnicas modernas internacionales.",
    map: "https://maps.google.com/?q=Caviahue+Koru+Lebu"
  },
  {
    name: "By Roll Sushi",
    type: "Internacional",
    rating: "4.4/5",
    description: "La mejor combinación de frescura marina lebuense con el arte del sushi japonés.",
    map: "https://maps.google.com/?q=By+Roll+Sushi+Lebu",
    phone: "+56 9 7330 0898"
  }
];

export const HOSTAL_SERVICES = [
  { name: "Pesca Guiada", icon: Fish },
  { name: "Trekking", icon: Mountain },
  { name: "Surf", icon: Waves },
  { name: "Ciclismo", icon: Bike },
  { name: "SUP", icon: Compass },
  { name: "Tours Pro", icon: MapPin }
];

export const EMERGENCY_NUMBERS = [
  { name: "Carabineros", number: "133", icon: ShieldAlert },
  { name: "Bomberos", number: "132", icon: ShieldAlert },
  { name: "Ambulancia (SAMU)", number: "131", icon: ShieldAlert },
];

export const TESTIMONIALS = [
  {
    name: "Mariana G.",
    text: "Excelente lugar, el mejor hostal en Lebu. Muy acogedor y atendido por sus propios dueños. Todo muy limpio y un alojamiento cerca de la plaza de armas inmejorable.",
    rating: 5
  },
  {
    name: "Cristian H.",
    text: "Muy buena atención y disposición. Habitaciones con WiFi rápido y un ambiente tranquilo. Un hostal cómodo y familiar, ideal para alojamiento en Lebu, en pleno centro.",
    rating: 5
  },
  {
    name: "Paola S.",
    text: "Hostal impecable, hostal céntrico en Lebu y muy seguro. El desayuno es muy completo y el personal es muy amable. Hostal económico en Lebu y totalmente recomendable para turismo.",
    rating: 5
  }
];

export const ROOM_TYPES = [
  { 
    name: "Single", 
    capacity: "1 Persona", 
    price: "$30.000", 
    icon: Bed, 
    image: habSingle,
    description: "Ideal para viajeros solos o trabajadores que buscan donde alojarse en Lebu. Ambiente tranquilo y funcional con escritorio y habitación con Wi-Fi de alta velocidad."
  },
  { 
    name: "Doble", 
    capacity: "2 Personas", 
    price: "$40.000", 
    icon: BedDouble, 
    image: habDoble,
    description: "Habitación con dos camas individuales en nuestro hostal céntrico en Lebu. Perfecta para amigos o colegas que buscan alojamiento cómodo y económico."
  },
  { 
    name: "Matrimonial", 
    capacity: "2 Personas", 
    price: "$40.000", 
    icon: BedDouble, 
    image: habMatrimonial,
    description: "Nuestra opción más acogedora de alojamiento en Lebu. Cuenta con cama de dos plazas, mesa de comedor/trabajo privada, hervidor eléctrico y dispensador de agua en la habitación. Revestimientos de madera natural para un descanso cálido en el mejor hostal de Lebu."
  },
  { 
    name: "Triple", 
    capacity: "3 Personas", 
    price: "$50.000", 
    icon: BedDouble, 
    image: habTriple,
    description: "Hostal familiar en Lebu: espaciosa y versátil, ideal para familias pequeñas que buscan turismo lebu alojamiento. Combinación de camas según necesidad, siempre con el toque rústico y acogedor."
  },
  { 
    name: "Cuádruple", 
    capacity: "4 Personas", 
    price: "$60.000", 
    icon: BedDouble, 
    image: habCuadruple,
    description: "La mejor opción para grupos o familias buscando hotel en Lebu. Amplia habitación con 4 camas individuales, Smart TV, calefacción propia, hervidor eléctrico y dispensador de agua. Alojamiento con estacionamiento incluido."
  },
];

export const MEDICAL_INFO = [
  { name: "Hospital Santa Isabel", address: "Latorre 400", phone: "+56 41 234 5000" },
  { name: "CESFAM Lebu Norte", address: "Calle Principal s/n", phone: "+56 41 234 6000" }
];

export const FAQS = [
  {
    question: "¿Tienen estacionamiento en el hostal?",
    answer: "Sí, contamos con alojamiento con estacionamiento privado y seguro para nuestros huéspedes. Una ventaja clave de nuestro hostal céntrico en Lebu."
  },
  {
    question: "¿Es un hostal con desayuno incluido?",
    answer: "El desayuno no está incluido en la tarifa base, pero nuestro hostal en Lebu ofrece un exquisito servicio de desayuno continental por un valor adicional, previa coordinación al momento de tu llegada o reserva. Productos locales y café recién preparado."
  },
  {
    question: "¿Las habitaciones con WiFi cuentan con baño privado?",
    answer: "Para mantener nuestra esencia de hostal cómodo y familiar en Lebu, disponemos de amplios baños de uso compartido con un riguroso protocolo de limpieza y desinfección diaria. Todas las habitaciones cuentan con WiFi de alta velocidad."
  },
  {
    question: "¿Aceptan mascotas en el hostal?",
    answer: "Amamos a los animales. Nuestro hostal económico Lebu acepta mascotas pequeñas bajo previa coordinación, manteniendo la tranquilidad de todos los huéspedes. Ideal para turismo en Lebu con tu mascota."
  }
];

export const GALLERY = [
  heroJpg,
  habDoble,
  habCuadruple,
  habSingle,
  habTriple,
  habMatrimonial,
  plazaLebu,
  bath1,
  bath2
];
