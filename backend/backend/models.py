from django.db import models
import json

class Course(models.Model):
    sem = models.IntegerField()
    part_of_elective = models.CharField(max_length=255, blank=True, null=True)
    course_name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=50)  # lecture, lab, tutorial
    value = models.IntegerField()

    def __str__(self):
        return f"{self.course_name} ({self.code})"

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=10, unique=True)
    preferred_courses = models.JSONField(default=list)  # Store preferred courses as JSON

    def __str__(self):
        return self.name

    def get_preferred_courses(self):
        """Returns preferred courses as Python objects."""
        return json.loads(self.preferred_courses)
