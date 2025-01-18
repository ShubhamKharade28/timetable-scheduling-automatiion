from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def get_all_courses(request):
    # Logic to get all courses
    return JsonResponse({'message': 'List of all courses'})
