import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    function findAllEnrollments() {
        return db.enrollments;
    }
    
    function enrollUserInCourse(userId, courseId) {
        const { enrollments } = db;
        // Check if already enrolled
        const existingEnrollment = enrollments.find(
            (e) => e.user === userId && e.course === courseId
        );
        if (existingEnrollment) {
            return existingEnrollment;
        }
        
        const newEnrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId
        };
        db.enrollments = [...db.enrollments, newEnrollment];
        return newEnrollment;
    }

    function unenrollUserFromCourse(userId, courseId) {
        const { enrollments } = db;
        db.enrollments = enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId)
        );
    }
    
    return { 
        findAllEnrollments, 
        enrollUserInCourse, 
        unenrollUserFromCourse 
    };
}