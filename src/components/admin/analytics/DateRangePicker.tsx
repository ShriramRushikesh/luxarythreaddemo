"use client";

import * as React from "react";
import { format, subDays, startOfMonth, endOfMonth, startOfYesterday, endOfYesterday, subMonths } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Check } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DateRangePickerProps {
  className?: string;
  onRangeChange?: (range: DateRange | undefined, compare: boolean) => void;
}

export function DateRangePicker({
  className,
  onRangeChange,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [compare, setCompare] = React.useState(false);
  const [preset, setPreset] = React.useState<string>("30d");

  const handlePresetChange = (value: string) => {
    setPreset(value);
    let newRange: DateRange | undefined;
    const today = new Date();

    switch (value) {
      case "today":
        newRange = { from: today, to: today };
        break;
      case "yesterday":
        newRange = { from: startOfYesterday(), to: endOfYesterday() };
        break;
      case "7d":
        newRange = { from: subDays(today, 7), to: today };
        break;
      case "30d":
        newRange = { from: subDays(today, 30), to: today };
        break;
      case "thisMonth":
        newRange = { from: startOfMonth(today), to: today };
        break;
      case "lastMonth":
        const lastMonth = subMonths(today, 1);
        newRange = { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
        break;
      default:
        return;
    }
    setDate(newRange);
    onRangeChange?.(newRange, compare);
  };

  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center gap-4", className)}>
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[280px] h-12 justify-start text-left font-normal border-gray-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-zinc-900",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y") + " - " + format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
              <ChevronDown className="ml-auto h-4 w-4 text-gray-400 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden border-gray-100 dark:border-zinc-800 shadow-2xl" align="start">
            <div className="flex flex-col sm:flex-row">
              <div className="p-4 border-r border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 w-full sm:w-48">
                <div className="space-y-1">
                  {[
                    { label: "Today", value: "today" },
                    { label: "Yesterday", value: "yesterday" },
                    { label: "Last 7 Days", value: "7d" },
                    { label: "Last 30 Days", value: "30d" },
                    { label: "This Month", value: "thisMonth" },
                    { label: "Last Month", value: "lastMonth" },
                  ].map((p) => (
                    <button
                      key={p.value}
                      onClick={() => handlePresetChange(p.value)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                        preset === p.value 
                          ? "bg-black text-white dark:bg-white dark:text-black" 
                          : "text-gray-400 hover:text-black dark:hover:text-white"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                  <div className="pt-2">
                     <button
                        onClick={() => setPreset("custom")}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                          preset === "custom" 
                            ? "bg-black text-white dark:bg-white dark:text-black" 
                            : "text-gray-400 hover:text-black dark:hover:text-white"
                        )}
                      >
                        Custom Range
                      </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => {
                    setDate(range);
                    setPreset("custom");
                    onRangeChange?.(range, compare);
                  }}
                  numberOfMonths={2}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 h-12 px-5 rounded-2xl shadow-sm hover:border-gray-200 dark:hover:border-zinc-700 transition-colors group">
         <Switch 
            id="compare" 
            checked={compare} 
            onCheckedChange={(val) => {
               setCompare(val);
               onRangeChange?.(date, val);
            }}
            className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
         />
         <Label htmlFor="compare" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer">
            Compare with Previous Period
         </Label>
      </div>

      <div className="ml-auto hidden xl:flex gap-2">
         {["PDF", "CSV", "Excel"].map((format) => (
            <Button 
               key={format}
               variant="outline" 
               className="h-10 rounded-xl bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-all shadow-sm"
            >
               Export {format}
            </Button>
         ))}
      </div>
    </div>
  );
}
