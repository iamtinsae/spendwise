export default function clsx(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
