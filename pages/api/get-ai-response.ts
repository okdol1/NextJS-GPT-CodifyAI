import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `# Write a ${req.query.type} in ${req.query.language} that ${req.query.content}`,
    temperature: 0,
    max_tokens: 100,
  });

  res.status(200).json(response.data);
}
