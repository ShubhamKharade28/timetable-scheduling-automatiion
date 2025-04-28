from distribution.distribution import distribute_workload

from data.coursedata import courses
from data.facultydata import faculties

from utils.json_utils import save_to_json
from utils.output_format_utils import format_faculty_course_names, format_faculty_course_ids

def main():
    # Set your test configuration
    num_generations = 50
    initial_population_size = 40
    final_population_size = 5
    mutation_rate = 0.1

    print("Starting workload distribution using Genetic Algorithm...\n")
    
    final_population = distribute_workload(
        courses=courses,
        faculties=faculties,
        num_generations=num_generations,
        population_size=initial_population_size,
        final_population_size=final_population_size,
        mutation_rate=mutation_rate
    )

    # Optionally print the best individual from final population
    print("\nFinal best individual (workload assignment):")
    from distribution.fitness import fitness
    best_individual = max(final_population, key=lambda ind: fitness(ind, faculties, courses))
    
    # Name format output
    faculty_info = {f["facultyId"]: f["name"] for f in faculties}

    name_format_distribution = format_faculty_course_names(best_individual, faculty_info)
    save_to_json(name_format_distribution, "outputs/workload-distribution[name-format].json")

    # Output required for schedulling algorithm
    id_format_distribution = format_faculty_course_ids(best_individual)
    save_to_json(id_format_distribution, "outputs/workload-distribution[id-format].json")



if __name__ == "__main__":
    main()
