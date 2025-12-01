import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export default function CoursesDao() {
    function findAllCourses() {
        return model.find();
    }

    async function findCoursesForEnrolledUser(userId) {
        const enrollments = await enrollmentModel.find({ user: userId });
        const enrolledCourseIds = enrollments.map((enrollment) => enrollment.course);
        return model.find({ _id: { $in: enrolledCourseIds } });
    }

    function createCourse(course) {
        delete course._id;
        return model.create(course);
    }

    function deleteCourse(courseId) {
        return model.deleteOne({ _id: courseId });
    }

    function updateCourse(courseId, courseUpdates) {
        return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    }

    return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}