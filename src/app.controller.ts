import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { i18n as i18nICU } from './i18n/i18next.config';
import { I18nD } from './i18n/i18n.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private i18nService: I18nService) { }

  @Get()
  async getHello(@I18n() i18n: I18nContext, @I18n() tt: (key: string, args?: any) => string, @Req() req: Request) {
    //return this.appService.getHello();
    /*console.log("i18n:", this.i18nService.t("test.hello"), await this.i18nService.t('test.hello', { lang: I18nContext.current()?.lang }));
    console.log(i18n.lang)
    const lang = I18nContext.current()?.lang;
    console.log("lang:", lang)
    const l = await this.i18nService.t('test.hello', { lang });
    console.log("l:", l)
    const message = await i18n.t('test.hello', { lang: i18n.lang});
    console.log("Language:", i18n.lang); // "en" or "ar"
    console.log("Translation:", message); // "Hello" or "مرحباً
    */
    const t = (req as any).t;
    const msg = t('test.message', { gender: 'male' });
    console.log("msg t:", msg, t("hello"))
    //i18nICU.changeLanguage(i18n.lang);
    //const icu = i18nICU.t("test:message", { gender: 'male' });
    //console.log("icu:", icu)
  
  
    return {
      statusCode: 200,
      message: [t('test:message', { gender: 'male' }), t('test:app:message', { gender: 'female' }), t('test:app:message', { gender: 'other' }) ],
      data: {
        tt: t('test:message', { gender: "female" }),
      },
    };
  }
}
