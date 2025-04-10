import { Request, Response, NextFunction } from "express";

export const RoleBasedAuthentication = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): void => { 
        if (req.user?.role.toString() !== role) {
            res.status(403).json({ message: "Forbidden: Insufficient Permissions" });
            return;
        }
        next();
    };
};
