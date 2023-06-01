export interface Headers{
    name:string,
    width:string,
    aligment:string,
    visible:boolean,
    caption?:string
    dataList?:dataList[]
  }
  export interface dataList{
    valueExpr:string | number,
    displayExpr:string
  }