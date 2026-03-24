"use client";

import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  variant?: "danger" | "warning" | "info";
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  variant = "danger"
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 gap-6 border-none shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto mb-2 animate-in zoom-in duration-300">
             <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <DialogTitle className="text-xl font-playfair font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 rounded-full h-11 text-[9px] font-bold uppercase tracking-widest"
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-full h-11 bg-red-500 hover:bg-red-600 text-white border-none text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
