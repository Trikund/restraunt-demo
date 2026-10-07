import { Mail, Phone, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8 min-h-screen">
      <SectionHeading title="Contact Us" subtitle="We'd love to hear from you" />
      
      <div className="grid md:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="text-slate-400 mb-8">Have questions about your order, our restaurants, or just want to say hi? Drop us a line!</p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aurora-cyan shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Phone</h4>
              <p className="text-slate-400">+1 (800) 123-4567</p>
              <p className="text-xs text-slate-500 mt-1">Mon-Fri from 8am to 8pm</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aurora-cyan shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Email</h4>
              <p className="text-slate-400">support@flavornest.com</p>
              <p className="text-xs text-slate-500 mt-1">We'll respond within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aurora-cyan shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Office</h4>
              <p className="text-slate-400">123 Culinary Avenue, Suite 100<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--color-glass-surface)] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm text-white" />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm text-white" />
            </div>
            <div>
              <textarea placeholder="How can we help?" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-aurora-cyan text-sm text-white resize-none"></textarea>
            </div>
            <button className="w-full bg-aurora-cyan text-[#111111] font-bold py-3.5 rounded-xl hover:bg-aurora-blue transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
