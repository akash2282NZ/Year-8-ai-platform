import fetch from 'node-fetch'

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3'

export async function tutorHint({ prompt }) {
  const key = process.env.HUGGINGFACE_API_KEY
  if (!key) return { text: 'AI not configured. Add HUGGINGFACE_API_KEY on Railway.' }
  const res = await fetch(HF_API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
  })
  if (!res.ok) {
    return { text: `HF error ${res.status}` }
  }
  const data = await res.json()
  const text = Array.isArray(data) ? (data[0]?.generated_text || JSON.stringify(data[0])) : (data?.generated_text || JSON.stringify(data))
  return { text }
}