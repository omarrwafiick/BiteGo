import { z } from 'zod';

export const VendorValidationSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    ownerName: z.string().min(3, 'Owner name must be at least 3 characters'),
    foodType: z.array(z.string()).optional(),
    pinCode: z.string().min(5, 'Pin code must be at least 5 characters'),
    address: z.string().min(10, 'Address must be at least 10 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    salt: z.string(),
    serviceAvailable: z.boolean(),
    coverImages: z.array(z.string()).optional(),
    rating: z.number().min(0, 'Rating must be between 0 and 5').max(5, 'Rating must be between 0 and 5').optional(),
    foods: z.array(z.string()).optional(), 
  });
  