import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const bodyParts = [
  { value: "chest", label: "胸" },
  { value: "back", label: "背中" },
  { value: "arms", label: "腕" },
  { value: "shoulders", label: "肩" },
  { value: "legs", label: "脚" },
];

export function BodyPartCombobox({ onSelect }: { onSelect: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? bodyParts.find((part) => part.value === selectedValue)?.label
            : "部位を選択"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="部位を検索..." />
          <CommandEmpty>見つかりません。</CommandEmpty>
          <CommandGroup>
            {bodyParts.map((part) => (
              <CommandItem
                key={part.value}
                value={part.value}
                onSelect={() => handleSelect(part.value)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedValue === part.value ? "opacity-100" : "opacity-0"
                  }`}
                />
                {part.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
