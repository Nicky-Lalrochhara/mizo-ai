import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "I hriat theih angin Mizo tawng chauh hmangin chhang ve rawh. Mihringin Mizo tawng a sawi ang khan chhang ve rawh. English ngei ngei emaw tawng dang a awm chuan, Mizo tawngin a awmze neia lehlin rawh."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content || "Ka hre lo. Hmalamah hman leh rawh.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: "Hmanlai ah harsatna a awm e. Hmalamah hman leh rawh." });
  }
}