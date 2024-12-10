import { Hono } from "hono";
import blogs from './blogs'

const app = new Hono();


app.route('/api/v1', blogs)

export default app;