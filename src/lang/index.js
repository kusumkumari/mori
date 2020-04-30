import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import enRtlLang from './entries/en-US-rtl';

const AppLocale = {
    jp: esLang,
    en: enLang,
    enrtl:enRtlLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.jp.data);
addLocaleData(AppLocale.enrtl.data);

export default AppLocale;
