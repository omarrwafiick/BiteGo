export interface CreateVendorDto{
    name:string;
    ownerName:string; 
    pinCode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    menu: [];
    orders: [];
    isApproved: boolean;
}

export interface VendorPayloadDto{
    id:string;
    email:string;
    name:string; 
}

export interface UpdateVendorDto{
    phone:string;
    email:string;
    name:string;
    menu: [];
}

export interface LoginVendorDto{
    email:string;
    password:string;
}