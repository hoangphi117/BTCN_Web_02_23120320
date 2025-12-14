import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    {...props}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
      "data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-300",
      className
    )}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block h-5 w-5 rounded-full bg-white shadow transition-transform",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };
