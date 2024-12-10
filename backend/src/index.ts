import { Hono } from 'hono'
import router from './routes/main'
const app = new Hono()

app.route('/', router)

export default app
