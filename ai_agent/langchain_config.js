
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const googleModelName = "models/gemini-1.5-flash";
const googleApiKey = "AIzaSyANSSJpRrgB2V30cfT16fIfyCTjci9F-rc";

const model = new ChatGoogleGenerativeAI({
    model: googleModelName,
    apiKey: googleApiKey,
    temperature: 0.3, // focused, factual <----> creative, diversed [0,1]
    maxRetries: 2,
});

export {
    model,
}