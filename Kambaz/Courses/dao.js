import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
    function findAllCourses() {
        return db.courses;
    }

    function findCoursesForEnrolledUser(userId) {
        const { enrollments, courses } = db;
        const enrolledCourseIds = enrollments
            .filter((enrollment) => enrollment.user === userId)
            .map((enrollment) => enrollment.course);
        return courses.filter((course) =>
            enrolledCourseIds.includes(course._id));
    }

    function createCourse(course) {
        const newCourse = { ...course, _id: uuidv4() };
        db.courses = [...db.courses, newCourse];
        return newCourse;
    }

    function deleteCourse(courseId) {
        const { courses, enrollments } = db;
        db.courses = courses.filter((course) =>
            course._id !== courseId);
        db.enrollments = enrollments.filter(
            (enrollment) => enrollment.course !== courseId
        );
    }

    function updateCourse(courseId, courseUpdates) {
        const { courses } = db;
        const course = courses.find((course) =>
            course._id === courseId);
        Object.assign(course, courseUpdates);
        return course;
    }

    return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}