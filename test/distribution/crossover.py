import random

def crossover(parent1, parent2):    
    # Create two new offspring by swapping parts of the parents
    offspring1 = {faculty_id: [] for faculty_id in parent1}
    offspring2 = {faculty_id: [] for faculty_id in parent2}

    for faculty_id in parent1:
        parent1_courses = parent1[faculty_id]
        parent2_courses = parent2[faculty_id]

        # Choose crossover point safely (between 1 and min length - 1)
        min_len = min(len(parent1_courses), len(parent2_courses))
        if min_len > 1 and random.random() > 0.5:
            crossover_point = random.randint(1, min_len-1)

            offspring1[faculty_id] = parent1_courses[:crossover_point] + parent2_courses[crossover_point:]
            offspring2[faculty_id] = parent2_courses[:crossover_point] + parent1_courses[crossover_point:]
        else:
            # If too short to crossover or skipped by chance
            offspring1[faculty_id] = parent1_courses[:]
            offspring2[faculty_id] = parent2_courses[:]

    
    return offspring1, offspring2
