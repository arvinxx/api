declare module Stock {
  /**
   * 归属净利润
   *  Attributable net profit
   */
  export interface ANP {
    sjd: string;
    pjxs: string;
    zhpj: string;
    mr: string;
    zc: string;
    zx: string;
    jc: string;
    mc: string;
    zjs: string;
  }

  export interface JgycItem {
    SECUCODE: string;
    SECURITY_CODE: string;
    SECURITY_NAME_ABBR: string;
    PUBLISH_DATE: string;
    ORG_CODE: string;
    ORG_NAME_ABBR: string;
    YEAR1: number;
    YEAR_MARK1: string;
    EPS1: number;
    PE1: number;
    YEAR2: number;
    YEAR_MARK2: string;
    EPS2: number;
    PE2: number;
    YEAR3: number;
    YEAR_MARK3: string;
    EPS3: number;
    PE3: number;
    YEAR4: number;
    YEAR_MARK4: string;
    EPS4: number;
    PE4: number;
  }

  export interface Mgsy {
    year: string;
    value: string;
    ratio: string;
  }

  export interface Datum2 {
    rq: string;
    mgsy: string;
    syycmgsy: string;
    mgjzc: string;
    jzcsyl: string;
    jlr: string;
    yyzsr: string;
    yylr: string;
  }

  export interface Yctj {
    title: string;
    data: Datum2[];
  }

  export interface Jzcsyl {
    year: string;
    value: string;
    ratio: string;
  }

  export interface Gsjlr {
    year: string;
    value: string;
    ratio: string;
  }

  export interface Yysr {
    year: string;
    value: string;
    ratio: string;
  }

  export interface Datum3 {
    sj: string;
    jg: string;
    yjy: string;
    value: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    pj: string;
  }

  export interface Mgsy2 {
    baseYear: number;
    data: Datum3[];
  }

  export interface Datum4 {
    sj: string;
    jg: string;
    yjy: string;
    value: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    pj: string;
  }

  export interface Jlr {
    baseYear: number;
    data: Datum4[];
  }

  export interface Ycmx {
    mgsy: Mgsy2;
    jlr: Jlr;
  }

  export interface EasyMoneyProfitResponse {
    pjtj: ANP[];
    jgyc: JgycItem[];
    mgsy: Mgsy[];
    yctj: Yctj;
    jzcsyl: Jzcsyl[];
    gsjlr: Gsjlr[];
    yysr: Yysr[];
    ycmx: Ycmx;
  }
}
