import { Router } from 'express'
import { prisma } from '../index.js'
import { requireAuth } from '../middleware/auth.js'
const router = Router()

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.sub
  const data = await prisma.studentProgress.findMany({
    where: { userId },
    include: { topic: { include: { subject: true } } }
  })
  res.json(data)
})

router.get('/user/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params
  const data = await prisma.studentProgress.findMany({
    where: { userId },
    include: { topic: { include: { subject: true } } }
  })
  res.json(data)
})

export default router