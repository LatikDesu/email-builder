// Utility for combining CSS class names
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Conditional class names
export const clsx = (
  classMap: Record<string, boolean | undefined | null>
): string => {
  return Object.entries(classMap)
    .filter(([, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ');
}; 