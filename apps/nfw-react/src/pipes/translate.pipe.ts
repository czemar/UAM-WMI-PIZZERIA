import { ELang } from "../enums/lang.enum";
import { environment } from "../environments/environment";
import { pl } from "../lang/pl.lang";

export function translate(value: string) {
  const transl = () => {
    switch(environment.language) {
      case ELang.PL: return pl[value];
      default: return value;
    }
  }

  const translation = transl();
  if (!environment.production && !translation) {
    console.warn(`Missing translation for: '${value}' in lang: ${environment.language}`);
    return value;
  } else {
    return translation;
  }
}