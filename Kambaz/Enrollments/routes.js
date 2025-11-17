import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const findAllEnrollments = (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    };

    const enrollUserInCourse = (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    };

    app.get("/api/enrollments", findAllEnrollments);
    app.post("/api/enrollments", enrollUserInCourse);
}