import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <div className={cn('flex flex-col justify-center h-16 mt-12 bg-gradient-to-r from-slate-200 via-white to-slate-200 border-t')}>
      <div className={cn('layout w-full')}>
        <p className={cn('text-sm text-muted-foreground')}>© 2023 Palm Resort. All Rights Reserved.</p>
      </div>
    </div>
  );
};
