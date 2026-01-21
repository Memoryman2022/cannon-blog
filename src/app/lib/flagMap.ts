export const nationalityToFlag: Record<string, string> = {
  Albania: 'alb',
  Australia: 'aus',
  Belgium: 'bel',
  Croatia: 'cro',
  Czechia: 'cze',
  Denmark: 'den',
  England: 'eng',
  France: 'fra',
  Georgia: 'geo',
  Germany: 'ger',
  Hungary: 'hun',
  Italy: 'ita',
  Netherlands: 'net',
  Poland: 'pol',
  Portugal: 'por',
  Romania: 'rom',
  Scotland: 'sco',
  Serbia: 'ser',
  Slovenia: 'slo',
  Slovakia: 'slov',
  Spain: 'spa',
  Switzerland: 'swi',
  Türkiye: 'tur',
  Ukraine: 'ukr',
};

export function getFlagPath(nationality: string): string | null {
  const code = nationalityToFlag[nationality];
  return code ? `/flags/${code}.png` : null;
}
