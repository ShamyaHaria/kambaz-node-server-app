import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const findAssignmentsForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignments = await dao.findAssignmentsForCourse(courseId);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const createAssignmentForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignment = {
                ...req.body,
                course: courseId,
            };
            const newAssignment = await dao.createAssignment(assignment);
            res.json(newAssignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteAssignment = async (req, res) => {
        try {
            const { assignmentId } = req.params;
            await dao.deleteAssignment(assignmentId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateAssignment = async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const assignmentUpdates = req.body;
            await dao.updateAssignment(assignmentId, assignmentUpdates);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findAssignmentById = async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const assignment = await dao.findAssignmentById(assignmentId);
            res.json(assignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
}