import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { i18n } from './i18next.config';

export const I18nD = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // Get language from query param or header
    const lang = request.query.lang || 
                 request.headers['accept-language']?.split(',')[0] || 
                 'en';
    
    // Set the language
    i18n.changeLanguage(lang);
    
    // If a key is provided, return the translated string
    if (key) {
      return i18n.t(key);
    }
    
    // Otherwise return the translate function
    return (key: string, args?: any) => i18n.t(key, args);
  },
);