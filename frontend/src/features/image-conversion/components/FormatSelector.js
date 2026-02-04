"use strict";
// [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-FE-T01]
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatSelector = void 0;
var react_1 = require("react");
var Select = require("@radix-ui/react-select");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var constants_1 = require("@/features/image-conversion/constants");
var FormatSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange, className = _a.className;
    return (<div className={(0, utils_1.cn)("flex flex-col gap-2 w-full max-w-xs", className)}>
            <label className="text-sm font-medium text-foreground">
                Formato de destino
            </label>

            <Select.Root value={value} onValueChange={function (val) { return onChange(val); }}>
                <Select.Trigger className="inline-flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Seleccionar formato">
                    <Select.Value />
                    <Select.Icon>
                        <lucide_react_1.ChevronDown className="h-4 w-4 opacity-50"/>
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
                        <Select.Viewport className="p-1">
                            {constants_1.SUPPORTED_FORMATS.map(function (format) { return (<Select.Item key={format.value} value={format.value} className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100">
                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                        <Select.ItemIndicator>
                                            <lucide_react_1.Check className="h-4 w-4"/>
                                        </Select.ItemIndicator>
                                    </span>
                                    <Select.ItemText>{format.label}</Select.ItemText>
                                </Select.Item>); })}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>);
};
exports.FormatSelector = FormatSelector;
