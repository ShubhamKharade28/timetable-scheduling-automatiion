// prompts/timetableScheduler.js
export const TIMETABLE_SCHEDULING_PROMPT = `
Generate a weekly academic timetable with STRICT JSON format compliance:

INPUT DATA:
1. Workload Distribution: {workloadDistribution}
2. Faculty Details: {faculties} 
3. Course Catalog: {courses}

REQUIRED OUTPUT STRUCTURE:
{{
  "metadata": {{
    "generated_at": "ISO8601_timestamp",
    "department": "Information Technology",
    "algorithm_version": "v1.0"
  }},
  "days": [
    {{
      "day": "Weekday",
      "slots": [
        {{
          "time": "HH:MM-HH:MM",
          "sessions": [
            {{
              "sem": 3|5|7,
              "course_id": "string",
              "name": "short name",
              "faculty_id": "FACXXX",
              "faculty_name": "string",
              "room": "string",
              "batch": "A|B|C|D|null"
            }}
          ]
        }}
      ]
    }}
  ]
}}

RULES:
1. METADATA:
   - generated_at: Current timestamp in ISO format
   - department: Always "Information Technology"
   - version: "v1.0"

2. SESSIONS:
   - Include semester (3,5,7) from course data
   - For LAB/Tutorial with batches>1: include batch (A,B,C,D)
   - Room naming:
     - Lectures: LH1, LH2,...
     - Labs: LAB1, LAB2,...
     - Tutorials: TR1, TR2,...

3. TIMESLOTS:
   - Morning: 10:00-11:00, 11:00-12:00, 12:00-1:00
   - Afternoon: 2:00-3:00, 3:00-4:00, 4:00-5:00
   - No faculty double-booking

4. Strict Rule:
    - The response should be valid json string (Otherwise JsonParser gives error)
    - Utilize the available data even if some part missing
    - Give for all slots of all days, 
    - You can add any extra comment at last about response as you want in "comment" field in json
`;

// Helper for ISO timestamp
export const currentISOString = () => new Date().toISOString();