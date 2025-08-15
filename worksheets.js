import { Router } from 'express'
import { prisma } from '../index.js'
import { requireAuth } from '../middleware/auth.js'
const router = Router()

router.get('/topic/:topicId', requireAuth, async (req, res) => {
  const { topicId } = req.params
  const ws = await prisma.worksheet.findMany({ where: { topicId } })
  res.json(ws)
})

router.post('/submit', requireAuth, async (req, res) => {
  const { userId, topicId, answers } = req.body
  const correct = answers.filter(a => a.correct).length
  const accuracy = answers.length ? correct / answers.length : 0
  let record = await prisma.studentProgress.findFirst({ where: { userId, topicId } })
  const delta = accuracy >= 0.8 ? 1 : (accuracy < 0.5 ? -1 : 0)
  const newLevel = Math.max(1, Math.min(4, (record?.difficultyLevel || 1) + delta))
  if (record) {
    record = await prisma.studentProgress.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 }, accuracy, difficultyLevel: newLevel }
    })
  } else {
    record = await prisma.studentProgress.create({
      data: { userId, topicId, attempts: 1, accuracy, difficultyLevel: newLevel }
    })
  }
  res.json({ accuracy, nextDifficulty: newLevel })
})

export default router