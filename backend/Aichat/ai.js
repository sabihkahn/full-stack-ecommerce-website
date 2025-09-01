import dotenv from 'dotenv';    
dotenv.config()
import { GoogleGenAI } from "@google/genai";
const key =  process.env.GOOGLE_API_KEY
console.log("this is key",key)
const ai = new GoogleGenAI({apiKey:key});

async function Ai(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    systemInstruction: {
      role: "system",
      parts: [{ text: "You are an e-commerce product expert give response which look good and more short as possible" }],
    },
    contents: [
      { 
        role: "user",
        parts: [{ text: prompt+"please give response in small and plain english not any other characterr like / ** /n i want just text with space and all it is not formating" }],
      },
    ],
  });


  console.log(response);
  
  return response.candidates[0].content.parts[0].text
}

export default Ai
