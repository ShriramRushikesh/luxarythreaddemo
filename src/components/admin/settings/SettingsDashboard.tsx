"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Truck, 
  CreditCard, 
  Receipt, 
  Mail, 
  Users, 
  Link2, 
  Search, 
  Code,
  Save,
  DatabaseBackup,
  Image as ImageIcon,
  MapPin,
  Clock,
  ShieldAlert,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const menuItems = [
  { id: "general", label: "General Settings", icon: Settings },
  { id: "shipping", label: "Shipping & Delivery", icon: Truck },
  { id: "payments", label: "Payment Methods", icon: CreditCard },
  { id: "tax", label: "Tax Settings", icon: Receipt },
  { id: "email", label: "Email Settings", icon: Mail },
  { id: "users", label: "User & Roles", icon: Users },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "seo", label: "SEO Settings", icon: Search },
  { id: "developer", label: "Developer Settings", icon: Code },
  { id: "backup", label: "Backup & Restore", icon: DatabaseBackup },
];

export function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully", {
        description: "Your changes have been applied across the platform."
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-64 shrink-0 space-y-2">
         {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-widest",
                activeTab === item.id 
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-lg" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800"
              )}
            >
               <item.icon className="w-4 h-4" /> {item.label}
            </button>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
         <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md pb-4 pt-2 border-b border-gray-100 dark:border-zinc-900">
            <div>
               <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">
                 {menuItems.find(m => m.id === activeTab)?.label}
               </h2>
            </div>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
               {isSaving ? (
                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
               ) : (
                 <><Save className="w-4 h-4" /> Save Changes</>
               )}
            </Button>
         </div>

         {/* General Settings */}
         {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Store Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Store Name</Label>
                        <Input defaultValue="Luxury Threads Pune" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Tagline</Label>
                        <Input defaultValue="Elegance redefined for the modern connoisseur." className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Store Description</Label>
                        <textarea className="w-full h-32 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none resize-none font-medium text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" defaultValue="Premium luxury fashion boutique located in the heart of Pune." />
                     </div>
                  </div>
                  <div className="flex gap-8">
                     <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Store Logo</Label>
                        <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center text-gray-400 hover:border-black dark:hover:border-white transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-900">
                           <ImageIcon className="w-6 h-6 mb-2" />
                           <span className="text-[8px] font-bold uppercase">Upload 200x200</span>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Favicon (.ico)</Label>
                        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 hover:border-black dark:hover:border-white transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-900">
                           <ImageIcon className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Support Email</Label>
                        <Input type="email" defaultValue="support@luxurythreads.in" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Phone Number</Label>
                        <Input defaultValue="+91 98765 43210" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">WhatsApp Number</Label>
                        <Input defaultValue="+91 98765 43210" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Store Address</Label>
                        <textarea className="w-full h-24 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none resize-none font-medium text-sm focus:ring-2 focus:ring-black outline-none" defaultValue="123 Luxury Avenue, Baner, Pune, Maharashtra 411045" />
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Regional Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Currency</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>INR (₹)</option>
                           <option>USD ($)</option>
                           <option>EUR (€)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Timezone</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>Asia/Kolkata (IST)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Date Format</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>DD/MM/YYYY</option>
                           <option>MM/DD/YYYY</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Weight Unit</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>Kilograms (kg)</option>
                           <option>Grams (g)</option>
                           <option>Pounds (lbs)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Dimension Unit</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>Centimeters (cm)</option>
                           <option>Inches (in)</option>
                        </select>
                     </div>
                  </div>
               </Card>
            </div>
         )}
         
         {/* Shipping Settings */}
         {activeTab === "shipping" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Shipping Zones</h4>
                     <Button variant="outline" className="h-8 px-4 rounded-lg border-gray-200 dark:border-zinc-800 text-[9px] uppercase tracking-widest font-bold">Add Zone</Button>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 space-y-4">
                        <div className="flex justify-between items-center">
                           <h5 className="font-playfair font-bold text-lg">Domestic (India)</h5>
                           <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 border-none shadow-none text-[8px] uppercase font-bold tracking-widest">4 Methods Active</Badge>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                           <div className="flex justify-between items-center text-sm bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                              <span className="font-medium">Free Shipping (Above ₹999)</span>
                              <span className="font-bold text-emerald-500">₹0.00</span>
                           </div>
                           <div className="flex justify-between items-center text-sm bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                              <span className="font-medium">Standard Flat Rate</span>
                              <span className="font-bold">₹99.00</span>
                           </div>
                           <div className="flex justify-between items-center text-sm bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                              <span className="font-medium">Express Next-Day</span>
                              <span className="font-bold">₹249.00</span>
                           </div>
                           <div className="flex justify-between items-center text-sm bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                              <span className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Local Store Pickup (Baner)</span>
                              <span className="font-bold text-emerald-500">Free</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 space-y-4 opacity-70">
                        <div className="flex justify-between items-center">
                           <h5 className="font-playfair font-bold text-lg">Rest of World</h5>
                           <Badge className="bg-gray-200 text-gray-600 dark:bg-zinc-800 border-none shadow-none text-[8px] uppercase font-bold tracking-widest">Inactive</Badge>
                        </div>
                     </div>
                  </div>
               </Card>
               
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Delivery Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Est. Delivery Days (Min - Max)</Label>
                        <div className="flex gap-4">
                           <Input type="number" defaultValue="2" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-center" />
                           <span className="flex items-center text-gray-400">-</span>
                           <Input type="number" defaultValue="4" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-center" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Same Day Cut-off Time</Label>
                        <Input type="time" defaultValue="14:00" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     
                     <div className="md:col-span-2 pt-4 space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                           <div>
                              <p className="font-bold text-sm">Allow Backorders</p>
                              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Let customers buy out-of-stock items</p>
                           </div>
                           <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                           <div>
                              <p className="font-bold text-sm">Enable Same-Day Delivery</p>
                              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Only applies to local city pin codes</p>
                           </div>
                           <Switch defaultChecked />
                        </div>
                     </div>
                  </div>
               </Card>
            </div>
         )}
         
         {/* Payment Methods */}
         {activeTab === "payments" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-[#0a1930] text-white border-none rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
                  <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded-xl">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.43 2.73145H1.57C0.7 2.73145 0 3.43145 0 4.30145V19.6915C0 20.5615 0.7 21.2615 1.57 21.2615H22.43C23.3 21.2615 24 20.5615 24 19.6915V4.30145C24 3.43145 23.3 2.73145 22.43 2.73145ZM22.43 19.6915H1.57V8.23145H22.43V19.6915ZM22.43 6.66145H1.57V4.30145H22.43V6.66145Z" fill="#3395FF"/>
                              <path d="M4.71 16.5518H7.85V11.8418H4.71V16.5518Z" fill="#3395FF"/>
                              <path d="M9.42 16.5518H19.29V11.8418H9.42V16.5518Z" fill="#3395FF"/>
                           </svg>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold">Razorpay Configuration</h4>
                           <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mt-1">UPI, Cards, Net Banking</p>
                        </div>
                     </div>
                     <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-blue-200/50 tracking-widest">Key ID</Label>
                        <Input type="password" defaultValue="rzp_test_xxxxxxx" className="h-12 rounded-xl bg-white/5 border-white/10 text-white font-mono" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-blue-200/50 tracking-widest">Key Secret</Label>
                        <Input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxx" className="h-12 rounded-xl bg-white/5 border-white/10 text-white font-mono" />
                     </div>
                     <div className="md:col-span-2 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-sm font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Test Mode Active</span>
                        <Switch defaultChecked className="data-[state=checked]:bg-amber-500" />
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="text-xl font-bold flex items-center gap-3">Cash on Delivery <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 border-none">Active</Badge></h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">India Only</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Extra Fee (₹)</Label>
                        <Input type="number" defaultValue="50" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Maximum COD Amount (₹)</Label>
                        <Input type="number" defaultValue="10000" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                  </div>
               </Card>
            </div>
         )}
         
         {/* Placeholder for other tabs simply to prove the structure exists and handles correctly */}
         {activeTab === "tax" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">GST Configuration (India)</h4>
                     <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">GST Number (GSTIN)</Label>
                        <Input defaultValue="27AADCB2230M1Z2" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium uppercase" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Default Tax Rate</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>18% (Standard Rate)</option>
                           <option>12% (Apparel &gt; ₹1000)</option>
                           <option>5% (Apparel &lt; ₹1000)</option>
                           <option>0% (Exempt)</option>
                        </select>
                     </div>
                     <div className="md:col-span-2 pt-4">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-3 block">Tax Display Setup</Label>
                        <div className="flex gap-4">
                           <div className="flex-1 p-4 rounded-2xl border-2 border-black dark:border-white bg-gray-50 dark:bg-zinc-900 cursor-pointer">
                              <div className="flex justify-between items-start mb-2">
                                 <span className="font-bold text-sm">Tax Inclusive</span>
                                 <div className="w-4 h-4 rounded-full border-4 border-black dark:border-white bg-white dark:bg-black"></div>
                              </div>
                              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Catalog prices include tax</span>
                           </div>
                           <div className="flex-1 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 cursor-pointer opacity-70">
                              <div className="flex justify-between items-start mb-2">
                                 <span className="font-bold text-sm">Tax Exclusive</span>
                                 <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700"></div>
                              </div>
                              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tax added at checkout</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </Card>
            </div>
         )}

         {activeTab === "email" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">SMTP Configuration</h4>
                     <Button variant="outline" className="h-8 px-4 rounded-lg border-gray-200 dark:border-zinc-800 text-[9px] uppercase tracking-widest font-bold">Send Test Email</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">From Email Address</Label>
                        <Input type="email" defaultValue="support@luxurythreads.in" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">From Name</Label>
                        <Input defaultValue="Luxury Threads" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email Service Provider</Label>
                        <select className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium text-sm outline-none appearance-none cursor-pointer">
                           <option>Amazon SES</option>
                           <option>SendGrid</option>
                           <option>Custom SMTP</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">SMTP Host</Label>
                        <Input defaultValue="email-smtp.ap-south-1.amazonaws.com" disabled className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium opacity-50 text-gray-500" />
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Transactional Templates</h4>
                  <div className="space-y-4">
                     {['Order Confirmation', 'Shipping Update', 'Delivery Notification', 'Password Reset'].map((tmpl) => (
                        <div key={tmpl} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                           <div>
                              <p className="font-bold text-sm">{tmpl}</p>
                              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Standard Variable Set Available</p>
                           </div>
                           <Button variant="outline" className="h-8 px-4 rounded-lg bg-white dark:bg-zinc-950 text-[9px] uppercase tracking-widest font-bold border-gray-200 dark:border-zinc-800">Edit Template</Button>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         )}
         
         {activeTab === "users" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Admin Users</h4>
                     <Button className="h-8 px-4 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-bold">Invite User</Button>
                  </div>
                  
                  <div className="pt-4 overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="border-b border-gray-100 dark:border-zinc-800">
                              <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Name</th>
                              <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Role</th>
                              <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Status</th>
                              <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {[
                              { name: 'Dave C.', email: 'admin@luxurythreads.in', role: 'Super Admin', status: 'Active' },
                              { name: 'Sarah M.', email: 'sarah.m@luxurythreads.in', role: 'Manager', status: 'Active' },
                              { name: 'John Doe', email: 'john.d@luxurythreads.in', role: 'Staff', status: 'Inactive' }
                           ].map((user, i) => (
                              <tr key={i} className="border-b border-gray-50 dark:border-zinc-900/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                 <td className="py-4 px-4">
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-[10px] text-gray-500 tracking-widest uppercase">{user.email}</p>
                                 </td>
                                 <td className="py-4 px-4 font-bold">{user.role}</td>
                                 <td className="py-4 px-4">
                                    <Badge className={cn("text-[9px] uppercase tracking-widest border-none font-bold", user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-gray-100 text-gray-500 dark:bg-zinc-800')}>{user.status}</Badge>
                                 </td>
                                 <td className="py-4 px-4 text-right">
                                    <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-blue-500">Edit</Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>
            </div>
         )}
         
         {activeTab === "seo" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Global SEO Parameters</h4>
                  <div className="space-y-8 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Default Meta Title</Label>
                        <Input defaultValue="Luxury Threads Pune | Premium Fashion Boutique" className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none font-medium" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Default Meta Description</Label>
                        <textarea className="w-full h-24 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none resize-none font-medium text-sm outline-none focus:ring-2 focus:ring-black" defaultValue="Discover the finest collection of luxury apparel and accessories at Luxury Threads Pune. Elevate your wardrobe with our curated selections." />
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Technical SEO</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                        <div>
                           <p className="font-bold text-sm">Product Schema Markup</p>
                           <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">JSON-LD structured data</p>
                        </div>
                        <Switch defaultChecked />
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                        <div>
                           <p className="font-bold text-sm">Auto-generate XML Sitemap</p>
                           <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Updates on new products</p>
                        </div>
                        <Switch defaultChecked />
                     </div>
                  </div>
               </Card>
            </div>
         )}
         
         {activeTab === "developer" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-500" /> API Access Keys</h4>
                     <Button className="h-8 px-4 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-bold">Generate New Key</Button>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                     <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                        <div>
                           <p className="font-bold font-mono text-sm tracking-widest">sk_live_1234xxx890</p>
                           <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold flex items-center gap-2">
                              Created 2 days ago <span className="w-1 h-1 rounded-full bg-gray-300"></span> ERP Integration
                           </p>
                        </div>
                        <Button variant="ghost" className="h-8 px-4 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-[9px] uppercase tracking-widest font-bold">Revoke</Button>
                     </div>
                  </div>
               </Card>

               <Card className="p-8 bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-900/30 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">System State</h4>
                  <div className="flex items-center justify-between pt-4">
                     <div>
                        <p className="font-bold text-amber-900 dark:text-amber-100 text-lg">Maintenance Mode</p>
                        <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-1 uppercase tracking-widest font-bold max-w-sm">
                           Lock storefront for updates. Only whitelisted admin IP addresses can view the live site.
                        </p>
                     </div>
                     <Switch className="data-[state=checked]:bg-amber-500" />
                  </div>
               </Card>
            </div>
         )}
         
         {activeTab === "integrations" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Marketing & Analytics Integrations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                     <div className="space-y-4 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                        <div className="flex justify-between items-center">
                           <h5 className="font-bold text-lg">Google Analytics 4</h5>
                           <Switch defaultChecked />
                        </div>
                        <Input defaultValue="G-A1B2C3D4E5" className="h-12 rounded-xl bg-white dark:bg-zinc-950 border-none font-medium font-mono text-sm" placeholder="Measurement ID" />
                     </div>
                     
                     <div className="space-y-4 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                        <div className="flex justify-between items-center">
                           <h5 className="font-bold text-lg">Facebook Pixel</h5>
                           <Switch defaultChecked />
                        </div>
                        <Input defaultValue="123456789012345" className="h-12 rounded-xl bg-white dark:bg-zinc-950 border-none font-medium font-mono text-sm" placeholder="Pixel ID" />
                     </div>

                     <div className="space-y-4 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                        <div className="flex justify-between items-center">
                           <h5 className="font-bold text-lg">WhatsApp Business</h5>
                           <Switch />
                        </div>
                        <Input className="h-12 rounded-xl bg-white dark:bg-zinc-950 border-none font-medium font-mono text-sm" placeholder="waba_token_..." />
                     </div>

                     <div className="space-y-4 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                        <div className="flex justify-between items-center">
                           <h5 className="font-bold text-lg">Instagram Catalog</h5>
                           <Switch />
                        </div>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] uppercase font-bold tracking-widest">Connect Account</Button>
                     </div>
                  </div>
               </Card>
            </div>
         )}
         
         {activeTab === "backup" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Database & Media Backups</h4>
                     <Button className="h-8 px-4 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-bold"><DatabaseBackup className="w-3 h-3 mr-2" /> Manual Backup</Button>
                  </div>
                  
                  <div className="space-y-6 pt-4">
                     <div className="p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 space-y-4">
                        <div className="flex justify-between items-center">
                           <div>
                              <p className="font-bold text-lg">Auto-Backup Strategy</p>
                              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Runs at 02:00 IST</p>
                           </div>
                           <select className="h-10 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-widest outline-none cursor-pointer">
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                           </select>
                        </div>
                     </div>

                     <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 pt-4">Recent Snapshots</h5>
                     <div className="space-y-3">
                        {[
                           { name: 'db_dump_2024_03_20.sql.gz', date: 'Today, 02:00 AM', size: '14.2 MB' },
                           { name: 'db_dump_2024_03_19.sql.gz', date: 'Yesterday, 02:00 AM', size: '14.1 MB' },
                        ].map((backup, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
                                    <DatabaseBackup className="w-4 h-4 text-gray-400" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-sm tracking-widest font-mono">{backup.name}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{backup.date} • {backup.size}</p>
                                 </div>
                              </div>
                              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"><Download className="w-4 h-4" /></Button>
                           </div>
                        ))}
                     </div>
                  </div>
               </Card>
            </div>
         )}

      </div>
    </div>
  );
}
