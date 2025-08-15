import { Router } from 'express'
import { prisma } from '../index.js'
import { requireAuth } from '../middleware/auth.js'
const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const subjects = await prisma.subject.findMany({
    include: { topics: { include: { lessons: true } } }
  })
  res.json(subjects)
})

router.get('/topic/:topicId', requireAuth, async (req, res) => {
  const { topicId } = req.params
  const lessons = await prisma.lesson.findMany({ where: { topicId } })
  res.json(lessons)
})

export default router