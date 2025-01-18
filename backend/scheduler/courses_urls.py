from django.urls import path
from scheduler.views.courses import get_all_courses, submit_courses

urlpatterns = [
    path('getall/', get_all_courses, name='get_all_courses'),
    path('submit/', submit_courses, name='submit_courses'),
]
