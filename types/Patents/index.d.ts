declare module Patents {
  export interface Patent {
    type: string;
    name: string;
    applyId: string;
    applyDate: string;
    openId: string;
    openDate: string;
    abstract: string;
    claim: string;
    lawStatus: LawStatus[];
  }
  export interface LawStatus {
    status: string;
    date: string;
  }
}
