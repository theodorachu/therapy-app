import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Make the API call
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
      ],
      model: "gpt-3.5-turbo",
    });

    // Send the API response to the client
    res.status(200).json(completion.choices[0]);
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error making API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}