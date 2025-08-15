import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import lessonsRouter from './routes/lessons.js'
import worksheetsRouter from './routes/worksheets.js'
import progressRouter from './routes/progress.js'
import tutorRouter from './routes/tutor.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import teacherRouter from './routes/teacher.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

export const prisma = new PrismaClient()

app.get('/health', (req,res)=>res.json({ ok: true }))

app.use('/auth', authRouter)
app.use('/lessons', lessonsRouter)
app.use('/worksheets', worksheetsRouter)
app.use('/progress', progressRouter)
app.use('/tutor', tutorRouter)
app.use('/admin', adminRouter)
app.use('/teacher', teacherRouter)

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`API listening on ${port}`))