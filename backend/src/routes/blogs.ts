import { Hono } from "hono";
import SignUpSchema from "../lib/schemas/signup";
import SigninSchema from "../lib/schemas/signin";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()

.use()

.post("/signup", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL  
    }).$extends(withAccelerate())

    const body = await c.req.parseBody();
    const { email, password } = body;

    const { success } = SignUpSchema.safeParse({ email, password });

    if(!success) {
        return c.json({ message: "Invalid email or password" }, { status: 400 });
    }

    // Simulate database interaction
    try{

        const user = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        })  

        if(user) {
            return c.json({ message: "User already exists" }, { status: 400 });
        }

        await prisma.user.create({
            data: {
                email: email as string ,
                password: password as string,
            }
        })
        console.log("User registered successfully");
    }
    catch(error) {
        console.error("Error registering user:", error);
        return c.json({ message: "Error registering user" }, { status: 500 });
    }

    return c.json({ message: "Signup" });
})


.post('/signin', async (c) => {

    const body = await c.req.parseBody();
    const { email, password, token } = body;

    const { success } = SigninSchema.safeParse({ email, password });
    
    if(!success) {
        return c.json({ message: "Invalid email or password" }) as Response;
    }

    return c.text('Signin Page');
})

.get('/blog', async (c) => {

})

.put('/blog', async (c) => {

})

.get('/blog/:id', async (c) => {

})



export default app;
