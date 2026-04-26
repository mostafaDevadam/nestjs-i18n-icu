import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { i18n } from './i18next.config';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Get language from query, header, or default
    const lang = (req.query.lang as string) || 
                 req.headers['accept-language']?.split(',')[0] || 
                 'en';
    
    i18n.changeLanguage(lang);
    
    // Attach translate function to request (using type assertion to avoid TypeScript error)
    (req as any).t = (key: string, options?: any) => {
      return i18n.t(key, options);
    };
    
    next();
  }
}