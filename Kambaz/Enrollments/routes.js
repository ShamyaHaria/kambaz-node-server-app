import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const findAllEnrollments = (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    };

    const enrollUserInCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const { courseId } = req.params;
        const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
        res.json(enrollment);
    };

    const unenrollUserFromCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const { courseId } = req.params;
        dao.unenrollUserFromCourse(currentUser._id, courseId);
        res.sendStatus(204);
    };

    app.get("/api/enrollments", findAllEnrollments);
    app.post("/api/courses/:courseId/enroll", enrollUserInCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollUserFromCourse);
}