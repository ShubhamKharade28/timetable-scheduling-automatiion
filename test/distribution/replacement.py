from .fitness import fitness

def replacement(population, offspring, fitness_values, faculties, courses, target_population_size):
    # Recalculate fitness for offspring
    offspring_fitness = [fitness(ind, faculties, courses) for ind in offspring]
    
    # Combine population and offspring
    combined = population + offspring
    combined_fitness = fitness_values + offspring_fitness

    # Sort combined list by fitness descending
    sorted_combined = [x for _, x in sorted(
        zip(combined_fitness, combined),
        key=lambda pair: pair[0],  # Sort by fitness value only
        reverse=True
    )]

    # Return top individuals up to the target population size
    return sorted_combined[:target_population_size]
