import EnrollmentsDao from "../Enrollments/dao.js";
import { findUsersByRole } from "../Users/dao.js";

export default function PazzaResourcesRoutes(app) {
    const enrollmentsDao = EnrollmentsDao();
    const getStaffForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const enrolledUsers = await enrollmentsDao.findUsersForCourse(courseId);
            const staff = enrolledUsers.filter(user => 
                user && (user.role === 'FACULTY' || user.role === 'ADMIN')
            );
            
            res.json(staff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.get("/api/pazza/courses/:courseId/staff", getStaffForCourse);
}