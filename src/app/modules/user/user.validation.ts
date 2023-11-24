import { z } from 'zod'

const fullNameSchema = z.object({
  firstName: z.string().min(3, { message: 'firstName is required' }),
  lastName: z.string().min(3, { message: 'lastName is required' }),
})

export const userValidationSchema = z.object({
  userId: z.number().positive().min(1, { message: 'userId is required' }),
  username: z.string(),
  password: z.string(),
  fullName: fullNameSchema,
  age: z.number().positive(),
  email: z.string().email({ message: 'email is required' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .optional(),
})
