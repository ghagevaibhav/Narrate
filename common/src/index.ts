import z from 'zod'

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().optional()
})


export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


export const createBlog = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
})


export const updateBlog = z.object({
    id: z.string(),
    title: z.string().min(5).optional(),
    content: z.string().min(10).optional(),
})


export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;