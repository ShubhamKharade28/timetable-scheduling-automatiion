# Step 1 Output Specification

## Structure
```json
{
  "metadata": {
    "generated_at": "2024-06-20T14:30:00Z",
    "department": "Information Technology",
  }
  "assignments": [
    { 
      "course_id": "X", 
      "faculty_id": "Y"
    }, // Non-batchable (e.g. Lectures)
    {
      "course_id": "Z", 
      "batch_assignments": [       
          {"batch": "A", "faculty_id": "Y"}
      ]
    } // Batchable (e.g. Labs)
  ],
  "faculty_summary": [
    {
      "faculty_id": "Y",
      "assigned_courses": ["X", "Z"],
      "total_workload": 5  // Sum of hours
    }
  ]
}
```

## Rules
1. **Non-batchable**:  
   - Requires `faculty_id`  
   - No `batch_assignments`  

2. **Batchable**:  
   - Requires `batch_assignments` array  
   - Batches: `A`/`B`/`C`/`D`  

3. **Summary**:  
   - `total_workload` = Σ(sessions × duration) per course  
   - `assigned_courses`: Unique course IDs  