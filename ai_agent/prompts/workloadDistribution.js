// prompts/workloadDistribution.js
export const WORKLOAD_DISTRIBUTION_PROMPT = `
You are an expert academic scheduler. Follow these STRICT RULES:

1. COURSE TYPE DURATIONS (CRITICAL):
   - LAB: 2 hours per session
   - Tutorial: 2 hours per session  
   - Lecture: 1 hour per session
   - Others: 1 hour per session

2. WORKLOAD CALCULATION:
   For each faculty, calculate:
   Total Workload = Σ(LAB sessions×2 + Tutorial sessions×2 + Other sessions×1)

3. WORKLOAD LIMITS BY PRIORITY:
   - workload_factor=1 (HOD): Max 10 hours
   - workload_factor=2 (Senior): 12-16 hours  
   - workload_factor=3 (Junior): 14-20 hours
   - Never exceed 20 hours for any faculty

4. STRICTER BATCH RULES:
  - No faculty handles >2 batches of the same course
  - Preferred faculty get first batch assignment
  - Underutilized faculty (<10hrs) get priority for extra batches

5. PREFERENCE HIERARCHY:
   1) Assign all preferred_courses first
   2) Respect preferred_timeslot when possible
   3) Balance workload within same priority level

6. REQUIRED OUTPUT:
   - Valid JSON matching exact schema
   - Accurate workload calculations
   - No duration violations
   - No faculty overloads

Courses: {courses}
Faculties: {faculties}

Return valid JSON matching this exact schema:
{{"assignments": [
    {{ "course_id": "X", "faculty_id": "Y" }},
    {{ 
      "course_id": "Z", 
      "batch_assignments": [
        {{"batch": "A", "faculty_id": "Y"}}
      ] 
    }}
  ],
  "faculty_summary": [
    {{"faculty_id": "Y", "assigned_courses": ["X", "Z"], "total_workload": 5}}
  ]
}}

Important:
- For batchable courses (batches > 1), include batch_assignments
- For non-batchable courses, assign directly to faculty_id
- Ensure the JSON is valid and matches the schema exactly
`;