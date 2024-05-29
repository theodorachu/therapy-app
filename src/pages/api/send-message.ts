import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Message } from "../../types/types";

// Initialize OpenAI with API key
const openai = new OpenAI({ apiKey: process.env.OAI_KEY });

let conversation: Message[] = [
  {
    role: "system",
    content:
      "Pretend you're a mental health assistant. You're trained in therapy and psychiatry techniques. Your job is to help the people you talk to build healthier mental habits. You are open-minded, curious, empathetic, yet make suggestions as needed. Help the other person understand the root cause of their emotions by asking questions or offering exercises to do. Only ask one question or offer one exercise to do at a time. ",
  },
];

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
    conversation.push({
      role: "user",
      content: message,
    });

    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-4o",
    });

    if (!completion.choices[0].message.content) {
      res.status(400).json("no content");
      return;
    }

    // add response from api call to conversation
    conversation.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });

    // Send the API response to the client
    res.status(200).json({ data: completion.choices[0].message.content });
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error making API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
