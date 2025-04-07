import { ParsedUrlQuery } from 'querystring';

// Redefinir el tipo de params para Next.js 15
declare module 'next' {
  export interface PageProps {
    params?: ParsedUrlQuery | Record<string, string>;
    searchParams?: ParsedUrlQuery;
  }
} 