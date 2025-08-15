
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

const data = {
  "Mathematics": {
    "Number & Algebra": [
      "Integers",
      "Fractions and Decimals",
      "Percentages",
      "Ratios and Proportion",
      "Linear Equations",
      "Patterns and Sequences"
    ],
    "Geometry & Measurement": [
      "2D Shapes",
      "3D Solids",
      "Transformations",
      "Perimeter and Area",
      "Surface Area and Volume",
      "Units and Conversions",
      "Time and Temperature"
    ],
    "Statistics & Probability": [
      "Collecting Data",
      "Graphs",
      "Central Tendency",
      "Range and Spread",
      "Simple Probability",
      "Compound Events"
    ]
  },
  "Science": {
    "Nature of Science": [
      "Investigations",
      "Fair Testing",
      "Data Analysis"
    ],
    "Living World": [
      "Cells",
      "Body Systems",
      "Adaptations",
      "Food Webs"
    ],
    "Physical World": [
      "Forces and Motion",
      "Energy",
      "Light and Sound",
      "Waves"
    ],
    "Material World": [
      "Atoms and Molecules",
      "States of Matter",
      "Acids and Bases",
      "Simple Reactions"
    ],
    "Planet Earth & Beyond": [
      "Weather and Climate",
      "Water Cycle",
      "Plate Tectonics",
      "Earthquakes and Volcanoes",
      "Solar System"
    ]
  },
  "English": {
    "Reading": [
      "Fiction Comprehension",
      "Non-fiction Comprehension",
      "Poetry Devices",
      "Theme and Main Idea"
    ],
    "Writing": [
      "Narrative Writing",
      "Persuasive Writing",
      "Report Writing",
      "Descriptive Writing",
      "Editing and Proofreading"
    ],
    "Speaking & Listening": [
      "Oral Presentations",
      "Group Discussion",
      "Listening Skills"
    ],
    "Language Features": [
      "Grammar",
      "Punctuation",
      "Sentence Structure",
      "Figurative Language",
      "Vocabulary"
    ]
  }
}

async function ensureUser(email, role, name, password) {
  const hash = await bcrypt.hash(password, 10)
  return prisma.user.upsert({
    where: { email },
    update: { role, name, passwordHash: hash },
    create: { email, role, name, passwordHash: hash }
  })
}

async function run() {
  // Users
  const admin = await ensureUser('admin@example.com', 'ADMIN', 'Admin', 'Admin@123')
  const teacher = await ensureUser('teacher@example.com', 'TEACHER', 'Teacher', 'Teacher@123')
  const student = await ensureUser('student@example.com', 'STUDENT', 'Student', 'Student@123')

  // Subjects/topics/lessons/worksheets
  for (const [subjectName, strands] of Object.entries(data)) {
    const subject = await prisma.subject.upsert({
      where: { name: subjectName },
      update: {},
      create: { name: subjectName }
    })
    for (const [strand, topics] of Object.entries(strands)) {
      for (const topic of topics) {
        const topicRec = await prisma.topic.create({
          data: { name: `${strand}: ${topic}`, subjectId: subject.id }
        })
        await prisma.lesson.create({
          data: {
            title: `${topic} — Lesson 1`,
            content: { blocks: [{ type: 'text', content: `Overview of ${topic} for Year 8.` }] },
            topicId: topicRec.id
          }
        })
        await prisma.worksheet.create({
          data: { title: `${topic} Worksheet`, topicId: topicRec.id, items: { create: [] } }
        })
      }
    }
  }

  console.log('Seed complete with admin/teacher/student accounts.')
}

run().finally(()=>prisma.$disconnect())
