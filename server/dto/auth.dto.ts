 
export type AuthPayload = LoginPayloadDto;


export interface LoginPayloadDto{
    id:string;
    email:string;
    name:string; 
    role:string; 
    verified:boolean;   
}
