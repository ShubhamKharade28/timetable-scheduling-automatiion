def format_faculty_course_names(data, faculty_info):
    from collections import defaultdict

    clean_data = defaultdict(list)

    for faculty_id, courses in data.items():
        faculty_name = faculty_info.get(faculty_id)
        if not faculty_name:
            continue  # Skip if faculty_id not found

        for course in courses:
            if not isinstance(course, dict):
                continue
            if 'courseName' not in course:
                continue

            course_name = course['courseName']
            if course_name not in clean_data[faculty_name]:
                clean_data[faculty_name].append(course_name)

    return dict(clean_data)

def format_faculty_course_ids(data):
    from collections import defaultdict

    clean_data = defaultdict(list)

    for faculty_id, courses in data.items():
        for course in courses:
            if not isinstance(course, dict):
                continue
            if 'courseId' not in course:
                continue

            course_id = course['courseId']
            if course_id not in clean_data[faculty_id]:
                clean_data[faculty_id].append(course_id)

    return dict(clean_data)
