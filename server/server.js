import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors());

const config = {
	header: true,
	worker: true,
};

const pool = mysql
	.createPool({
		host: "127.0.0.1",
		user: "root",
		password: "",
		database: "studentinformationsystem",
	})
	.promise();

const getStudents = async (req, res) => {
	const [rows] = await pool.query(`SELECT * FROM students;`);
	return rows;
};

const getCourses = async (req, res) => {
	const [rows] = await pool.query("SELECT * FROM courses;");
	return rows;
};

const saveStudents = async (req, res) => {};

app.use(express.json());

app.get("/api", async (req, res) => {
	try {
		const studentsData = await getStudents();
		const coursesData = await getCourses();
		res.json({ students: studentsData, courses: coursesData });
	} catch (err) {
		console.error("Error fetching tables:", err);
		res.status(500).json({ error: "Failed to fetch tables" });
	}
});

app.post("/add-student", async (req, res) => {
	const student = req.body;
	const idNumber = student.idNumber;
	const name = student.name;
	const yearLevel = student.yearLevel;
	const courseCode = student.courseCode;
	const gender = student.gender;
	const enrollmentStatus = student.enrollmentStatus;

	const [rows] = await pool.query(
		"INSERT INTO students (idNumber, name, courseCode, enrollmentStatus, gender,yearLevel) VALUES (?, ?, ?, ?, ?,?);",
		[idNumber, name, courseCode, enrollmentStatus, gender, yearLevel]
	);

	res.json({ message: "Student added successfully" });
});

app.post("/add-course", async (req, res) => {
	const course = req.body;
	const courseCode = course.courseCode;
	const courseName = course.courseName;
	const description = course.description;

	const [rows] = await pool.query(
		"INSERT INTO courses (courseCode, courseName, description) VALUES (?, ?, ?);",
		[courseCode, courseName, description]
	);

	res.json({ message: "Course added successfully" });
});
app.delete("/api/:id", async (req, res) => {
	const id = req.params.id;
	const [rows] = await pool.query("DELETE FROM students WHERE idNumber = ?;", [
		id,
	]);
	res.json({ message: "Student deleted successfully" });
});

app.delete("/api/delete-course/:id", async (req, res) => {
	const id = req.params.id;
	const [rows2] = await pool.query(
		"UPDATE students SET enrollmentStatus = 'Not Enrolled' WHERE courseCode = ?;",
		[id]
	);
	const [rows] = await pool.query("DELETE FROM courses WHERE courseCode = ?;", [
		id,
	]);

	res.json({ message: "Student deleted successfully" });
});

app.put("/api/:id", async (req, res) => {
	const student = req.body;
	const idNumber = student.idNumber;
	const name = student.name;
	const yearLevel = student.yearLevel;
	const courseCode = student.courseCode;
	const gender = student.gender;
	const enrollmentStatus = student.enrollmentStatus;

	const [rows] = await pool.query(
		"UPDATE students SET idNumber = ?, name = ?, yearLevel = ?, courseCode = ?, gender = ?, enrollmentStatus = ? WHERE idNumber = ?",
		[idNumber, name, yearLevel, courseCode, gender, enrollmentStatus, idNumber]
	);
	res.json({ message: "Student updated successfully" });
});

app.put("/edit-course/:id", async (req, res) => {
	const id = req.params.id;
	const course = req.body;
	const courseCode = course.courseCode;
	const courseName = course.courseName;
	const description = course.description;

	const [rows] = await pool.query(
		"UPDATE courses SET courseCode = ?, courseName = ?, description = ? WHERE courseCode = ?",
		[courseCode, courseName, description, id]
	);
	res.json({ message: "Course updated successfully" });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
