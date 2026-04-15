export const AVG_LIFESPAN_YEARS = 80;

export function beToCe(beYear: number): number {
  return beYear - 543;
}

export function ceToBe(ceYear: number): number {
  return ceYear + 543;
}

export function calculateDeathDate(birthDate: Date): Date {
  const deathDate = new Date(birthDate);
  deathDate.setFullYear(birthDate.getFullYear() + AVG_LIFESPAN_YEARS);
  return deathDate;
}

export interface GenerationInfo {
  name: string;
  years: string;
  nickname: string;
  fact: string;
  definition: string;
  color: string;
}

import { translations, Language } from './translations';

export function getGenerationRoast(birthYearCE: number, lang: Language = 'th'): GenerationInfo {
  const t = translations[lang].generations;
  
  if (birthYearCE >= 1946 && birthYearCE <= 1964) {
    return { ...t.boomer, color: "#ff8c00" };
  } else if (birthYearCE >= 1965 && birthYearCE <= 1980) {
    return { ...t.genx, color: "#888888" };
  } else if (birthYearCE >= 1981 && birthYearCE <= 1996) {
    return { ...t.geny, color: "#ffd700" };
  } else if (birthYearCE >= 1997 && birthYearCE <= 2009) {
    return { ...t.genz, color: "#e63946" };
  } else if (birthYearCE >= 2010 && birthYearCE <= 2024) {
    return { ...t.alpha, color: "#4ade80" };
  } else if (birthYearCE >= 2025 && birthYearCE <= 2039) {
    return { ...t.beta, color: "#3b82f6" };
  } else {
    return { ...t.legend, color: "#ffffff" };
  }
}

export function getViralStats(timeLeftMs: number) {
  const daysLeft = Math.max(0, Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)));
  return {
    sunsets: daysLeft,
    meals: daysLeft * 3,
    workDays: Math.floor(daysLeft * (5 / 7)),
  };
}
