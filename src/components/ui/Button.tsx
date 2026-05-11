import {forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode} from 'react';
import {Link, type LinkProps} from 'react-router-dom';
import {cn} from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  secondary: 'bg-zinc-900 text-white hover:bg-zinc-800',
  outline: 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50',
  ghost: 'text-zinc-700 hover:bg-zinc-100',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

type CommonProps = {variant?: Variant; size?: Size; className?: string; children?: ReactNode};

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & CommonProps>(
  function Button({variant = 'primary', size = 'md', className, ...props}, ref) {
    return <button ref={ref} {...props} className={cn(base, variants[variant], sizes[size], className)} />;
  },
);

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LinkProps & CommonProps) {
  return <Link {...props} className={cn(base, variants[variant], sizes[size], className)} />;
}

export function ExternalLinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps) {
  return <a {...props} className={cn(base, variants[variant], sizes[size], className)} />;
}
