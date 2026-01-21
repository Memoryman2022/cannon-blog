export const nationalityToFlag: Record<string, string> = {
  Albania: 'alb',
  Australia: 'aus',
  Belgium: 'bel',
  Brazil: 'bra',
  Croatia: 'cro',
  Czechia: 'cze',
  Denmark: 'den',
  Ecuador: 'ecu',
  England: 'eng',
  France: 'fra',
  Georgia: 'geo',
  Germany: 'ger',
  Hungary: 'hun',
  Italy: 'ita',
  Netherlands: 'net',
  Norway: 'nor',
  Poland: 'pol',
  Portugal: 'por',
  Romania: 'rom',
  Russia: 'rus',
  Scotland: 'sco',
  Serbia: 'ser',
  Slovenia: 'slo',
  Slovakia: 'slov',
  Spain: 'spa',
  Sweden: 'swe',
  Switzerland: 'swi',
  Türkiye: 'tur',
  Ukraine: 'ukr',
};

export function getFlagPath(nationality: string): string | null {
  const code = nationalityToFlag[nationality];
  return code ? `/flags/${code}.png` : null;
}
