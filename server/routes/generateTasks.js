import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

// Initialize Gemini (Google Generative AI)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateTasksFromMedicines(medicines) {
const prompt = `
You are a safe and helpful medical-assistant AI. 
Create a simple, general wellness plan based ONLY on the provided medications. 
Do NOT diagnose, do NOT provide medical decisions, and avoid giving unsafe or risky instructions.

Generate a maximum of **8 tasks** total.

Each task must be:
- General, safe, and suitable for all users  
- Related to medication timing, hydration, food timing, light exercise, sleep hygiene, or monitoring well-being  
- NOT medical advice, just simple reminders

Medications:
${JSON.stringify(medicines, null, 2)}

Your output must be ONLY a valid JSON array with up to 8 items:
[
  {
    "title": "",
    "description": "",
    "time": "",
    "type": "",
    "priority": ""
  }
]

Rules:
- No extra text
- No explanations
- No disclaimers
- Only JSON
`;


  const result = await model.generateContent(prompt);

  // Try several patterns depending on library response shape
  let text = null;
  try {
    if (result && typeof result === 'string') {
      text = result;
    } else if (result?.response && typeof result.response.text === 'function') {
      text = await result.response.text();
    } else if (result?.output && typeof result.output === 'string') {
      text = result.output;
    } else if (Array.isArray(result?.output)) {
      text = result.output.map(o => o.text || o).join('\n');
    } else if (result?.text) {
      text = result.text;
    }
  } catch (e) {
    console.error('Error extracting text from AI result', e);
  }

  // Fallback: stringify whole result
  if (!text) text = JSON.stringify(result);

  // Try to parse JSON from text
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (parsed.tasks && Array.isArray(parsed.tasks)) return parsed.tasks;
  } catch (e) {
    // continue to try to extract JSON-like substring
  }

  // Attempt to find first JSON array in text
  const match = text.match(/\[\s*\{[\s\S]*\}\s*\]/m);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // ignore
    }
  }

  // As a last resort, return a single task with the raw text
  return [
    {
      title: 'AI Response',
      description: text.slice(0, 2000),
      time: '',
      type: 'note',
      priority: 'low'
    }
  ];
}

// Primary endpoint used by frontend
router.post('/tasks', async (req, res) => {
  try {
    // Support either { medicines: [...] } or single-medicine form
    let medicines = req.body?.medicines;
    if (!medicines) {
      // Try to build from single-medication form fields
      const { medicationName, dosage, timesPerDay, specialNotes } = req.body || {};
      if (medicationName) {
        medicines = [
          { medicationName, dosage, timesPerDay, specialNotes }
        ];
      }
    }

    if (!medicines || medicines.length === 0) {
      return res.status(400).json({ error: 'No medicines provided' });
    }

    const tasks = await generateTasksFromMedicines(medicines);

    return res.json(tasks);
  } catch (error) {
    console.error('Error /tasks:', error);
    return res.status(500).json({ error: 'AI task generation failed' });
  }
});

// Keep the older generate-tasks route as an alias
router.post('/generate-tasks', async (req, res) => {
  try {
    const medicines = req.body?.medicines;
    if (!medicines || medicines.length === 0) {
      return res.status(400).json({ error: 'No medicines provided' });
    }
    const tasks = await generateTasksFromMedicines(medicines);
    return res.json(tasks);
  } catch (error) {
    console.error('Error /generate-tasks:', error);
    return res.status(500).json({ error: 'AI task generation failed' });
  }
});


router.get('/daily-motivation', async (req, res) => {
  try {
    const prompt = `
      You are a friendly health coach AI.
      Generate a short, motivating message (1 sentence) for a user to encourage them
      to follow their health plan, take medications on time, drink water, exercise, and sleep well.
      Make it positive, uplifting, and personalized for someone who wants to stay healthy today.
    `;

    const result = await model.generateContent(prompt);

    // Extract the text properly
    const motivation =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Stay healthy and keep going! 💪";

    return res.json({ motivation });
  } catch (err) {
    console.error("Error /daily-motivation:", err);
    res.status(500).json({ error: "Failed to generate daily motivation" });
  }
});



// Simple AI chat endpoint for free-text assistance from frontend
router.post('/ai', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'No message provided' });

    const prompt = `
You are a safe, helpful medical wellness assistant. Your ONLY job is to answer 
basic health, wellness, medication reminders, lifestyle tips, mental health 
support, and general healthy-living questions.

If the user's message is NOT related to:
- health or wellness
- medication reminders
- healthy habits
- sleep
- diet and nutrition
- exercise
- mental well-being
- hydration
- symptom understanding (non-diagnostic)

Then reply EXACTLY with this default message:

"I'm here only for health and wellness guidance. Please ask me something related to your well-being. 💙"

Rules:
- Do NOT give medical diagnosis.
- Do NOT recommend prescription medication.
- Keep all answers short, friendly, and easy to understand.
- Focus on safety and encouragement.

User message: "${message}"
`;


    const result = await model.generateContent(prompt);

    let text = null;
    try {
      if (result && typeof result === 'string') {
        text = result;
      } else if (result?.response && typeof result.response.text === 'function') {
        text = await result.response.text();
      } else if (result?.output && typeof result.output === 'string') {
        text = result.output;
      } else if (Array.isArray(result?.output)) {
        text = result.output.map(o => o.text || o).join('\n');
      } else if (result?.text) {
        text = result.text;
      }
    } catch (e) {
      console.error('Error extracting text from AI result (ai)', e);
    }

    if (!text) text = JSON.stringify(result);

    // Return as plain text reply
    return res.json({ reply: text });
  } catch (error) {
    console.error('Error /ai:', error);
    return res.status(500).json({ error: 'AI chat failed' });
  }
});

export default router;
