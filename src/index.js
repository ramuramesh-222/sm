import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

















// You said:
// i need ratio button in django and reactjs R,Reached N,Not Reached i have edit for react side click to change the reached 
// ChatGPT said:
// To implement a "Reached/Not Reached" ratio button (often called a toggle or segmented button) in your Django + ReactJS app, here's a step-by-step approach:

// 🔧 Backend (Django)
// Let’s assume you have a model like this in Django:

// python
// Copy
// Edit
// # models.py
// from django.db import models

// class Student(models.Model):
//     name = models.CharField(max_length=100)
//     STATUS_CHOICES = [
//         ('R', 'Reached'),
//         ('N', 'Not Reached'),
//     ]
//     status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='N')
// Serializer:
// python
// Copy
// Edit
// # serializers.py
// from rest_framework import serializers
// from .models import Student

// class StudentSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = Student
//         fields = ['id', 'name', 'status']
// View to update status:
// python
// Copy
// Edit
// # views.py
// from rest_framework import viewsets
// from rest_framework.decorators import action
// from rest_framework.response import Response
// from .models import Student
// from .serializers import StudentSerializer

// class StudentViewSet(viewsets.ModelViewSet):
//     queryset = Student.objects.all()
//     serializer_class = StudentSerializer

//     @action(detail=True, methods=['patch'])
//     def update_status(self, request, pk=None):
//         student = self.get_object()
//         new_status = request.data.get('status')
//         if new_status in ['R', 'N']:
//             student.status = new_status
//             student.save()
//             return Response({'status': 'updated', 'new_status': student.status})
//         return Response({'error': 'Invalid status'}, status=400)
// URL:
// python
// Copy
// Edit
// # urls.py
// from django.urls import path, include
// from rest_framework.routers import DefaultRouter
// from .views import StudentViewSet

// router = DefaultRouter()
// router.register('students', StudentViewSet)

// urlpatterns = [
//     path('', include(router.urls)),
// ]
// 🎨 Frontend (React)
// Example StudentStatusButton.jsx component:
// jsx
// Copy
// Edit
// import React from "react";
// import axios from "axios";

// const StudentStatusButton = ({ student, onStatusChange }) => {
//   const handleChange = async (newStatus) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:8000/students/${student.id}/update_status/`,
//         { status: newStatus }
//       );
//       onStatusChange(student.id, newStatus);
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => handleChange("R")}
//         className={`px-4 py-2 rounded ${
//           student.status === "R" ? "bg-green-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         Reached
//       </button>
//       <button
//         onClick={() => handleChange("N")}
//         className={`px-4 py-2 rounded ${
//           student.status === "N" ? "bg-red-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         Not Reached
//       </button>
//     </div>
//   );
// };

// export default StudentStatusButton;
// Use it inside a parent component:
// jsx
// Copy
// Edit
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentStatusButton from "./StudentStatusButton";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/students/").then((res) => {
//       setStudents(res.data);
//     });
//   }, []);

//   const updateStatus = (id, newStatus) => {
//     setStudents((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
//     );
//   };

//   return (
//     <div>
//       {students.map((student) => (
//         <div key={student.id} className="p-4 border-b">
//           <h2 className="text-lg">{student.name}</h2>
//           <StudentStatusButton student={student} onStatusChange={updateStatus} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentList;
// Let me know if you want this as a dropdown instead of buttons, or want to implement this inline in a table format.







// You said:
// this is where will we use


// ChatGPT said:
// Great question.

// The "Reached/Not Reached" ratio button will be used wherever you need to track and update the status of an entity (like a student, task, message, or user) to indicate if a certain goal or action has been completed.

// ✅ Example Use Case in a Student Management System
// Assume you’re building a teacher dashboard where the teacher can:

// View the list of assigned students.

// Mark which students have been "Reached" (e.g., contacted or followed up).

// Mark others as "Not Reached".

// 💡 You would use the status buttons:
// On the student list page for teachers.

// On a student profile view.

// In a table or card view where student status can be edited directly.

// 📍 Where to place it in React project:
// Assuming you have these components:

// css
// Copy
// Edit
// src/
// ├── components/
// │   ├── StudentStatusButton.jsx  ← your ratio button
// │   └── StudentCard.jsx          ← show student info + button
// ├── pages/
// │   └── TeacherDashboard.jsx     ← render all students + buttons
// ✅ Example UI Flow
// In TeacherDashboard.jsx:

// jsx
// Copy
// Edit
// <StudentCard student={student} />
// In StudentCard.jsx:

// jsx
// Copy
// Edit
// <div>
//   <h3>{student.name}</h3>
//   <StudentStatusButton student={student} onStatusChange={updateStatus} />
// </div>
// This makes it easy for the teacher to click and toggle a student’s "Reached/Not Reached" status without leaving the page.

// Would you like me to help integrate this into a table view, a profile page, or your current dashboard component? If you share your existing code or layout, I can plug it in exactly where it fits.







// You said:
// import React from "react";
// import axios from "axios";

