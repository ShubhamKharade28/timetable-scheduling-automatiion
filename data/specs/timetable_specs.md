# Timetable Output Specification  
## Structure (`timetable.json`)

```json
{
  "metadata": {
    "generated_at": "ISO8601_timestamp",
    "department": "Department Name",  // e.g., "Information Technology"
    "algorithm_version": "semver"     // e.g., "v1.0"
  },
  "days": [
    {
      "day": "Weekday",              // e.g., "Monday"
      "slots": [
        {
          "time": "HH:MM-HH:MM",     // e.g., "9:00-10:00"
          "sessions": [
            {
              "sem": 3|5|7,          // Semester
              "course_id": "string",  // e.g., "BTITC301"
              "name": "short name",   // e.g., "Eng Math III"
              "faculty_id": "FACXXX",
              "faculty_name": "string",
              "room": "string",      // e.g., "LH101"
              "batch": "A|B|C|D"      // Only for LAB/Tutorial
            }
          ]
        }
      ]
    }
  ]
}
```

## Rules  
1. **Metadata**:  
   - `department` must match input data  
   - `generated_at` in ISO8601 format  

2. **Sessions**:  
   - `batch` required only if `batches > 1` in course data  
   - `room` must match course type (lecture hall vs lab)  

3. **Conflicts**:  
   - Empty array indicates successful scheduling  