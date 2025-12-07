import ModulesDao from "../Modules/dao.js";

export default function ModulesRoutes(app) {
    const dao = ModulesDao();

    const createModuleForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = req.body;
            const newModule = await dao.createModule(courseId, module);
            res.json(newModule);
        } catch (error) {
            console.error('Error creating module:', error);
            res.status(500).json({ error: error.message });
        }
    };

    const findModulesForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = await dao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteModule = async (req, res) => {
        try {
            const { courseId, moduleId } = req.params;
            await dao.deleteModule(courseId, moduleId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateModule = async (req, res) => {
        try {
            const { courseId, moduleId } = req.params;
            const moduleUpdates = req.body;
            const status = await dao.updateModule(courseId, moduleId, moduleUpdates);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/courses/:courseId/modules", createModuleForCourse);
    app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
    app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
    app.get("/api/courses/:courseId/modules", findModulesForCourse);
}