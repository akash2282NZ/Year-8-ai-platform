import { Router } from 'express'
import { tutorHint } from '../utils/hfClient.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/hint', requireAuth, async (req, res) => {
  const { topic, question, studentAnswer, difficultyLevel=1 } = req.body
  const prompt = `You are a friendly NZ Year 8 tutor. Topic: ${topic}. Difficulty: ${difficultyLevel}.
Question: ${question}
Student answer: ${studentAnswer}
Give a small hint first. If asked again, give a worked example. Keep it concise.`
  const out = await tutorHint({ prompt })
  res.json(out)
})

export default router