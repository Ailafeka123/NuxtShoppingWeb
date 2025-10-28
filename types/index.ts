
// client端的
// Auth資料格式
export interface AuthType {
    id:string,
    email:string,
    usericon:string,
    userName:string,
    lastLogin:string,
    createTime:string,
    userLevel:string
}
// product格式
export interface ProductionType{
    Id:string,
    CreateUserID:string,
    Category:string[],
    KeyWord:string[],
    Pic:string[],
    Price:number,
    Number:number,
    Stock:number,
    Context:string,
    State:boolean,
}



// Server端上傳所需的
// Auth資料格式
export interface ServerAuthType{
    id:string,
    email:string,
    usericon:string,
    userName:string,
    userLevel:string
}
// product資料格式
export interface ServerProductType{
    id:string,
    category:string[],
}
