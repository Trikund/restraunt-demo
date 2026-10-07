import { ChefHat } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8 min-h-screen">
      <SectionHeading title="About FlavorNest" subtitle="Our journey to bring the best food to your doorstep" />
      <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" alt="Restaurant kitchen" className="w-full h-[500px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="space-y-6 text-slate-300">
          <div className="w-16 h-16 rounded-full bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan mb-6">
            <ChefHat size={32} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Crafting Culinary Experiences</h3>
          <p className="leading-relaxed">
            Founded in 2023, FlavorNest was born out of a simple idea: everyone deserves access to incredible, restaurant-quality food, whether dining in or eating on their couch.
          </p>
          <p className="leading-relaxed">
            We partner with the finest local restaurants and chefs to ensure that every meal delivered through our platform meets the highest standards of taste and quality.
          </p>
          <div className="pt-6 grid grid-cols-2 gap-6 border-t border-white/10 mt-8">
            <div>
              <h4 className="text-4xl font-black text-aurora-cyan mb-2">500+</h4>
              <p className="text-sm text-slate-400 uppercase tracking-wider font-bold">Restaurant Partners</p>
            </div>
            <div>
              <h4 className="text-4xl font-black text-aurora-cyan mb-2">1M+</h4>
              <p className="text-sm text-slate-400 uppercase tracking-wider font-bold">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
