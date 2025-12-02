import model from "./model.js";

export default function AssignmentsDao() {
    function findAssignmentsForCourse(courseId) {
        return model.find({ course: courseId });
    }

    function createAssignment(assignment) {
        delete assignment._id;
        return model.create(assignment);
    }

    function deleteAssignment(assignmentId) {
        return model.deleteOne({ _id: assignmentId });
    }

    function updateAssignment(assignmentId, assignmentUpdates) {
        return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    }

    function findAssignmentById(assignmentId) {
        return model.findById(assignmentId);
    }

    return {
        findAssignmentsForCourse,
        createAssignment,
        deleteAssignment,
        updateAssignment,
        findAssignmentById,
    };
}