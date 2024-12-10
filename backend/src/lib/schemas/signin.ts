import { z } from "zod";

const SigninSchema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(5).max(16, {message: 'Password must be between 5 and 16 characters'}),
})

export default SigninSchema; 