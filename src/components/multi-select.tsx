"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface MultiSelectProps {
  selected: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      selected = [],
      onChange,
      onBlur,
      placeholder = "Type and press Enter...",
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    // Maintain a list of options created during this session to show in the dropdown list
    const [options, setOptions] = React.useState<string[]>([]);

    React.useEffect(() => {
      // Sync options so selected items stay visible in the list if dropped down
      if (selected.length > 0) {
        setOptions((prev) => Array.from(new Set([...prev, ...selected])));
      }
    }, [selected]);

    const handleAddValue = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;

      if (!selected.includes(trimmed)) {
        onChange([...selected, trimmed]);
      }
      if (!options.includes(trimmed)) {
        setOptions((prev) => [...prev, trimmed]);
      }
      setInputValue("");
    };

    const handleRemove = (itemToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Avoid triggering open/close dropdown events
      onChange(selected.filter((item) => item !== itemToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault();
        handleAddValue(inputValue);
      }

      if (e.key === "Backspace" && inputValue === "" && selected.length > 0) {
        onChange(selected.slice(0, -1));
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        {/* Trigger container styled exactly like standard premium inputs */}
        <PopoverTrigger asChild>
          <div
            onClick={() => setOpen(true)}
            className="group rounded-md border border-input min-h-10 max-h-32 overflow-y-auto px-3 py-2 text-sm bg-background flex flex-wrap gap-1.5 items-center cursor-text transition-colors duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
            {/* Scrollable grid of current selections */}
            {selected.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-1 pr-1 pl-2 py-0.5 animate-in fade-in-50 duration-150">
                <span className="truncate max-w-30">{item}</span>
                <button
                  type="button"
                  className="rounded-full outline-none hover:bg-muted p-0.5 transition-colors"
                  onClick={(e) => handleRemove(item, e)}>
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}

            <input
              ref={ref}
              placeholder={selected.length === 0 ? placeholder : ""}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (!open) setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              onBlur={onBlur}
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-15 h-6 text-sm border-none focus:ring-0 p-0"
            />
          </div>
        </PopoverTrigger>

        {/* Dropdown element containing search lists and actions */}
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
          onInteractOutside={() => setOpen(false)}>
          <Command className="bg-popover">
            <CommandList className="max-h-48 overflow-y-auto p-1">
              {inputValue.trim() !== "" && (
                <CommandGroup heading="Create new item">
                  <CommandItem
                    value={inputValue}
                    onSelect={() => handleAddValue(inputValue)}
                    className="flex items-center gap-2 cursor-pointer text-sm py-2 px-2.5 rounded-sm">
                    <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      Add{" "}
                      <strong className="font-semibold text-foreground">
                        {inputValue.trim()}
                      </strong>
                    </span>
                  </CommandItem>
                </CommandGroup>
              )}

              {options.length > 0 && (
                <CommandGroup heading="Recent items">
                  {options.map((option) => {
                    const isSelected = selected.includes(option);
                    return (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => {
                          if (isSelected) {
                            onChange(selected.filter((x) => x !== option));
                          } else {
                            onChange([...selected, option]);
                          }
                        }}
                        className="flex items-center justify-between cursor-pointer py-2 px-2.5 rounded-sm data-[selected='true']:bg-accent">
                        <span className="truncate">{option}</span>
                        {isSelected && (
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase tracking-wider px-1 py-0 bg-primary/5 text-primary border-primary/20">
                            Selected
                          </Badge>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              {inputValue.trim() === "" && options.length === 0 && (
                <div className="py-6 text-center text-xs text-muted-foreground px-4">
                  Start typing to create customized entries...
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
