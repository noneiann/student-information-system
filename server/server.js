const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


const config = {
  header: true,
  worker: true

}

// Middleware to parse incoming JSON data
app.use(express.json());

app.get('/api', async (req, res) => {
  const studentsFilePath = path.join(__dirname, 'data/Students.csv');
  const coursesFilePath = path.join(__dirname, 'data/Courses.csv');
  try {
    const studentsData = await parseCSV(studentsFilePath);
    const coursesData = await parseCSV(coursesFilePath);
    res.json({ students: studentsData, courses: coursesData });
  } catch (err) {
    console.error('Error fetching CSV files:', err);
    res.status(500).json({ error: 'Failed to fetch CSV files', filePath });
  }
});


// Function to parse CSV file
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const parsedData = Papa.parse(data, { header: true, skipEmptyLines: true }).data;
        resolve(parsedData);
      }
    });
  });
}


// Route to receive and save the CSV data
app.post('/save-csv-students', (req, res) => {
  const students = req.body.students; 
  const courses = req.body.courses;

  const studentsFilePath = path.join(__dirname, 'data/students.csv');
  const csvDataStudents = Papa.unparse(students, {
    header: true,
    newline: '\r\n',
  });

  fs.writeFile(studentsFilePath, csvDataStudents, (err) => {
    if (err) {
      console.error('Error saving students CSV file:', err);
      res.status(500).json({ error: 'Failed to save CSV file' });
    } else {
      console.log('CSV file saved successfully');
      res.json({ message: 'CSV file saved successfully' });
    }
  });

});

app.post('/save-csv-courses', (req, res) => {
  const courses = req.body.courses;
  const coursesFilePath = path.join(__dirname, 'data/courses.csv');
  const csvDataCourses = Papa.unparse(courses, {
    header: true,
    newline: '\r\n',
  });

  fs.writeFile(coursesFilePath, csvDataCourses, (err) => {
    if (err) {
      console.error('Error saving courses CSV file:', err);
      res.status(500).json({ error: 'Failed to save CSV file' });
    } else {
      console.log('CSV file saved successfully');
      res.json({ message: 'CSV file saved successfully' });
    }
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});