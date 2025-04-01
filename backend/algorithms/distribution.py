
def distribution(courses, faculties):
    if not faculties:
        return "No faculties for distribution"
    
    faculty_count = len(faculties)
    faculty_workload = {faculty["name"]: [] for faculty in faculties}

    for i, course in enumerate(courses):
        assigned_faculty = faculties[i % faculty_count]["name"]
        faculty_workload[assigned_faculty].append(course)

    return faculty_workload