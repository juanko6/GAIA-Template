// [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-FE-T01]

import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUPPORTED_FORMATS, SupportedFormat } from '@/features/image-conversion/constants';

interface FormatSelectorProps {
    value: SupportedFormat;
    onChange: (value: SupportedFormat) => void;
    className?: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ value, onChange, className }) => {
    return (
        <div className={cn("flex flex-col gap-2 w-full max-w-xs", className)}>
            <label className="text-sm font-medium text-foreground">
                Formato de destino
            </label>

            <Select.Root value={value} onValueChange={(val) => onChange(val as SupportedFormat)}>
                <Select.Trigger
                    className="inline-flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Seleccionar formato"
                >
                    <Select.Value />
                    <Select.Icon>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
                        <Select.Viewport className="p-1">
                            {SUPPORTED_FORMATS.map((format) => (
                                <Select.Item
                                    key={format.value}
                                    value={format.value}
                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100"
                                >
                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                        <Select.ItemIndicator>
                                            <Check className="h-4 w-4" />
                                        </Select.ItemIndicator>
                                    </span>
                                    <Select.ItemText>{format.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
};
