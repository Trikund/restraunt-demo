import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, User, ArrowRight, X, Maximize2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import GlassCard from './GlassCard';
import Rating from './Rating';
import { allDishes, restaurants } from '../data/mockData';
import { useCart } from '../context/CartContext';

const SUGGESTED_PROMPTS = [
  "What should I eat?",
  "Something spicy under ₹15",
  "Healthy dinner",
  "Find me a vegetarian dish",
  "I have chicken and rice"
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendations?: typeof allDishes[0][];
}

interface AIChatUIProps {
  onClose?: () => void;
  isFullScreen?: boolean;
}

export default function AIChatUI({ onClose, isFullScreen = false }: AIChatUIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: 'Hello! I am Foodie AI. What are you craving today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I found some great options for you!";
      let recs: typeof allDishes[0][] = [];

      const lower = text.toLowerCase();
      if (lower.includes('spicy')) {
        recs = allDishes.filter(d => d.name.toLowerCase().includes('spicy') || d.description.toLowerCase().includes('spicy')).slice(0, 2);
        if (recs.length === 0) recs = allDishes.slice(0, 2); // fallback
      } else if (lower.includes('healthy')) {
        recs = allDishes.filter(d => d.name.toLowerCase().includes('salad') || d.name.toLowerCase().includes('bowl')).slice(0, 2);
      } else if (lower.includes('vegetarian') || lower.includes('veg')) {
        recs = allDishes.filter(d => d.vegetarian).slice(0, 2);
      } else if (lower.includes('chicken') && lower.includes('rice')) {
        aiText = "Based on chicken and rice, here are some great dishes and recipes!";
        recs = allDishes.filter(d => d.name.toLowerCase().includes('chicken')).slice(0, 2);
      } else {
        recs = [...allDishes].sort(() => 0.5 - Math.random()).slice(0, 2);
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: aiText,
          recommendations: recs
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const getRestaurantName = (foodId: number) => {
    return restaurants.find(r => r.menu.some(m => m.id === foodId))?.name || 'Local Restaurant';
  };

  const getDeliveryTime = (foodId: number) => {
    return Math.floor((foodId * 17) % 20 + 20) + ' mins';
  };

  return (
    <div className={`flex flex-col h-full ${isFullScreen ? '' : 'bg-background/95 backdrop-blur-3xl'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-white/10 ${isFullScreen ? 'pt-24 pb-6 px-4 lg:px-8' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-purple p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Sparkles size={20} className="text-aurora-cyan" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
              Foodie AI
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-aurora-cyan/20 text-aurora-cyan border border-aurora-cyan/30">Beta</span>
            </h2>
            <p className="text-xs text-aurora-purple font-medium">Your personal taste assistant</p>
          </div>
        </div>

        {!isFullScreen && (
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/ai')} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300">
              <Maximize2 size={16} />
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300">
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${isFullScreen ? 'container mx-auto max-w-4xl' : ''}`}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                msg.sender === 'assistant' 
                  ? 'bg-gradient-to-br from-aurora-cyan/20 to-aurora-purple/20 border border-aurora-cyan/30 text-aurora-cyan' 
                  : 'bg-white/10 text-slate-300 border border-white/20'
              }`}>
                {msg.sender === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className="space-y-3 min-w-0">
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-aurora-blue to-aurora-purple text-white rounded-tr-sm'
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm'
                }`}>
                  <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                </div>

                {/* Recommendations */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
                    {msg.recommendations.map(rec => {
                      const resName = getRestaurantName(rec.id);
                      return (
                        <GlassCard key={rec.id} className="w-64 shrink-0 snap-start bg-background/50 border-white/10 overflow-hidden flex flex-col group">
                          <div className="h-32 relative overflow-hidden">
                            <img src={rec.image} alt={rec.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                              <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10 truncate max-w-[120px]">
                                {resName}
                              </span>
                              <Rating score={rec.rating} />
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-white mb-1 truncate">{rec.name}</h4>
                            <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                              <span className="font-bold text-aurora-cyan text-sm">₹{rec.price.toFixed(2)}</span>
                              <span>{getDeliveryTime(rec.id)}</span>
                            </div>
                            <Button 
                              variant="glass" 
                              size="sm" 
                              className="mt-auto border-aurora-cyan/30 hover:border-aurora-cyan"
                              onClick={() => {
                                addToCart({
                                  id: `ai-${rec.id}`,
                                  foodId: rec.id,
                                  name: rec.name,
                                  restaurant: resName,
                                  price: rec.price,
                                  image: rec.image,
                                  quantity: 1,
                                  customizations: {}
                                });
                              }}
                              leftIcon={<ShoppingBag size={14} />}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[80%]"
            >
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-aurora-cyan/20 to-aurora-purple/20 border border-aurora-cyan/30 text-aurora-cyan">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-aurora-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-aurora-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-aurora-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className={`p-4 bg-background/80 backdrop-blur-xl border-t border-white/10 ${isFullScreen ? 'container mx-auto max-w-4xl pb-8' : ''}`}>
        
        {/* Suggested Prompts */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1 snap-x">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium text-aurora-cyan bg-aurora-cyan/10 border border-aurora-cyan/20 hover:bg-aurora-cyan/20 transition-colors snap-start shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="relative flex items-center gap-2">
          <Input 
            className="flex-1"
            inputClassName="bg-white/5 border-white/10 rounded-full h-12 pl-4 pr-12 focus:border-aurora-purple/50"
            placeholder="Ask Foodie AI anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputValue);
            }}
          />
          <button 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-blue flex items-center justify-center text-background disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105"
          >
            <ArrowRight size={16} className="font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
