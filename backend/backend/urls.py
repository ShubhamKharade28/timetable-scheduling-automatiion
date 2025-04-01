from django.contrib import admin
from django.urls import path
from .views import submit_courses, submit_faculty, workload_distribution

urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/submit/', submit_courses, name='submit_courses'),
    path('faculty/submit/', submit_faculty, name='submit_faculty'),
    path('workload/', workload_distribution, name='workload_distribution'),
]
