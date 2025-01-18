from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def calculate_workload(request):
    # Logic to calculate workload
    return JsonResponse({'message': 'Workload calculated'})