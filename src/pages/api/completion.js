import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const {
    currentJob,
    desiredJob,
    experience,
    firstDescription,
    secondDescription,
    thirdDescription,
  } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `I am a ${currentJob} and I am looking for a job as a ${desiredJob}. 
        I have ${experience} years of experience in my field.
        Can you write me an authentic cover letter based on this information. 
        I would describe myself as ${firstDescription}, ${secondDescription} and ${thirdDescription}`,
      },
    ],
  });

  const response = completion.data.choices[0].message.content.trim();

  res.status(200).send({
    message: response,
  });
}
