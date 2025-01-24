import { cn } from "@/lib/utils";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific chart props here
}

export function Chart({ className, ...props }: ChartProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Chart implementation */}
    </div>
  );
}