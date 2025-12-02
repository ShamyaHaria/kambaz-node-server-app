import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import { v4 as uuidv4 } from "uuid";

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
        const newCourse = { ...course, _id: course._id || uuidv4() };
        return model.create(newCourse);
    }

    function deleteCourse(courseId) {
        return model.deleteOne({ _id: courseId });
    }

    function updateCourse(courseId, courseUpdates) {
        return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    }

    return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}