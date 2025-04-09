from distribution.distribution import distribute_workload
from coursedata import courses
from facultydata import faculties

def save_to_json(data, filename="output.json"):
    import json

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)


def clean_faculty_courses(data, faculty_info):
    from collections import defaultdict

    clean_data = defaultdict(list)

    for faculty_id, courses in data.items():
        faculty_name = faculty_info.get(faculty_id)
        if not faculty_name:
            continue  # Skip if faculty_id not found

        for course in courses:
            if not isinstance(course, dict):
                continue
            if 'courseName' not in course:
                continue

            course_name = course['courseName']
            if course_name not in clean_data[faculty_name]:
                clean_data[faculty_name].append(course_name)

    return dict(clean_data)

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
    
    # Output preprocessing
    faculty_info = {f["facultyId"]: f["name"] for f in faculties}
    output = clean_faculty_courses(best_individual, faculty_info)
    save_to_json(output, "workload-distribution-output.json")

if __name__ == "__main__":
    main()
