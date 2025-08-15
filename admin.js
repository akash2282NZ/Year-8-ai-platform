import { Router } from 'express'
import { prisma } from '../index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
const router = Router()

// Create/update subjects/topics/lessons minimal CMS endpoints
router.post('/subject', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { name } = req.body
  const rec = await prisma.subject.create({ data: { name } }).catch(async () => {
    return prisma.subject.update({ where: { name }, data: {} })
  })
  res.json(rec)
})

router.post('/topic', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { name, subjectId } = req.body
  const rec = await prisma.topic.create({ data: { name, subjectId } })
  res.json(rec)
})

router.post('/lesson', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { title, content, topicId } = req.body
  const rec = await prisma.lesson.create({ data: { title, content, topicId } })
  res.json(rec)
})

router.get('/users', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const users = await prisma.user.findMany({ select: { id:true, email:true, role:true, name:true, createdAt:true } })
  res.json(users)
})

export default router