import { useState } from 'react';
import { 
  X, QrCode, Smartphone, 
  CreditCard, Landmark, 
  Lock, ArrowRight, Loader2
} from 'lucide-react';
import GlassCard from './GlassCard';
import Button from './Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  amount: number;
  orderId?: string;
  merchantName?: string;
}

type TabType = 'upi' | 'card' | 'netbanking';

export default function RazorpayModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  orderId = 'ORD-ONLINE-TXN',
  merchantName = 'Aurora Food & Tiffin Network'
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('upi');
  const [upiId, setUpiId] = useState('student@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const paymentId = `pay_${Math.random().toString(36).substring(2, 11)}`;
      onSuccess(paymentId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <GlassCard className="max-w-lg w-full p-0 border-[#3395ff]/40 bg-[#0c1a2e] shadow-2xl relative my-6 overflow-hidden text-white flex flex-col">
        {/* Razorpay Brand Header */}
        <div className="bg-[#0b1f3a] border-b border-[#1b3a63] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e4976] flex items-center justify-center font-black text-[#3395ff] text-xl shadow-md border border-[#3395ff]/30">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white tracking-wide">Razorpay</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  TRUSTED
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">{merchantName}</p>
            </div>
          </div>

          <div className="text-right flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Amount to Pay</span>
              <span className="text-xl font-black text-white">₹{amount.toFixed(2)}</span>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Payment Methods Tab */}
        <div className="flex border-b border-[#1b3a63] bg-[#091524] text-xs">
          <button
            onClick={() => setActiveTab('upi')}
            className={`flex-1 py-3 font-bold transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'upi'
                ? 'border-[#3395ff] text-[#3395ff] bg-[#3395ff]/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={14} /> UPI / QR
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-3 font-bold transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'card'
                ? 'border-[#3395ff] text-[#3395ff] bg-[#3395ff]/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard size={14} /> Cards
          </button>
          <button
            onClick={() => setActiveTab('netbanking')}
            className={`flex-1 py-3 font-bold transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'netbanking'
                ? 'border-[#3395ff] text-[#3395ff] bg-[#3395ff]/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark size={14} /> Netbanking
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-5">
          {activeTab === 'upi' && (
            <div className="space-y-4">
              {/* QR Code Mock */}
              <div className="p-4 rounded-2xl bg-[#091524] border border-[#1b3a63] flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <div className="relative w-full h-full flex items-center justify-center border-2 border-black/80 rounded p-1">
                    <QrCode size={80} className="text-black" />
                  </div>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3395ff]">Scan to Pay via any UPI app</span>
                  <h4 className="text-sm font-bold text-white">Google Pay • PhonePe • Paytm</h4>
                  <p className="text-[11px] text-slate-400">
                    Open your favorite UPI app on phone and point camera to complete transaction.
                  </p>
                </div>
              </div>

              {/* Enter VPA */}
              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1.5 block">
                  Or enter UPI Virtual ID (VPA):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@paytm"
                    className="flex-1 bg-[#091524] border border-[#1b3a63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3395ff]"
                  />
                  <button
                    onClick={handleSimulateSuccess}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-[#3395ff] hover:bg-[#257fe0] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Verify & Pay
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1 block">Card Number</label>
                <input
                  type="text"
                  placeholder="4111 •••• •••• 1111"
                  defaultValue="4532 8921 7734 9012"
                  className="w-full bg-[#091524] border border-[#1b3a63] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3395ff]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="08 / 29"
                    className="w-full bg-[#091524] border border-[#1b3a63] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3395ff]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    defaultValue="892"
                    className="w-full bg-[#091524] border border-[#1b3a63] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3395ff]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <span className="text-xs text-slate-400 block font-semibold">Popular Student Banks:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Punjab National Bank', 'Axis Bank', 'Kotak Mahindra'].map((b) => (
                  <button
                    key={b}
                    onClick={handleSimulateSuccess}
                    className="p-2.5 rounded-xl bg-[#091524] border border-[#1b3a63] hover:border-[#3395ff] text-slate-300 hover:text-white text-left transition-all cursor-pointer font-medium"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Assurance */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-[#1b3a63]">
            <span className="flex items-center gap-1">
              <Lock size={12} className="text-emerald-400" /> 256-Bit SSL Secured
            </span>
            <span>Ref: {orderId}</span>
          </div>

          {/* Action Simulation Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleSimulateSuccess}
              disabled={isProcessing}
              className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg shadow-emerald-500/20"
              rightIcon={isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            >
              {isProcessing ? 'Processing Transaction...' : `Simulate ₹${amount.toFixed(2)} Success`}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
