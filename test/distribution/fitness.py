from facultydata import faculties
from coursedata import courses

def calculate_max_sessions(faculty_rank):
    # Define the ratios
    rank_ratios = {1: 4, 2: 5, 3: 6, 4: 7}

    # Calculate total available sessions considering batches
    total_sessions = sum(
        course["sessionsPerWeek"] * (len(course["batches"]) if course["batches"] else 1) 
        for course in courses
    )
    
    # Calculate total weight based on present ranks
    total_weight = sum(rank_ratios[faculty['rank']] for faculty in faculties)

    # Assign session limits based on weighted proportion
    max_sessions = {
        faculty['facultyId']: round((rank_ratios[faculty['rank']] / total_weight) * total_sessions)
        for faculty in faculties
    }

    return max_sessions  # Dictionary mapping facultyId to max sessions
    


def fitness(individual, faculties, courses):
    fitness_score = 0
    for faculty in faculties:
        total_sessions = sum(course['sessionsPerWeek']*len(course['batches']) for course in individual[faculty['facultyId']])
        # Penalty for exceeding workload
        if total_sessions > calculate_max_sessions(faculty['rank']):
            fitness_score -= (total_sessions - calculate_max_sessions(faculty['rank'])) * 2  # Heavier penalty
        
        # Reward for faculty preference
        preferred_courses = set(faculty['preferredCourses'])
        assigned_courses = set(course['courseId'] for course in individual[faculty['facultyId']])
        fitness_score += len(preferred_courses.intersection(assigned_courses)) * 10  # Reward for preferred courses

    # Check if all courses are assigned
    assigned_courses = set(course['courseId'] for fac_courses in individual.values() for course in fac_courses)
    if len(assigned_courses) == len(courses):
        fitness_score += 100  # Reward for assigning all courses

    return fitness_score
