import model from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao() {
    async function findModulesForCourse(courseId) {
        const course = await model.findById(courseId);
        return course?.modules || [];
    }

    async function createModule(courseId, module) {
        const newModule = { ...module, _id: uuidv4() };
        await model.updateOne(
            { _id: courseId },
            { $push: { modules: newModule } }
        );
        return newModule;
    }

    async function deleteModule(courseId, moduleId) {
        const status = await model.updateOne(
            { _id: courseId },
            { $pull: { modules: { _id: moduleId } } }
        );
        return status;
    }

    async function updateModule(courseId, moduleId, moduleUpdates) {
        const course = await model.findById(courseId);
        const moduleIndex = course.modules.findIndex((m) => m._id === moduleId);
        if (moduleIndex !== -1) {
            Object.assign(course.modules[moduleIndex], moduleUpdates);
            await course.save();
            return course.modules[moduleIndex];
        }
        return null;
    }

    return {
        findModulesForCourse,
        createModule,
        deleteModule,
        updateModule,
    };
}