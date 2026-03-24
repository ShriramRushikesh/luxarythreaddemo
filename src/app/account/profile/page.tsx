"use client";

import React, { useState } from "react";
import { Camera, ShieldCheck, Mail, Phone, Calendar, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Profile Settings</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Manage your personal information and security</p>
        </div>
        <div className="bg-green-50 px-4 py-2 border border-green-100 flex items-center gap-2">
           <ShieldCheck className="w-3 h-3 text-green-600" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-green-700">Verified Account</span>
        </div>
      </div>

      {/* Profile Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Avatar Section */}
        <div className="md:col-span-4 flex flex-col items-center space-y-6">
          <div className="relative group">
             <div className="w-40 h-40 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-200" />
                )}
             </div>
             <label className="absolute bottom-2 right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
             </label>
          </div>
          <div className="text-center space-y-1">
             <h3 className="text-xs font-bold uppercase tracking-widest">John Doe</h3>
             <p className="text-[9px] text-gray-400 uppercase tracking-widest">Last updated 2 days ago</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="md:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none transition-all" placeholder="John Doe" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                <div className="relative">
                  <input disabled className="w-full p-4 pr-12 text-xs border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed outline-none" value="john.doe@example.com" />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Phone Number</label>
                <div className="relative">
                  <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none transition-all" placeholder="+91 98765 43210" />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Gender</label>
                <div className="flex gap-4 pt-4">
                   {["Male", "Female", "Other"].map((gender) => (
                     <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="gender" className="w-3 h-3 text-black border-gray-100" />
                        <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-black transition-colors">{gender}</span>
                     </label>
                   ))}
                </div>
             </div>
             <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Date of Birth</label>
                <div className="relative">
                  <input type="date" className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none transition-all" />
                </div>
             </div>
          </div>
          <Button className="py-8 px-12 bg-black text-white rounded-none uppercase tracking-[0.4em] font-bold text-[10px] shadow-2xl active:scale-95 transition-all">
             Save Profile Changes
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="pt-12 border-t border-gray-100 space-y-10">
        <div className="space-y-2">
          <h2 className="text-xl font-playfair tracking-tight uppercase">Security & Password</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Keep your account secure with a strong password</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
           {["Current Password", "New Password", "Confirm New Password"].map((label) => (
             <div key={label} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{label}</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="••••••••" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                     {showPassword ? <EyeOff className="w-4 h-4 text-gray-300" /> : <Eye className="w-4 h-4 text-gray-300" />}
                  </button>
                </div>
             </div>
           ))}
           <div className="sm:col-span-2 pt-4">
              <Button variant="outline" className="py-8 px-12 border-black rounded-none uppercase tracking-[0.4em] font-bold text-[10px] hover:bg-black hover:text-white transition-all">
                Update Password
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
