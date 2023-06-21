type Modifications = Record<string, boolean | string | undefined>;

export function classNames(
  cn: string,
  modifications: Modifications = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cn,
    ...additional.filter(Boolean),
    ...Object.entries(modifications)
      .filter(([, value]) => Boolean(value))
      .map(([cn]) => cn),
  ]
    .join(' ');
}
