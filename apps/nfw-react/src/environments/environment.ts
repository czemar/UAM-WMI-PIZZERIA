// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { ELang } from '../enums/lang.enum';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3333',
  language: ELang.PL
};
