from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def get_all_faculty(request):
    # Logic to get all faculty
    return JsonResponse({'message': 'List of all faculty'})
