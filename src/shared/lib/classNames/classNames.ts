type Modifications = Record<string, boolean | string>;

export function classNames(cn: string, modifications?: Modifications, additional?: string[]): string {
  return [
    cn,
    ...additional,
    ...Object.entries(modifications)
      .filter(([cn, value]) => Boolean(value))
      .map(([cn]) => cn)
  ]
    .join(' ');
}
