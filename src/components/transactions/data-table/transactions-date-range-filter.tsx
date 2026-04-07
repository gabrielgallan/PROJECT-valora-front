"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TransactionsDateRangeFilterProps = {
  label: string;
  value?: Date;
  onChange: (date?: Date) => void;
};

export function TransactionsDateRangeFilter({
  label,
  value,
  onChange,
}: TransactionsDateRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] justify-start bg-transparent text-left font-normal dark:bg-transparent",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon data-icon="inline-start" />
          {value ? format(value, "PPP") : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
