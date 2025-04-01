from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from os import path
from django.conf import settings
import json
from algorithms.distribution import distribution

DATA_DIR = os.path.join(settings.BASE_DIR, 'data')

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Submit Courses
@api_view(['POST'])
def submit_courses(request):
    course_data = request.data
    filename = "courses.json"
    filepath = os.path.join(DATA_DIR, filename)

    with open(filepath, 'w', encoding='utf-8') as json_file:
        json.dump(course_data, json_file, indent=4, ensure_ascii=False)

    return Response({"message": "Course data stored successfully", "file": filename})

# Submit Faculty
@api_view(['POST'])
def submit_faculty(request):
    faculty_data = request.data
    filename = "faculties.json"
    filepath = os.path.join(DATA_DIR, filename)

    with open(filepath, 'w', encoding='utf-8') as json_file:
        json.dump(faculty_data, json_file, indent=4, ensure_ascii=False)

    return Response({"message": "Faculty data stored successfully", "file": filename})


def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding='utf-8') as file:
            return json.load(file)
    return []

@api_view(['GET'])
def workload_distribution(request):
    courses = load_json("courses.json")['courseData']
    faculties = load_json("faculties.json")['facultyData']

    workload = distribution(courses,faculties)
    return Response({"workload_distribution": workload})

