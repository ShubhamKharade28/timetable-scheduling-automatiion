import random

def select_parents(population, fitness_values):
    total_fitness = sum(fitness_values)
    selection_probabilities = [fitness / total_fitness for fitness in fitness_values]
    
    # Select two individuals based on fitness probability
    parent1, parent2 = random.choices(population, weights=selection_probabilities, k=2)
    
    return parent1, parent2
