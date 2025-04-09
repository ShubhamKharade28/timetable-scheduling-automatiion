from .initialization import initialize_population
from .fitness import fitness
from .selection import select_parents
from .crossover import crossover
from .mutation import mutate
from .replacement import replacement


def distribute_workload(
    courses, 
    faculties, 
    num_generations=100, 
    population_size=50, 
    final_population_size=20, 
    mutation_rate=0.1
):
    population = initialize_population(population_size, courses, faculties)
    initial_population_size = population_size

    for generation in range(num_generations):
        # Dynamically calculate target population size for this generation
        target_population_size = round(
            initial_population_size - (generation / (num_generations - 1)) * (initial_population_size - final_population_size)
        )

        fitness_values = [fitness(individual, faculties, courses) for individual in population]
        new_population = []

        # Generate offspring (half of current target population)
        for _ in range(target_population_size // 2):
            parent1, parent2 = select_parents(population, fitness_values)
            offspring1, offspring2 = crossover(parent1, parent2)
            new_population.append(mutate(offspring1, faculties, courses, mutation_rate))
            new_population.append(mutate(offspring2, faculties, courses, mutation_rate))

        # Replace the old population with the new one using updated size
        population = replacement(
            population, new_population, fitness_values, faculties, courses, target_population_size
        )

        # Optional: print best fitness
        best_fitness = max(fitness_values)
        print(f"Generation {generation}: Best Fitness = {best_fitness}, Population Size = {len(population)}")

    return population
