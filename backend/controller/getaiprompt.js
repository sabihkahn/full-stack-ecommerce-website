import Ai from "../Aichat/ai.js";

export const getaiprompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await Ai(prompt); // wait for AI result
    res.status(200).send({
      message: "AI response",
      result: aiResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "cant get ai response" });
  }
};
