# Workload Distribution & Timetable Scheduling

## Input Data Specification

**Status:** Ready  
**Format:** JSON  

---

### 1. Course Data (`courses.json`)
Required fields for each course:
```json
{
  "id": "BTITC301",               // Unique course ID (required)
  "name": "Engineering Mathematics III",
  "semester": 3,                  // 3, 5, or 7
  "type": "lecture",              // lecture/LAB/Tutorial/Others
  "sessions": 3,                  // Weekly classes (minimum 1)
  "batches": 1,                   // 1=combined, >1=parallel
  "elective": null                // null=core, "EM1"=elective
}
```

**Validation Rules:**
- `id` must be unique
- `type` must be from: lecture, LAB, Tutorial, Others
- `elective` must be null (core) or like "EM1" (elective)

---

### 2. Faculty Data (`faculty.json`)
Required fields for each faculty member:
```json
{
  "id": "FAC001",                 // Unique faculty ID
  "name": "Dr. S. M. Jadhav",
  "workload_factor": 1,           // 1 (High) to 4 (Low)
  "preferred_courses": ["BTITC505"], // Favorite course IDs
  "preferred_timeslot": "morning" // morning/afternoon/none
}
```

**Validation Rules:**
- `workload_factor`: 1 (HoD) to 4 (Ad-hoc)
- `preferred_timeslot`: must be morning/afternoon/none

---

### 3. Workload Priority Levels
| Level | Role        | Priority | 
|-------|-------------|----------|
| 1     | HoD         | High     |
| 2     | Senior Prof | Medium   | 
| 3     | Junior Prof | Low      | 
| 4     | Ad-hoc      | Fill     | 

less level = high priority = less workload

---



### 4. Example Data
**Core Course Example:**
```json
{
  "id": "BTITOOP304",
  "name": "OOP with C++ Lab",
  "semester": 3,
  "type": "LAB",
  "sessions": 1,
  "batches": 3,
  "elective": null
}
```

**Faculty Example:**
```json
{
  "id": "FAC003",
  "name": "Prof. S. K. Thakur",
  "workload_factor": 3,
  "preferred_courses": ["BTITC306"],
  "preferred_timeslot": "afternoon"
}
```
