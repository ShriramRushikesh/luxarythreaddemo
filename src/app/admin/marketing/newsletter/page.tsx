"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SubscriberList } from "@/components/admin/marketing/SubscriberList";
import { CampaignList } from "@/components/admin/marketing/CampaignList";

export default function AdminNewsletterPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-playfair font-bold text-black dark:text-white">Newsletter & Campaigns</h1>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black">Engage your audience with targeted communication</p>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-10">
        <TabsList className="bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl h-14 w-full md:w-auto">
          <TabsTrigger 
            value="campaigns"
            className="rounded-xl px-10 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-lg transition-all h-12"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger 
            value="subscribers"
            className="rounded-xl px-10 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-lg transition-all h-12"
          >
            Subscriber Database
          </TabsTrigger>
          <TabsTrigger 
            value="automations"
            className="rounded-xl px-10 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-lg transition-all h-12"
          >
            Automations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="focus-visible:outline-none">
           <CampaignList />
        </TabsContent>

        <TabsContent value="subscribers" className="focus-visible:outline-none">
           <SubscriberList />
        </TabsContent>

        <TabsContent value="automations" className="focus-visible:outline-none">
           <div className="h-96 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-zinc-800 flex items-center justify-center">
              <div className="text-center space-y-4">
                 <p className="text-sm font-bold text-black dark:text-white">Marketing Automations</p>
                 <p className="text-xs text-gray-400 max-w-xs mx-auto">Configure automatic emails for abandoned carts, welcome sequences, and birthday rewards.</p>
                 <Button className="h-10 px-6 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px]">Configure Automations</Button>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
