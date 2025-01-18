from django.urls import path
from views.workload import calculate_workload

urlpatterns = [
    path('', calculate_workload, name='calculate_workload'),
]
