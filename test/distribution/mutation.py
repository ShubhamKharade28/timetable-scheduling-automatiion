import random

def mutate(individual, faculties, courses, mutation_rate=0.1):
    if random.random() < mutation_rate:
        # Randomly select a course to mutate
        course_to_mutate = random.choice(courses)
        course_id = course_to_mutate['courseId']
        current_faculty = next(
            faculty for faculty in faculties 
            if course_id in [c['courseId'] for c in individual[faculty['facultyId']]]
        )

        
        # Randomly assign to a new faculty
        new_faculty = random.choice(faculties)
        while new_faculty == current_faculty:
            new_faculty = random.choice(faculties)
        
        # Remove course from current faculty and add it to the new faculty
        individual[current_faculty['facultyId']].remove(course_to_mutate)
        individual[new_faculty['facultyId']].append(course_to_mutate)

    return individual
