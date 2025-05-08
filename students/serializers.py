from rest_framework import serializers
from .models import CustomUser, StudentProfile, TeacherProfile, careerinfo
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
# 
# serializers.py
from rest_framework import serializers
from .models import Syllabus, Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class SyllabusSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = Syllabus
        fields = ['id', 'course', 'course_name', 'title', 'description', 'file', 'created_at']

# 

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher
        token['is_admin'] = user.is_admin

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Block superuser login through this API
        if self.user.is_superuser:
            raise serializers.ValidationError("Superuser login is not allowed here.")

        return data




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_student', 'is_teacher', 'is_admin']

class RegisterStudentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = StudentProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data, is_student=True)
        return StudentProfile.objects.create(user=user, **validated_data)

class RegisterTeacherSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = TeacherProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data, is_teacher=True)
        return TeacherProfile.objects.create(user=user, **validated_data)

class careerinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = careerinfo
        fields = '__all__'
