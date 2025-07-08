# Step 1 Output Specification

## Structure
```json
{
  "courses": [
    {
      // Original fields...,
      "assigned_faculty": "FAC001"  // If batches=1
    },
    {
      // Original fields...,
      "batch_faculty": [{"batch": "A", "faculty_id": "FAC002"}]  // If batches>1
    }
  ],
  "faculty_workloads": {
    "FAC001": {
      "total_hours": 12,
      "courses": ["BTITC301"]
    }
  }
}
```

## Rules
1. **Assignments**:  
   - `batches=1` → Requires `assigned_faculty`  
   - `batches>1` → Requires `batch_faculty` array  

2. **Workloads**:  
   - `total_hours` = Σ(session hours × assigned batches)  
   - `courses` = List of unique assigned course IDs  