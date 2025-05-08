from rest_framework import generics, viewsets
from .models import CustomUser, StudentProfile, TeacherProfile, careerinfo
from .serializers import RegisterStudentSerializer, RegisterTeacherSerializer, careerinfoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
# 
from rest_framework import viewsets
from .models import Syllabus, Course
from .serializers import SyllabusSerializer, CourseSerializer
from rest_framework.permissions import IsAuthenticated

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class SyllabusViewSet(viewsets.ModelViewSet):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
    permission_classes = [IsAuthenticated]
# 




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Student Registration
class StudentRegisterView(generics.CreateAPIView):
    serializer_class = RegisterStudentSerializer

# Teacher Registration
class TeacherRegisterView(generics.CreateAPIView):
    serializer_class = RegisterTeacherSerializer

# CRUD views for Student
class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RegisterStudentSerializer

    def get_queryset(self):
        return StudentProfile.objects.filter(user=self.request.user)

# CRUD views for Teacher to manage students
class TeacherStudentCRUDView(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = RegisterStudentSerializer

    def get_queryset(self):
        if self.request.user.is_teacher:
            return self.queryset
        return StudentProfile.objects.none()

# Admin views to manage students and teachers
class AdminStudentView(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = RegisterStudentSerializer

class AdminTeacherView(viewsets.ModelViewSet):
    queryset = TeacherProfile.objects.all()
    serializer_class = RegisterTeacherSerializer

# Career Info View
class careerinfoView(viewsets.ModelViewSet):
    queryset = careerinfo.objects.all()
    serializer_class = careerinfoSerializer
