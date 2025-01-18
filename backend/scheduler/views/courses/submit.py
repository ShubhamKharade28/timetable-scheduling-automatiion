from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["POST"])
def submit_courses(request):
    # Logic to submit a course
    return JsonResponse({'message': 'Course submitted'})
