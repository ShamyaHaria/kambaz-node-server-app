import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();

    const findAllEnrollments = async (req, res) => {
        try {
            const enrollments = await dao.findAllEnrollments();
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const enrollUserInCourse = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            const { courseId } = req.params;
            
            const existingEnrollment = await dao.findEnrollment(currentUser._id, courseId);
            if (existingEnrollment) {
                res.status(400).json({ message: "Already enrolled" });
                return;
            }

            const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
            res.json(enrollment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const unenrollUserFromCourse = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            const { courseId } = req.params;
            await dao.unenrollUserFromCourse(currentUser._id, courseId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findEnrollmentsForUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const enrollments = await dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findEnrollmentsForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const enrollments = await dao.findEnrollmentsForCourse(courseId);
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.get("/api/enrollments", findAllEnrollments);
    app.post("/api/courses/:courseId/enroll", enrollUserInCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollUserFromCourse);
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
    app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
}