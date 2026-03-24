"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Star, 
  GripVertical,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  url: string;
  isPrimary: boolean;
  alt: string;
}

const MediaUpload = () => {
  const [files, setFiles] = useState<MediaItem[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      isPrimary: files.length === 0 && index === 0,
      alt: ""
    }));
    setFiles(prev => [...prev, ...newFiles].slice(0, 10));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 10 - files.length
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const setPrimary = (id: string) => {
    setFiles(prev => prev.map(f => ({ ...f, isPrimary: f.id === id })));
  };

  const updateAlt = (id: string, alt: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, alt } : f));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Product Media</h3>
            <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Upload up to 10 high-quality images</p>
         </div>
         <span className="text-[10px] font-bold text-gray-400">{files.length}/10</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {files.map((file, index) => (
          <div key={file.id} className="group relative aspect-square bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-black dark:hover:border-white transition-all shadow-sm">
             <img src={file.url} alt={file.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                   <button 
                     onClick={() => setPrimary(file.id)}
                     className={cn(
                       "p-1.5 rounded-full backdrop-blur-md transition-colors",
                       file.isPrimary ? "bg-yellow-400 text-black shadow-lg" : "bg-white/10 text-white hover:bg-white/20"
                     )}
                   >
                      <Star className={cn("w-3 h-3", file.isPrimary ? "fill-black" : "")} />
                   </button>
                   <button onClick={() => removeFile(file.id)} className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors">
                      <Trash2 className="w-3 h-3" />
                   </button>
                </div>
                
                <Input 
                  placeholder="Alt text" 
                  value={file.alt}
                  onChange={(e) => updateAlt(file.id, e.target.value)}
                  className="h-7 text-[8px] font-bold uppercase bg-black/60 border-none text-white placeholder:text-white/50 rounded-lg"
                />
             </div>

             {file.isPrimary && (
               <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-widest shadow-xl">Primary</div>
             )}
          </div>
        ))}

        {files.length < 10 && (
          <div 
            {...getRootProps()} 
            className={cn(
              "aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
              isDragActive ? "border-black bg-gray-50 dark:bg-zinc-900" : "border-gray-100 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
            )}
          >
            <input {...getInputProps()} />
            <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-900 rounded-full flex items-center justify-center">
               <Plus className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Add Media</span>
          </div>
        )}
      </div>

      <div className="p-10 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 text-center group hover:border-black dark:hover:border-white transition-all cursor-pointer" {...getRootProps()}>
         <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Upload className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
         </div>
         <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-widest">Drop images here</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">JPG, PNG or WEBP (MAX. 5MB)</p>
         </div>
      </div>
    </div>
  );
};

export default MediaUpload;
