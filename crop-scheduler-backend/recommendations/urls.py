from django.urls import path

from .views import ProblemViewSet


problem_solution = ProblemViewSet.as_view({"get": "solution"})

urlpatterns = [
    path("problems/<int:pk>/solution/", problem_solution, name="problem-solution"),
]
