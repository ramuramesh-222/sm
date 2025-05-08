import React from 'react';
import AppRouter from './AppRouter';

const App = () => {
  return <AppRouter />;
};

export default App;







// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SyllabusList from './pages/SyllabusList';
// import SyllabusForm from './pages/SyllabusForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/syllabus" element={<SyllabusList />} />
//         <Route path="/syllabus/add" element={<SyllabusForm />} />
//         <Route path="/syllabus/edit/:id" element={<SyllabusForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







// 🧭 Flow of Syllabus CRUD Functionality
// 🔧 1. Admin/Teacher Logs In
// Authenticated using JWT in ReactJS.

// Token is stored and used in headers (Authorization: Bearer <token>).

// 📦 2. Syllabus Data in the Backend (Django)
// Models:
// Course: List of available courses (e.g., Math, Science).

// Syllabus: Linked to a course; includes title, description, and optional file (PDF, docx, etc.).

// Example:
// text
// Copy
// Edit
// Course: "Physics"
// Syllabus Title: "Kinematics"
// Description: "Motion in one dimension"
// File: kinematics.pdf
// 📤 3. React Frontend Flow
// A. Syllabus Listing Page
// Makes GET /api/syllabus/ request to Django.

// Displays list of syllabus entries (title, course, description).

// Includes buttons for Edit and Delete.

// B. Add Syllabus Page
// Form to fill:

// Select Course

// Title

// Description

// Upload File (optional)

// On submit:

// Sends POST /api/syllabus/ with form data as multipart.

// C. Edit Syllabus Page
// Pre-fills form using GET /api/syllabus/:id/.

// On submit:

// Sends PUT /api/syllabus/:id/ with updated data.

// D. Delete Syllabus
// Click Delete on a list item.

// Calls DELETE /api/syllabus/:id/.

// 🛠️ 4. Backend API Endpoints (Django DRF)
// Method	Endpoint	Description
// GET	/api/syllabus/	List all syllabus
// POST	/api/syllabus/	Create new syllabus
// GET	/api/syllabus/<id>/	Get single syllabus
// PUT	/api/syllabus/<id>/	Update syllabus
// DELETE	/api/syllabus/<id>/	Delete syllabus

// These are secured with JWT authentication.

// 🧾 5. Authorization Roles (Optional)
// You can restrict:

// Only admins or teachers can add/edit/delete.

// Students can only view syllabus (via a separate read-only endpoint or filtered access).

// ✅ Summary Flow
// pgsql
// Copy
// Edit
// Login (JWT) → Dashboard → Syllabus List → Add/Edit/Delete via Forms → Backend (DRF API) → Database
// Would you like a diagram of this flow or help with setting up role-based access for syllabus CRUD?







// Do you like this personality?








// Search

// Reason

// Deep research

// Create im