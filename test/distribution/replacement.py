from fitness import fitness

def replacement(population, offspring, fitness_values, faculties, courses):
    # Recalculate fitness for offspring
    offspring_fitness = [fitness(ind, faculties, courses) for ind in offspring]

    # Sort population and offspring by their fitness
    sorted_population = [x for _, x in sorted(zip(fitness_values, population), reverse=True)]
    sorted_offspring = [x for _, x in sorted(zip(offspring_fitness, offspring), reverse=True)]
 
    # Replace the least fit individuals in the population
    sorted_population[-len(offspring):] = sorted_offspring

    return sorted_population