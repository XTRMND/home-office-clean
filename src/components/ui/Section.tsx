import {type HTMLAttributes} from 'react';
import {cn} from '@/lib/cn';

type Variant = 'default' | 'muted' | 'brand';
type Spacing = 'sm' | 'md' | 'lg';

export function Section({
  className,
  variant = 'default',
  spacing = 'md',
  ...props
}: HTMLAttributes<HTMLElement> & {variant?: Variant; spacing?: Spacing}) {
  const bg: Record<Variant, string> = {
    default: 'bg-white',
    muted: 'bg-zinc-50',
    brand: 'bg-brand-500 text-white',
  };
  const pad: Record<Spacing, string> = {
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-24',
    lg: 'py-24 sm:py-32',
  };
  return <section {...props} className={cn(bg[variant], pad[spacing], className)} />;
}