// const StudentStatusButton = ({ student, onStatusChange }) => {
//   const handleChange = async (newStatus) => {
//     try {
//       const res = await axios.patch(
//         http://localhost:8000/students/${student.id}/update_status/,
//         { status: newStatus }
//       );
//       onStatusChange(student.id, newStatus);
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => handleChange("R")}
//         className={px-4 py-2 rounded ${
//           student.status === "R" ? "bg-green-500 text-white" : "bg-gray-200"
//         }}
//       >
//         Reached
//       </button>
//       <button
//         onClick={() => handleChange("N")}
//         className={px-4 py-2 rounded ${
//           student.status === "N" ? "bg-red-500 text-white" : "bg-gray-200"
//         }}
//       >
//         Not Reached
//       </button>
//     </div>
//   );
// };

// export default StudentStatusButton;        WARNING in [eslint] 
// src\pages\StudentStatusButton.jsx
//   Line 7:13:  'res' is assigned a value but never used  no-unused-vars


// ChatGPT said:
// The warning you're seeing:

// python
// Copy
// Edit
// 'res' is assigned a value but never used  no-unused-vars
// means that this line:

// js
// Copy
// Edit
// const res = await axios.patch(...)
// is assigning the result to res, but you're not doing anything with res afterward—so ESLint is telling you it's unnecessary.

// ✅ Two Options to Fix It:
// Option 1: Remove the unused variable
// If you don’t need the response:

// js
// Copy
// Edit
// await axios.patch(
//   `http://localhost:8000/students/${student.id}/update_status/`,
//   { status: newStatus }
// );
// Option 2: Use the response
// If you want to use the response (e.g., show a message or validate):

// js
// Copy
// Edit
// const res = await axios.patch(
//   `http://localhost:8000/students/${student.id}/update_status/`,
//   { status: newStatus }
// );
// console.log("Status updated to:", res.data.new_status);
// ✅ Recommendation:
// If you're not using the response yet, go with Option 1 for clean code and no warnings.

// Let me know if you'd like to show a toast/alert when the status is updated.







// You said:
// from django.urls import path, include
// from rest_framework.routers import DefaultRouter
// from .views import (
//     StudentRegisterView,
//     TeacherRegisterView,
//     StudentViewSet,
//     TeacherStudentCRUDView,
//     AdminStudentView,
//     AdminTeacherView,
//     careerinfoView
// )
// # 
// # urls.py
// from django.urls import path, include
// from rest_framework.routers import DefaultRouter
// from .views import SyllabusViewSet, CourseViewSet
// from .views import StudentViewSet


// router = DefaultRouter()
// router.register(r'courses', CourseViewSet)
// router.register(r'syllabus', SyllabusViewSet)


// # 
// router = DefaultRouter()
// router.register(r'my-student', StudentViewSet, basename='my-student')
// router.register(r'teacher-student', TeacherStudentCRUDView, basename='teacher-student')
// router.register(r'admin-students', AdminStudentView, basename='admin-students')
// router.register(r'admin-teachers', AdminTeacherView, basename='admin-teachers')
// router.register(r'careerinfo', careerinfoView)
// router.register('students', StudentViewSet, basename='students')

// urlpatterns = [
//     path('register/student/', StudentRegisterView.as_view()),
//     path('register/teacher/', TeacherRegisterView.as_view()),
//     path('', include(router.urls)),
// ]



// # The corresponding URLs for your Django API endpoints will look like this:

// # Student Registration:
// # http://<your-domain>/register/student/

// # Teacher Registration:
// # http://<your-domain>/register/teacher/

// # Student CRUD (for the logged-in student):
// # http://<your-domain>/my-student/

// # Teacher CRUD (for teachers managing students):
// # http://<your-domain>/teacher-student/

// # Admin CRUD for Students:
// # http://<your-domain>/admin-students/

// # Admin CRUD for Teachers:
// # http://<your-domain>/admin-teachers/

// # Career Info:
// # http://<your-domain>/careerinfo/

// # Make sure to replace <your-domain> with the actual domain or IP address where your Django application is hosted (e.g., http://localhost:8000 during local development).


// ChatGPT said:
// Thanks for sharing your urls.py. Based on what you posted, you have multiple DefaultRouter() declarations and re-registrations of the same viewsets, which can cause conflicts and overwritten routes.

// ⚠️ Issues in your current code:
// You are creating multiple routers, which is incorrect. Only one router should be used per file, and all viewsets should be registered to that one instance.

// Also, you registered StudentViewSet twice with different base names:

// python
// Copy
// Edit
// router.register(r'my-student', StudentViewSet, basename='my-student')
// ...
// router.register('students', StudentViewSet, basename='students')
// This will lead to ambiguity or unexpected behavior.

// ✅ Cleaned Up Version of urls.py
// Here’s the corrected and consolidated version of your urls.py:

// python
// Copy
// Edit
// from django.urls import path, include
// from rest_framework.routers import DefaultRouter
// from .views import (
//     StudentRegisterView,
//     TeacherRegisterView,
//     StudentViewSet,
//     TeacherStudentCRUDView,
//     AdminStudentView,
//     AdminTeacherView,
//     careerinfoView,
//     SyllabusViewSet,
//     CourseViewSet,
// )

