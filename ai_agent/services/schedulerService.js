// services/schedulerService.js
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { model } from '../langchain_config.js';
import { TIMETABLE_SCHEDULING_PROMPT } from '../prompts/timetableScheduler.js';

import fs from 'fs';

export async function generateTimetable(courses, faculties, workloadDistribution) {
    const timetableSchedulingPrompt = ChatPromptTemplate.fromTemplate(TIMETABLE_SCHEDULING_PROMPT);
    
    const logPrompt = async (data) => {
        fs.writeFileSync(
            './logs/prompt.json',
            typeof data === 'string' ? data : JSON.stringify(data, null, 2),
            'utf-8'
        );
        return data;
    }

    const logResponse = async (data) => {
        fs.writeFileSync(
            './model_response.log',
            typeof data === 'string' ? data : data.content,
            'utf-8'
        );
        return data;
    }

    const runnableChain = RunnableSequence.from([
        timetableSchedulingPrompt,
        logPrompt,
        model,
        logResponse,
        new JsonOutputParser(),
    ]);

    try {
        const result = await runnableChain.invoke({
            courses: JSON.stringify(courses),
            faculties: JSON.stringify(faculties),
            workloadDistribution: JSON.stringify(workloadDistribution),
        });

        return result;
    }
    catch(error) {
        console.log('Failed to generate timetable!');
        throw error;
    }
}