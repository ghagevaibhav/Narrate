import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

// Middleware for authentication
blogRouter.use("/*", async (c, next) => {
    try {
        console.log('Entering authentication middleware');
        const jwt = c.req.header('Authorization');

        if (!jwt) {
            console.error('No authorization token provided');
            c.status(401);
            return c.json({ error: "No authorization token provided" });
        }

        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET);

        if (!payload || !payload.id) {
            console.error('Invalid authorization token or missing user ID in payload');
            c.status(401);
            return c.json({ error: "Invalid authorization token" });
        }

        c.set('userId', payload.id as string);
        console.log('User authenticated:', payload.id);

        // Pass control to the next route/middleware
        await next();
    } catch (error) {
        console.error('Authentication middleware error:', error);
        c.status(401);
        return c.json({
            error: "Authentication failed",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});


// Create a new blog post
blogRouter.post('/createBlog', async (c) => {
    try {
        console.log('Inside blog post creation route');
        const userId = c.get('userId');
        console.log('User ID:', userId);

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        console.log('Request body:', body);

        // Validate input
        if (!body.title || !body.content) {
            c.status(400);
            return c.json({ error: "Title and content are required" });
        }

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });

        return c.json({
            message: 'Post created successfully',
            id: post.id
        });
    } catch (error) {
        console.error('Error in post creation route:', error);
        c.status(500);
        return c.json({
            error: 'Failed to create post',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Update an existing blog post
blogRouter.put('/updateBlog', async (c) => {
    try {
        const userId = c.get('userId');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        // Validate input
        if (!body.id || !body.title || !body.content) {
            c.status(400);
            return c.json({ error: "Post ID, title, and content are required" });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error('Error in post update route:', error);
        c.status(500);
        return c.json({
            error: 'Failed to update post',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get all posts (optional route)
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return c.json({posts: posts});
    } catch (error) {
        console.error('Error in get all posts route:', error);
        c.status(500);
        return c.json({
            error: 'Failed to retrieve posts',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get a specific blog post by ID
blogRouter.get('/:id', async (c) => {
    try {
        console.log('Inside get blog route');
        const id = c.req.param('id');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const post = await prisma.post.findFirst({
            where: {
                id: id
             },
             select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        username: true
                    }
                }
             }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: 'Post not found' });
        }

        return c.json(post);
    } catch (error) {
        console.error('Error in get post route:', error);
        c.status(500);
        return c.json({
            error: 'Failed to retrieve post',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});