// router = DefaultRouter()
// router.register(r'students', StudentViewSet, basename='students')
// router.register(r'teacher-student', TeacherStudentCRUDView, basename='teacher-student')
// router.register(r'admin-students', AdminStudentView, basename='admin-students')
// router.register(r'admin-teachers', AdminTeacherView, basename='admin-teachers')
// router.register(r'careerinfo', careerinfoView)
// router.register(r'courses', CourseViewSet)
// router.register(r'syllabus', SyllabusViewSet)

// urlpatterns = [
//     path('register/student/', StudentRegisterView.as_view()),
//     path('register/teacher/', TeacherRegisterView.as_view()),
//     path('', include(router.urls)),
// ]
// 🔁 Regarding the "Reached/Not Reached" Update
// Ensure that your StudentViewSet includes the update_status action like this:

// python
// Copy
// Edit
// @action(detail=True, methods=['patch'])
// def update_status(self, request, pk=None):
//     student = self.get_object()
//     new_status = request.data.get('status')
//     if new_status in ['R', 'N']:
//         student.status = new_status
//         student.save()
//         return Response({'status': 'updated', 'new_status': student.status})
//     return Response({'error': 'Invalid status'}, status=400)
// So the frontend can call:

// bash
// Copy
// Edit
// PATCH /students/<id>/update_status/
// Let me know if:

// You're using JWT and want this route protected by roles (admin/teacher).

// You want to filter which students are shown to which users.

// You want to change the status dropdown/button styling based on user role.







// You said:
// models                        class Student(models.Model):
//     name = models.CharField(max_length=100)
//     STATUS_CHOICES = [
//         ('R', 'Reached'),
//         ('N', 'Not Reached'),
//     ]
//     status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='N')                                        
// # serializers.py
// from .models import Student

// class StudentSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = Student
//         fields = '__all__'
//                              view    class StudentViewSet(viewsets.ModelViewSet):
//     queryset = Student.objects.all()
//     serializer_class = StudentSerializer                        this is my django i have reactjs i need one for reached click which id i have click that id change reached  


// ChatGPT said:
// Thanks — you're almost there!

// You want to:
// ✅ Click a "Reached/Not Reached" button in ReactJS
// ✅ Update the status field in Django for that specific Student ID

// You already have:

// Django Student model ✅

// Django StudentSerializer ✅

// Django StudentViewSet ✅

// ReactJS button component ✅

// Now, to complete it end-to-end, here’s exactly what you need to do:

// ✅ Step-by-Step: Reached Button Integration
// 1. ✅ Add update_status action in your StudentViewSet
// In views.py:

// python
// Copy
// Edit
// from rest_framework.decorators import action
// from rest_framework.response import Response

// class StudentViewSet(viewsets.ModelViewSet):
//     queryset = Student.objects.all()
//     serializer_class = StudentSerializer

//     @action(detail=True, methods=['patch'])
//     def update_status(self, request, pk=None):
//         student = self.get_object()
//         new_status = request.data.get('status')

//         if new_status in ['R', 'N']:
//             student.status = new_status
//             student.save()
//             return Response({'status': 'updated', 'new_status': student.status})
//         return Response({'error': 'Invalid status'}, status=400)
// This creates the custom endpoint:

// bash
// Copy
// Edit
// PATCH /students/<id>/update_status/
// 2. ✅ ReactJS Component to Call This API
// Here’s the working ReactJS button component:

// jsx
// Copy
// Edit
// import React from "react";
// import axios from "axios";

// const StudentStatusButton = ({ student, onStatusChange }) => {
//   const handleChange = async (newStatus) => {
//     try {
//       await axios.patch(
//         `http://localhost:8000/students/${student.id}/update_status/`,
//         { status: newStatus }
//       );
//       onStatusChange(student.id, newStatus);
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => handleChange("R")}
//         className={`px-4 py-2 rounded ${
//           student.status === "R" ? "bg-green-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         Reached
//       </button>
//       <button
//         onClick={() => handleChange("N")}
//         className={`px-4 py-2 rounded ${
//           student.status === "N" ? "bg-red-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         Not Reached
//       </button>
//     </div>
//   );
// };

// export default StudentStatusButton;
// 3. ✅ Use the Button in a Student List Page
// jsx
// Copy
// Edit
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentStatusButton from "./StudentStatusButton";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/students/").then((res) => {
//       setStudents(res.data);
//     });
//   }, []);

//   const updateStatus = (id, newStatus) => {
//     setStudents((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
//     );
//   };

//   return (
//     <div>
//       {students.map((student) => (
//         <div key={student.id} className="p-4 border-b">
//           <h2 className="text-lg">{student.name}</h2>
//           <StudentStatusButton student={student} onStatusChange={updateStatus} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentList;
// 4. 🔐 Optional: Enable CORS
// If React and Django are running on different ports, install and configure CORS:

// bash
// Copy
// Edit
// pip install django-cors-headers
// In settings.py:

// python
// Copy
// Edit
// INSTALLED_APPS += ["corsheaders"]
// MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"] + MIDDLEWARE
// CORS_ALLOW_ALL_ORIGINS = True  # For dev only
