import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private i18nService: I18nService) { }

  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    //return this.appService.getHello();
    console.log("i18n:", this.i18nService.t("test.hello"), await this.i18nService.t('test.hello', { lang: I18nContext.current()?.lang }));
    console.log(i18n.lang)
    const lang = I18nContext.current()?.lang;
    console.log("lang:", lang)
    const l = await this.i18nService.t('test.hello', { lang });
    console.log("l:", l)
    const message = await i18n.t('test.hello', { lang: i18n.lang});
    console.log("Language:", i18n.lang); // "en" or "ar"
    console.log("Translation:", message); // "Hello" or "مرحباً
  
  
    return {
      statusCode: 200,
      message: await i18n.t('test.app.api'),
      data: null,
    };
  }
}
