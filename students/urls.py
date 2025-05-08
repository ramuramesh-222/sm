from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentRegisterView,
    TeacherRegisterView,
    StudentViewSet,
    TeacherStudentCRUDView,
    AdminStudentView,
    AdminTeacherView,
    careerinfoView
)
# 
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SyllabusViewSet, CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'syllabus', SyllabusViewSet)


# 
router = DefaultRouter()
router.register(r'my-student', StudentViewSet, basename='my-student')
router.register(r'teacher-student', TeacherStudentCRUDView, basename='teacher-student')
router.register(r'admin-students', AdminStudentView, basename='admin-students')
router.register(r'admin-teachers', AdminTeacherView, basename='admin-teachers')
router.register(r'careerinfo', careerinfoView)

urlpatterns = [
    path('register/student/', StudentRegisterView.as_view()),
    path('register/teacher/', TeacherRegisterView.as_view()),
    path('', include(router.urls)),
]



# The corresponding URLs for your Django API endpoints will look like this:

# Student Registration:
# http://<your-domain>/register/student/

# Teacher Registration:
# http://<your-domain>/register/teacher/

# Student CRUD (for the logged-in student):
# http://<your-domain>/my-student/

# Teacher CRUD (for teachers managing students):
# http://<your-domain>/teacher-student/

# Admin CRUD for Students:
# http://<your-domain>/admin-students/

# Admin CRUD for Teachers:
# http://<your-domain>/admin-teachers/

# Career Info:
# http://<your-domain>/careerinfo/

# Make sure to replace <your-domain> with the actual domain or IP address where your Django application is hosted (e.g., http://localhost:8000 during local development).