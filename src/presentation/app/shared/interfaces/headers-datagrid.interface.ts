export interface HeadersDataGrid{
    name:string,
    width:string,
    aligment:string,
    visible:boolean,
    caption?:string,
    dataList?:dataList[],
    format?:string
  }
  export interface dataList{
    valueExpr:string | number,
    displayExpr:string
  }