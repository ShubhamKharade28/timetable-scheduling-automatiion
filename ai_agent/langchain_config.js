import { configDotenv } from "dotenv";
configDotenv();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const modelName = process.env.model_name;
const apiKey = process.env.api_key;
const projectName = process.env.project_name;

const model = new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey: apiKey,
    project: projectName,
    temperature: 0.7,
});

export {
    model,
}