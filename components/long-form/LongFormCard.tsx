import { cn } from "@/lib/utils";

type LongFormItemProps = {
  title: string;
  description: string;
  reverse?: boolean;
};

export function LongFormItem({
  title,
  description,
  reverse = false,
}: LongFormItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
        reverse && "lg:flex-row-reverse"
      )}
    >
      {/* Video Placeholder */}
      <div className={cn(
        "w-full h-[320px] rounded-2xl bg-muted",
        reverse && "lg:order-2"
      )} />

      {/* Text Content */}
      <div className={cn(
        "space-y-4",
        reverse && "lg:order-1"
      )}>
        <h3 className="text-2xl font-semibold text-foreground leading-snug">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
}
