
def calculate_hours_per_session(course):
    courseType =  course.get('type')
    if courseType == "lecture":
        return 1 
    elif courseType == "lab" or courseType == "tutorial":
        return 2 

    return 4

def fitness(individual, faculties, courses):
    def calculate_max_hours():
        rank_ratios = {1: 4, 2: 5, 3: 6, 4: 7}

        total_hours = sum(
            course["sessionsPerWeek"] * (len(course["batches"]) if course["batches"] else 1) * calculate_hours_per_session(course)
            for course in courses
        )

        total_weight = sum(rank_ratios[faculty['rank']] for faculty in faculties)

        max_hours = {
            faculty['facultyId']: round((rank_ratios[faculty['rank']] / total_weight) * total_hours)
            for faculty in faculties
        }
        
        return max_hours  # FacultyId -> max allowed hours

    max_hours = calculate_max_hours()

    fitness_score = 0
    for faculty in faculties:
        faculty_id = faculty['facultyId']
        total_hours = sum(
            course['sessionsPerWeek'] * (len(course['batches']) if course['batches'] else 1) * calculate_hours_per_session(course)
            for course in individual[faculty_id]
        )

        # Case 1: Penalty for exceeding workload
        if total_hours > max_hours[faculty_id]:
            overload = total_hours - max_hours[faculty_id]
            fitness_score -= overload * 1.5 
        else:
            underload = max_hours[faculty_id] - total_hours
            fitness_score += max(5 - (underload*0.5), 0) # Reward for staying close to max hours

        # Case 2: Faculty preferrence match
        preferred_courses = set(faculty['preferredCourses'])
        assigned_courses = set(course['courseId'] for course in individual[faculty_id])

        preferrence_match = len(preferred_courses.intersection(assigned_courses))
        fitness_score += preferrence_match * 10

    # Bonus if all courses are assigned
    assigned_courses = set(course['courseId'] for fac_courses in individual.values() for course in fac_courses)
    if len(assigned_courses) == len(courses):
        fitness_score += 100

    return fitness_score

