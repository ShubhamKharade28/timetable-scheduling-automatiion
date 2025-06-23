import random

def initialize_population(num_individuals, courses, faculties):
    population = []
    for _ in range(num_individuals):
        individual = {faculty['facultyId']: [] for faculty in faculties}
        
        # Shuffle courses to randomize assignment
        shuffled_courses = courses.copy()
        random.shuffle(shuffled_courses)

        for course in shuffled_courses:
            # Select a random faculty (who is eligible)
            eligible_faculties = [faculty for faculty in faculties if course['courseId'] in faculty['preferredCourses']]

            if not eligible_faculties: # if no preferred faculty, assign randomly
                assigned_faculty = random.choice(faculties)
            else:
                assigned_faculty = random.choice(eligible_faculties)
            
            individual[assigned_faculty['facultyId']].append(course)

        population.append(individual) # add the individual to population
    
    return population