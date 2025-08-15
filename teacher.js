import { Router } from 'express'
import { prisma } from '../index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
const router = Router()

router.get('/progress', requireAuth, requireRole(['TEACHER','ADMIN']), async (req, res) => {
  // simple aggregated view
  const rows = await prisma.studentProgress.findMany({ include: { topic: { include: { subject: true } }, user: true } })
  res.json(rows.map(r => ({
    student: r.user.name || r.user.email,
    subject: r.topic.subject.name,
    topic: r.topic.name,
    accuracy: r.accuracy,
    level: r.difficultyLevel
  })))
})

export default router