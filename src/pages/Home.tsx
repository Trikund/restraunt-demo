import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChefHat, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import RestaurantCard from '../components/RestaurantCard';
import MenuItemCard from '../components/MenuItemCard';

// Import Mock Data
import { categories, restaurants, offers, allDishes } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [specialMenuCategory, setSpecialMenuCategory] = useState('All');
  
  const filteredSpecialDishes = specialMenuCategory === 'All' 
    ? allDishes.slice(0, 8).map((m, i) => ({ ...m, restaurant: restaurants[i % restaurants.length].name }))
    : specialMenuCategory === 'Veg'
      ? allDishes.filter(dish => dish.vegetarian).slice(0, 8).map((m, i) => ({ ...m, restaurant: restaurants[i % restaurants.length].name }))
    : specialMenuCategory === 'Non-Veg'
      ? allDishes.filter(dish => !dish.vegetarian).slice(0, 8).map((m, i) => ({ ...m, restaurant: restaurants[i % restaurants.length].name }))
    : allDishes.filter(dish => dish.name.toLowerCase().includes(specialMenuCategory.toLowerCase()) || dish.category.toLowerCase().includes(specialMenuCategory.toLowerCase())).slice(0, 8).map((m, i) => ({ ...m, restaurant: restaurants[i % restaurants.length].name }));

  return (
    <div className="pb-20">
      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0 bg-background transition-colors duration-500">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop" alt="Hero Steak" className="w-full h-full object-cover opacity-40 object-right hidden dark:block" />
          <img src="https://images.unsplash.com/photo-1490818387583-1b5ba4597d26?q=80&w=2000&auto=format&fit=crop" alt="Hero Salad" className="w-full h-full object-cover opacity-30 object-right dark:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10 max-w-7xl flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 md:pr-12 text-center md:text-left"
          >
            <span className="inline-block py-1 px-3 border-l-2 border-aurora-cyan text-aurora-cyan font-semibold text-sm mb-6 uppercase tracking-widest">
              GOOD FOOD • GOOD MOOD
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
              Delicious Food<br />
              Brings People<br />
              <span className="text-aurora-cyan">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-300 mb-10 max-w-xl mx-auto md:mx-0">
              Discover amazing restaurants, delicious food and unforgettable dining experiences near you.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto md:mx-0 mb-12 bg-[#ffffff] dark:bg-black/40 backdrop-blur-md rounded-full p-2 flex items-center shadow-xl shadow-black/5 dark:shadow-aurora-cyan/5 border border-slate-200 dark:border-white/10">
              <div className="pl-4 text-slate-400">
                <MapPin size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines, or dishes..." 
                className="flex-1 bg-transparent border-none text-slate-900 dark:text-white px-4 py-3 focus:outline-none placeholder:text-slate-400"
              />
              <button className="bg-aurora-cyan hover:bg-aurora-blue text-[#111111] p-3.5 rounded-full transition-colors flex items-center justify-center font-bold">
                <ArrowRight size={20} />
              </button>
            </div>
            
            {/* 3. CATEGORIES */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => navigate(`/restaurants?cuisine=${cat.name}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-background/50 backdrop-blur-md hover:border-aurora-cyan hover:bg-aurora-cyan/10 transition-colors cursor-pointer"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-semibold text-sm">{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 hidden lg:block">
             {/* Empty space for image background to shine on right side */}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 space-y-32">
        
        {/* 7. OFFERS (Moved up for better conversion) */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <motion.div 
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${offer.color} shadow-2xl flex items-center justify-between`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="relative z-10 text-white">
                  <h3 className="text-4xl font-extrabold mb-1 drop-shadow-md">{offer.title}</h3>
                  <p className="text-lg font-medium opacity-90">{offer.subtitle}</p>
                </div>
                <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl text-white font-mono font-bold text-lg shadow-lg">
                  {offer.code}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. TOP RATED RESTAURANTS */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <SectionHeading 
              title="Top Rated Restaurants" 
              subtitle="Discover the best restaurants near you"
              className="mb-0"
            />
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/restaurants')} className="hidden sm:flex border border-white/10 rounded-full px-6">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <Button variant="ghost" fullWidth onClick={() => navigate('/restaurants')} className="mt-6 sm:hidden border border-white/10 rounded-full">View All Restaurants</Button>
        </section>

        {/* 5. OUR SPECIAL MENU */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <SectionHeading 
              title="Our Special Menu" 
              subtitle="Handpicked dishes from top restaurants"
              className="mb-0" 
            />
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/restaurants')} className="hidden sm:flex border border-white/10 rounded-full px-6">
              View All
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2">
            {['All', 'Veg', 'Non-Veg', 'Starters', 'Pizza', 'Burger', 'Indian', 'Chinese', 'Desserts', 'Healthy'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSpecialMenuCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${specialMenuCategory === cat ? 'bg-aurora-cyan text-background font-bold' : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-aurora-cyan'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpecialDishes.length > 0 ? filteredSpecialDishes.map(dish => (
              <MenuItemCard key={dish.id} item={dish} />
            )) : (
              <div className="col-span-full py-10 text-center text-slate-400">No dishes found in this category.</div>
            )}
          </div>
        </section>

        {/* 6. SEARCH BY CUISINE */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <SectionHeading 
              title="Search by Cuisine" 
              className="mb-0" 
            />
            <div className="hidden sm:flex gap-2">
               <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-aurora-cyan hover:text-[#111111] transition-colors">&lt;</button>
               <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-aurora-cyan hover:text-[#111111] transition-colors">&gt;</button>
            </div>
          </div>
          <div className="flex justify-between overflow-x-auto hide-scrollbar gap-6 pb-4">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center gap-3 cursor-pointer group shrink-0">
                <div className="w-24 h-24 rounded-full border border-white/10 bg-background/50 flex items-center justify-center text-4xl group-hover:border-aurora-cyan transition-colors overflow-hidden relative">
                   <div className="absolute inset-0 bg-white/5 group-hover:bg-aurora-cyan/10 transition-colors" />
                   <span className="relative z-10">{cat.icon}</span>
                </div>
                <span className="font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. EASY ORDERING */}
        <section className="border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-background to-[#111]">
          <div className="relative z-10">
            <SectionHeading title="Easy Ordering" subtitle="Order your favourite food in 3 simple steps" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 relative">
              <div className="flex flex-col items-center relative z-10">
                 <div className="w-20 h-20 rounded-full bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan mb-4 border border-aurora-cyan/30 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                   <ChefHat size={32} />
                 </div>
                 <h4 className="font-bold text-lg text-white mb-2">Choose Food</h4>
                 <p className="text-sm text-slate-400">Browse menu</p>
              </div>
              <div className="flex flex-col items-center relative z-10">
                 <div className="w-20 h-20 rounded-full bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan mb-4 border border-aurora-cyan/30 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                   <ArrowRight size={32} />
                 </div>
                 <h4 className="font-bold text-lg text-white mb-2">Place Order</h4>
                 <p className="text-sm text-slate-400">Secure payment</p>
              </div>
              <div className="flex flex-col items-center relative z-10">
                 <div className="w-20 h-20 rounded-full bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan mb-4 border border-aurora-cyan/30 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                   <Sparkles size={32} />
                 </div>
                 <h4 className="font-bold text-lg text-white mb-2">Get it Delivered</h4>
                 <p className="text-sm text-slate-400">Fast & fresh</p>
              </div>
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[1px] border-t border-dashed border-white/20 z-0" />
            </div>
          </div>
        </section>

        {/* 8. RESERVATION */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 md:p-12">
           <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" alt="Restaurant Interior" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
           </div>
           
           <div className="relative z-10 max-w-2xl">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Reservation</h2>
             <p className="text-slate-300 mb-8 text-lg">Book your table in advance for a special dining experience. Customize your seating, tell us about your special occasion, and let us take care of the rest.</p>
             
             <div className="flex">
               <Link to="/reservation" className="bg-aurora-cyan text-[#111111] font-bold py-4 px-8 rounded-xl hover:bg-aurora-blue transition-colors text-lg flex items-center gap-2">
                 Book a Table <ArrowRight size={20} />
               </Link>
             </div>
           </div>
        </section>

        {/* 9. AUTH SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--color-glass-surface)] shadow-2xl">
          {/* Left: Login */}
          <div className="p-10 md:p-14 relative z-10 bg-background/40">
             <h3 className="text-3xl font-bold mb-2">Welcome Back!</h3>
             <p className="text-sm text-slate-400 mb-8">Login to continue your tasty journey</p>
             <div className="flex flex-col gap-4">
               <div className="relative">
                 <input type="text" placeholder="Email or Phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm" />
               </div>
               <div className="relative">
                 <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm" />
               </div>
               <div className="flex justify-between items-center mt-2">
                 <label className="flex items-center gap-2 text-sm text-slate-300">
                   <input type="checkbox" className="rounded border-white/20 bg-transparent text-aurora-cyan focus:ring-aurora-cyan" />
                   Remember me
                 </label>
                 <a href="#" className="text-sm text-aurora-cyan hover:underline">Forgot Password?</a>
               </div>
               <button className="w-full bg-aurora-cyan text-[#111111] font-bold py-3.5 rounded-xl mt-4 hover:bg-aurora-blue transition-colors">
                 Login
               </button>
               <div className="flex items-center gap-4 mt-6">
                 <div className="flex-1 border-t border-white/10"></div>
                 <span className="text-xs text-slate-500 uppercase">Or continue with</span>
                 <div className="flex-1 border-t border-white/10"></div>
               </div>
               <div className="flex justify-center gap-4 mt-6">
                 <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#111111] hover:scale-110 transition-transform">G</button>
                 <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform">f</button>
                 <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#111111] hover:scale-110 transition-transform"></button>
               </div>
             </div>
          </div>
          
          {/* Right: Signup */}
          <div className="p-10 md:p-14 relative z-10 bg-background/20">
             <h3 className="text-3xl font-bold mb-2">Create Account</h3>
             <p className="text-sm text-slate-400 mb-8">Join us and explore amazing food</p>
             <div className="flex flex-col gap-4">
               <div className="relative">
                 <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm" />
               </div>
               <div className="relative">
                 <input type="text" placeholder="Email or Phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm" />
               </div>
               <div className="relative">
                 <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm" />
               </div>
               
               <button className="w-full bg-aurora-cyan text-[#111111] font-bold py-3.5 rounded-xl mt-8 hover:bg-aurora-blue transition-colors">
                 Sign Up
               </button>
               <p className="text-center text-sm text-slate-400 mt-4">
                 Already have an account? <a href="#" className="text-aurora-cyan font-bold hover:underline">Login</a>
               </p>
             </div>
          </div>
          
          {/* Background image covering both if needed, but the mockup uses dark gradients */}
          <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay" />
        </section>

        {/* 9. APP CTA / NEWSLETTER */}
        <section className="relative rounded-[3rem] overflow-hidden glass border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-cyan/5 to-transparent z-0" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Download Our App</h2>
            <p className="text-lg text-slate-300 mb-8">
              Get the best food experience on the go. Order faster, track in real-time, and get exclusive mobile-only offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="primary" size="lg" className="px-8 flex gap-2 items-center">
                Download iOS
              </Button>
              <Button variant="glass" size="lg" className="px-8 bg-white/5 flex gap-2 items-center">
                Download Android
              </Button>
            </div>
          </div>
          
          <div className="relative z-10 w-full max-w-sm hidden lg:block">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop" alt="App Preview" className="w-full rounded-3xl shadow-2xl rotate-12 opacity-80" />
          </div>
        </section>
        
      </div>
    </div>
  );
}
