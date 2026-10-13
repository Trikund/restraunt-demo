import { X, Printer, ShieldCheck, Download } from 'lucide-react';
import Button from './Button';

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  orderId?: string;
  date: string;
  customerName: string;
  customerPhone?: string;
  deliveryAddress: string;
  vendorName: string;
  items: InvoiceItem[];
  subtotal: number;
  deliveryFee?: number;
  tax: number;
  totalAmount: number;
  paymentMethod?: string;
  paymentId?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: InvoiceData;
}

export default function InvoiceModal({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="max-w-2xl w-full bg-white text-slate-900 rounded-3xl shadow-2xl relative my-6 overflow-hidden flex flex-col p-6 sm:p-8 border border-slate-200">
        
        {/* Close Button & Actions Header (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck size={12} /> Official GST Tax Invoice
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer size={14} />}
              className="text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300 font-semibold cursor-pointer"
            >
              Print / Save PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE BODY */}
        <div className="space-y-6 text-sm">
          
          {/* Header Row */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Aurora<span className="text-cyan-600">Food</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Aurora Technologies Private Limited<br />
                Campus Hub Delivery Node, Premnagar, Dehradun<br />
                GSTIN: <span className="font-mono font-semibold">05AABCA1234D1Z2</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tax Invoice</span>
              <span className="text-base font-black text-slate-800 font-mono">{data.invoiceNumber}</span>
              <p className="text-xs text-slate-500 mt-1">Date: {data.date}</p>
              {data.paymentId && (
                <p className="text-[11px] text-emerald-700 font-medium">Ref: {data.paymentId}</p>
              )}
            </div>
          </div>

          {/* Billed To & Vendor Row */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Billed To (Student / Customer):
              </span>
              <p className="font-bold text-slate-900 text-sm">{data.customerName}</p>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{data.deliveryAddress}</p>
              {data.customerPhone && <p className="text-slate-500 mt-0.5">{data.customerPhone}</p>}
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fulfilled By Verified Provider:
              </span>
              <p className="font-bold text-slate-900 text-sm">{data.vendorName}</p>
              <p className="text-slate-600 mt-0.5">FSSAI License: 12623005000189</p>
              <p className="text-slate-500 mt-0.5">Payment: {data.paymentMethod || 'Online (UPI/Razorpay)'}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Item / Plan Description</th>
                  <th className="py-2.5 font-bold text-center">Qty</th>
                  <th className="py-2.5 font-bold text-right">Rate</th>
                  <th className="py-2.5 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                    <td className="py-3 text-right text-slate-600">₹{item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-slate-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Grand Summary */}
          <div className="border-t border-slate-200 pt-4 flex justify-between items-start">
            <div className="space-y-1 max-w-xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
                Status: PAID
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Computer-generated invoice. Authorized for student hostel claim, mess allowance, and parental reimbursement.
              </p>
            </div>

            <div className="w-56 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">₹{data.subtotal.toFixed(2)}</span>
              </div>
              {data.deliveryFee !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges:</span>
                  <span className="font-semibold text-slate-900">₹{data.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST (5% Combined):</span>
                <span className="font-semibold text-slate-900">₹{data.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-black text-slate-900">
                <span>Total Paid:</span>
                <span className="text-cyan-700 text-base">₹{data.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer for on-screen modal */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900"
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Download size={14} />}
            className="font-bold bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Download Invoice PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
