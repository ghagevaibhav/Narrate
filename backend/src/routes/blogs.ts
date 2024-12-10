import { Hono } from "hono";
import SignUpSchema from "../lib/schemas/signup";
import SigninSchema from "../lib/schemas/signin";

const app = new Hono()

.post("/signup", async (c) => {
    const body = await c.req.parseBody();
    const { email, password } = body;

    const { success } = SignUpSchema.safeParse({ email, password });

    if(!success) {
        return c.json({ message: "Invalid email or password" }, { status: 400 });
    }

    // Simulate database interaction
    try{
        // DB Call 
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
        return c.json({ message: "Invalid email or password" }, { status: 400 });
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
