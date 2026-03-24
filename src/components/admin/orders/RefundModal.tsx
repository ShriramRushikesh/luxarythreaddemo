"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const refundSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  method: z.enum(["Original", "Credit", "Bank"]),
  reason: z.string().min(5, "Reason is required (min 5 chars)"),
  internalNote: z.string().optional(),
});

type RefundFormValues = z.infer<typeof refundSchema>;

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  orderId: string;
}

const RefundModal = ({ isOpen, onClose, orderTotal, orderId }: RefundModalProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      amount: orderTotal,
      method: "Original",
    }
  });

  const onSubmit = (data: RefundFormValues) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing luxury refund...',
        success: () => {
          onClose();
          return `₹${data.amount.toLocaleString()} refunded to ${data.method === 'Original' ? 'original payment' : data.method}!`;
        },
        error: 'Refund gateway error. Please try again.',
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8 rounded-3xl border-gray-100 dark:border-zinc-800 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-sm">
             <RotateCcw className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-playfair font-bold">Process Refund</DialogTitle>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order #{orderId} • Balance: ₹{orderTotal.toLocaleString()}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
           <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Refund Amount (₹)</Label>
              <div className="relative group">
                 <Input 
                   type="number" 
                   {...register("amount", { valueAsNumber: true })} 
                   className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 focus:border-red-500 transition-all font-bold text-lg" 
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500">MAX ₹{orderTotal.toLocaleString()}</div>
              </div>
              {errors.amount && <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest mt-1">{errors.amount.message}</p>}
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Refund Method</Label>
                 <Select defaultValue="Original" onValueChange={(v) => setValue("method", v as any)}>
                    <SelectTrigger className="h-11 rounded-xl border-gray-100">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="Original">Original Method</SelectItem>
                       <SelectItem value="Credit">Store Credit</SelectItem>
                       <SelectItem value="Bank">Direct Bank Transfer</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="space-y-2">
                 <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Reason</Label>
                 <Select onValueChange={(v) => setValue("reason", v as string)}>
                    <SelectTrigger className="h-11 rounded-xl border-gray-100">
                       <SelectValue placeholder="Select Reason" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="Customer Request">Customer Request</SelectItem>
                       <SelectItem value="Damaged Item">Damaged / Defective</SelectItem>
                       <SelectItem value="Out of Stock">Item Out of Stock</SelectItem>
                       <SelectItem value="Wrong Size">Wrong Size/Fit</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
           </div>

           <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Internal Explanation</Label>
              <Textarea {...register("internalNote")} placeholder="Details for audit trail..." className="rounded-xl min-h-[80px] border-gray-100" />
           </div>

           <div className="p-4 bg-red-50/50 dark:bg-red-950/10 rounded-2xl border border-red-100 dark:border-red-950/20 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-red-600/80 leading-relaxed">
                 Warning: This action is irreversible. The funds will be deducted from your merchant account immediately.
              </p>
           </div>

           <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-full h-12 px-6 text-[10px] font-bold uppercase tracking-widest">Discard</Button>
              <Button type="submit" className="rounded-full h-12 px-10 bg-red-500 text-white font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-red-500/20 hover:bg-red-600 hover:-translate-y-1 transition-all">
                 <ShieldCheck className="w-4 h-4 mr-2" /> Process Refund
              </Button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RefundModal;
