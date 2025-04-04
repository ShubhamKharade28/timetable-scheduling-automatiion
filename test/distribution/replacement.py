def replacement(population, offspring, fitness_values):
    # Sort the population by fitness and keep the best
    sorted_population = [x for _, x in sorted(zip(fitness_values, population), reverse=True)]
    sorted_offspring = [x for _, x in sorted(zip(fitness_values, offspring), reverse=True)]
    
    # Replace the least fit individuals
    population[:len(offspring)] = sorted_offspring
    
    return population
