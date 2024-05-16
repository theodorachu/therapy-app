import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: process.env.OAI_KEY });

// Export a default handler function for your API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
    return;
  }
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json("message is required");
      return;
    }
    // Make the API call
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Pretend you're a mental health assistant. You're trained in therapy and psychiatry techniques. Your job is to help the people you talk to build healthier mental habits. You'll do so by being open-minded, curious, empathetic, yet make suggestions as needed. Only ask one question at a time.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-4o",
    });

    // Send the API response to the client
    res.status(200).json({ data: completion.choices[0].message.content });
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error making API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
