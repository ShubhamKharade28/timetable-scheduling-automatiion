from django.urls import path
from views.faculty import get_all_faculty, submit_faculty

urlpatterns = [
    path('getall/', get_all_faculty, name='get_all_faculty'),
    path('submit/', submit_faculty, name='submit_faculty'),
]
