const DEFAULT_LANG: L10nCode = 'en';
const SUPPORTED_LANGS: readonly L10nCode[] = ['en', 'de'];

export type L10nCode = 'en' | 'de';

export function getLanguageCode(): L10nCode {
  const lang = navigator.language.split('-')[0];
  return (SUPPORTED_LANGS as readonly string[]).includes(lang)
    ? (lang as L10nCode)
    : DEFAULT_LANG;
}