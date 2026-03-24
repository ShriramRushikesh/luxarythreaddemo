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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const statusSchema = z.object({
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
  trackingNumber: z.string().optional(),
  courier: z.string().optional(),
  estimatedDelivery: z.string().optional(),
  notifyCustomer: z.boolean().default(true),
  internalNote: z.string().optional(),
}).refine((data) => {
  if (data.status === "Shipped") {
    return !!data.trackingNumber && !!data.courier;
  }
  return true;
}, {
  message: "Tracking number and courier are required when order is shipped",
  path: ["trackingNumber"]
});

type StatusFormValues = z.infer<typeof statusSchema>;

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  orderId: string;
}

const UpdateStatusModal = ({ isOpen, onClose, currentStatus, orderId }: UpdateStatusModalProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StatusFormValues>({
    resolver: zodResolver(statusSchema) as any,
    defaultValues: {
      status: currentStatus as any,
      notifyCustomer: true,
      trackingNumber: "",
      courier: "",
      estimatedDelivery: "",
      internalNote: "",
    }
  });

  const selectedStatus = watch("status");

  const onSubmit = (data: StatusFormValues) => {
    toast.success(`Order ${orderId} status updated to ${data.status}`);
    if (data.notifyCustomer) {
      toast.info("Customer has been notified via email");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8 rounded-3xl border-gray-100 dark:border-zinc-800 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-playfair font-bold">Update Order Status</DialogTitle>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order #{orderId}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
           <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Target Status</Label>
              <Select defaultValue={currentStatus} onValueChange={(v) => setValue("status", v as any)}>
                 <SelectTrigger className="h-12 rounded-xl border-gray-100 dark:border-zinc-800">
                    <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                 </SelectContent>
              </Select>
           </div>

           {selectedStatus === "Shipped" && (
             <div className="space-y-6 pt-4 animate-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Courier Partner</Label>
                      <Select onValueChange={(v) => setValue("courier", v as string)}>
                         <SelectTrigger className="h-11 rounded-xl border-gray-100">
                            <SelectValue placeholder="Select Courier" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="delhivery">Delhivery</SelectItem>
                            <SelectItem value="dtdc">DTDC</SelectItem>
                            <SelectItem value="bluedart">BlueDart</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>
                   <div className="space-y-2">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Tracking Number</Label>
                      <Input {...register("trackingNumber")} placeholder="e.g. DLV12345" className="h-11 rounded-xl border-gray-100 text-[11px] font-bold uppercase tracking-widest" />
                       {errors.trackingNumber && <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest mt-1">{errors.trackingNumber.message}</p>}
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Est. Delivery Date</Label>
                   <Input type="date" {...register("estimatedDelivery")} className="h-11 rounded-xl border-gray-100" />
                </div>
             </div>
           )}

           <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Internal Note</Label>
              <Textarea {...register("internalNote")} placeholder="Reason for change..." className="rounded-xl min-h-[80px] border-gray-100" />
           </div>

           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <div className="space-y-0.5">
                 <p className="text-[10px] font-bold uppercase tracking-widest">Notify Customer</p>
                 <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Send status update email</p>
              </div>
              <Switch checked={watch("notifyCustomer")} onCheckedChange={(v) => setValue("notifyCustomer", v)} />
           </div>

           <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-full h-12 px-6 text-[10px] font-bold uppercase tracking-widest">Cancel</Button>
              <Button type="submit" className="rounded-full h-12 px-10 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl hover:-translate-y-1 transition-all">
                 Update Status
              </Button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
