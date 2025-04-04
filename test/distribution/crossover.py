import random

def crossover(parent1, parent2):
    # Randomly select a crossover point
    crossover_point = random.randint(1, len(parent1) - 1)
    
    # Create two new offspring by swapping parts of the parents
    offspring1 = {faculty_id: [] for faculty_id in parent1}
    offspring2 = {faculty_id: [] for faculty_id in parent2}
    
    for faculty_id in parent1:
        if random.random() > 0.5:
            offspring1[faculty_id] = parent1[faculty_id][:crossover_point] + parent2[faculty_id][crossover_point:]
            offspring2[faculty_id] = parent2[faculty_id][:crossover_point] + parent1[faculty_id][crossover_point:]
        else:
            offspring1[faculty_id] = parent1[faculty_id]
            offspring2[faculty_id] = parent2[faculty_id]
    
    return offspring1, offspring2
