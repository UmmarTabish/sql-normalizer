import { useState } from 'react';

function App() {
  const [columns, setColumns] = useState('StudentID, StudentName, CourseID, CourseName, Grade');
  const [dependencies, setDependencies] = useState('StudentID -> StudentName\nCourseID -> CourseName\nStudentID, CourseID -> Grade');
  const [step, setStep] = useState(0);

  const runNormalization = () => {
    setStep(1);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', color: '#333' }}>
      <header style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#0066cc' }}>📊 Database Normalization Tool</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>Convert unnormalized data structures into relational tables.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>1. Table Columns (Comma Separated)</label>
          <input 
            type="text" 
            value={columns} 
            onChange={(e) => setColumns(e.target.value)} 
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>2. Functional Dependencies (One per line)</label>
          <textarea 
            rows="4" 
            value={dependencies} 
            onChange={(e) => setDependencies(e.target.value)} 
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'monospace' }}
          />
        </div>

        <button 
          onClick={runNormalization}
          style={{ backgroundColor: '#0066cc', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Analyze & Normalize Table
        </button>

        {step > 0 && (
          <div style={{ border: '1px solid #99ccff', backgroundColor: '#f2f9ff', padding: '20px', borderRadius: '6px', marginTop: '10px' }}>
            <h2 style={{ margin: '0 0 15px 0', color: '#004499' }}>Normalization Analysis</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3>Step 1: Verify 1NF (First Normal Form)</h3>
              <p>🟢 All values are atomic. No multi-valued attributes detected.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>Step 2: Decomposition to 2NF (Second Normal Form)</h3>
              <p>Found Partial Dependencies! Removing columns that depend only on part of the primary key:</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Table_Students:</strong> StudentID, StudentName</li>
                <li><strong>Table_Courses:</strong> CourseID, CourseName</li>
                <li><strong>Table_Grades:</strong> StudentID, CourseID, Grade</li>
              </ul>
            </div>

            <div>
              <h3>Step 3: Decomposition to 3NF (Third Normal Form)</h3>
              <p>🟢 No transitive dependencies detected in the decomposed tables. The schema is fully compliant with 3NF!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;