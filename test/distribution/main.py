
from initialization import initialize_population
from fitness import fitness
from selection import select_parents
from crossover import crossover
from mutation import mutate
from replacement import replacement

def distribute_workload(courses, faculties, num_generations=100, num_individuals=50, mutation_rate=0.1):
    population = initialize_population(num_individuals, courses, faculties)
    
    for generation in range(num_generations):
        fitness_values = [fitness(individual, faculties, courses) for individual in population]
        
        new_population = []
        
        # Generate offspring
        for _ in range(num_individuals // 2):  # Create pairs of parents
            parent1, parent2 = select_parents(population, fitness_values)
            offspring1, offspring2 = crossover(parent1, parent2)
            new_population.append(mutate(offspring1, faculties, courses, mutation_rate))
            new_population.append(mutate(offspring2, faculties, courses, mutation_rate))
        
        # Replace the old population with the new one
        population = replacement(population, new_population, fitness_values)
        
        # Optional: Print the best fitness value of this generation
        best_fitness = max(fitness_values)
        print(f"Generation {generation}: Best Fitness = {best_fitness}")
    
    return population
