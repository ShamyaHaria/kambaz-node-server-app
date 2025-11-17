import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    function findAllEnrollments() {
        return db.enrollments;
    }

    function enrollUserInCourse(userId, courseId) {
        const { enrollments } = db;
        const newEnrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId
        };
        enrollments.push(newEnrollment);
        return newEnrollment;
    }

    return { findAllEnrollments, enrollUserInCourse };
}