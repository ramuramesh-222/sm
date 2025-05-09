// src/pages/SyllabusForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SyllabusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    course: '',
    title: '',
    description: '',
    file: null,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    if (isEdit) fetchSyllabus();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch('http://localhost:8000/api/courses/');
    const data = await res.json();
    setCourses(data);
  };

  const fetchSyllabus = async () => {
    const res = await fetch(`http://localhost:8000/api/syllabus/${id}/`);
    const data = await res.json();
    setForm({ ...data, file: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const url = `http://localhost:8000/api/syllabus/${isEdit ? `${id}/` : ''}`;
    const method = isEdit ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      body: formData,
    });

    navigate('/syllabus');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{isEdit ? 'Edit' : 'Add'} Syllabus</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Course: </label>
          <select name="course" value={form.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Title: </label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description: </label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>File (optional): </label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default SyllabusForm;



// import SyllabusList from './pages/SyllabusList';
// import SyllabusForm from './pages/SyllabusForm';

// <Route path="/syllabus" element={<SyllabusList />} />
// <Route path="/syllabus/add" element={<SyllabusForm />} />
// <Route path="/syllabus/edit/:id" element={<SyllabusForm />} />






//============================================================================================== Updated Component: With Back & Download Buttons


// import React, { useEffect, useState } from 'react';

// const SyllabusPDFList = () => {
//   const [syllabi, setSyllabi] = useState([]);
//   const [selectedPDF, setSelectedPDF] = useState(null);
//   const [selectedTitle, setSelectedTitle] = useState('');

//   useEffect(() => {
//     fetchSyllabus();
//   }, []);

//   const fetchSyllabus = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/api/syllabus/');
//       const data = await res.json();
//       setSyllabi(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleClick = (pdfUrl, title) => {
//     if (pdfUrl) {
//       setSelectedPDF(pdfUrl);
//       setSelectedTitle(title);
//     } else {
//       alert('No PDF file available.');
//     }
//   };

//   const handleBack = () => {
//     setSelectedPDF(null);
//     setSelectedTitle('');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {!selectedPDF ? (
//         <>
//           <h2>Select a Syllabus to View PDF</h2>
//           <ul>
//             {syllabi.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => handleClick(item.file, item.title)}
//                 style={{
//                   cursor: 'pointer',
//                   marginBottom: '10px',
//                   color: 'blue',
//                   textDecoration: 'underline',
//                 }}
//               >
//                 {item.title}
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <div>
//           <h3>{selectedTitle}</h3>

//           <div style={{ marginBottom: '10px' }}>
//             <button onClick={handleBack} style={{ marginRight: '10px' }}>
//               🔙 Back to List
//             </button>

//             <a
//               href={selectedPDF}
//               target="_blank"
//               rel="noreferrer"
//               style={{ padding: '6px 12px', background: '#28a745', color: 'white', textDecoration: 'none' }}
//             >
//               📥 Download PDF
//             </a>
//           </div>

//           <iframe
//             src={selectedPDF}
//             width="100%"
//             height="500px"
//             title="PDF Viewer"
//             style={{ border: '1px solid #ccc' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SyllabusPDFList;


//============================================================================================== ✅ Full React Component

// import React, { useEffect, useState } from 'react';

// const SyllabusPDFList = () => {
//   const [syllabi, setSyllabi] = useState([]);
//   const [selectedPDF, setSelectedPDF] = useState(null);

//   useEffect(() => {
//     fetchSyllabus();
//   }, []);

//   const fetchSyllabus = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/api/syllabus/');
//       const data = await res.json();
//       setSyllabi(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleClick = (pdfUrl) => {
//     if (pdfUrl) {
//       setSelectedPDF(pdfUrl);
//     } else {
//       alert('No PDF file available.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Select a Syllabus to View PDF</h2>
//       <ul>
//         {syllabi.map((item) => (
//           <li
//             key={item.id}
//             onClick={() => handleClick(item.file)}
//             style={{
//               cursor: 'pointer',
//               marginBottom: '10px',
//               color: 'blue',
//               textDecoration: 'underline',
//             }}
//           >
//             {item.title}
//           </li>
//         ))}
//       </ul>

//       {selectedPDF && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>PDF Preview</h3>
//           <iframe
//             src={selectedPDF}
//             width="100%"
//             height="500px"
//             title="PDF Viewer"
//             style={{ border: '1px solid #ccc' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SyllabusPDFList;





// # settings.py
// MEDIA_URL = '/media/'
// MEDIA_ROOT = BASE_DIR / 'media'




// # urls.py (main project urls)
// from django.conf import settings
// from django.conf.urls.static import static

// urlpatterns = [
//     # ... your URLs
// ]

// if settings.DEBUG:
//     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



// ===============================================   ✅ Step-by-step (Option 1: Open PDF in a new tab)




// import React, { useEffect, useState } from 'react';

// const SyllabusPDFList = () => {
//   const [syllabi, setSyllabi] = useState([]);

//   useEffect(() => {
//     fetchSyllabus();
//   }, []);

//   const fetchSyllabus = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/api/syllabus/');
//       const data = await res.json();
//       setSyllabi(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleClick = (pdfUrl) => {
//     if (pdfUrl) {
//       window.open(pdfUrl, '_blank');
//     } else {
//       alert('No PDF file available.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Click a syllabus title to view PDF</h2>
//       <ul>
//         {syllabi.map((item) => (
//           <li
//             key={item.id}
//             onClick={() => handleClick(item.file)}
//             style={{
//               cursor: 'pointer',
//               marginBottom: '10px',
//               color: 'blue',
//               textDecoration: 'underline',
//             }}
//           >
//             {item.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SyllabusPDFList;
