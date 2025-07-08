// services/workloadService.js
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { model } from '../langchain_config.js';
import { WORKLOAD_DISTRIBUTION_PROMPT } from '../prompts/workloadDistribution.js';

export async function distributeWorkload(courses, faculties) {
    const workloadDistributionPrompt = ChatPromptTemplate.fromTemplate(WORKLOAD_DISTRIBUTION_PROMPT);
    const runnableChain = RunnableSequence.from([
        workloadDistributionPrompt,
        model,
        new JsonOutputParser(),
    ]);

    try {
        const result = await runnableChain.invoke({
            courses: JSON.stringify(courses),
            faculties: JSON.stringify(faculties)
        });

        return result;
    }
    catch(error) {
        console.log('Failed getting workload distribution data!');
        throw error;
    }
}