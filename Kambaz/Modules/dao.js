import modulesModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao() {
  async function findModulesForCourse(courseId) {
    const modules = await modulesModel.find({ course: courseId });
    return modules;
  }

  async function createModule(courseId, module) {
    console.log("=== DAO CREATE MODULE ===");
    console.log("courseId:", courseId);
    console.log("courseId type:", typeof courseId);
    console.log("module:", module);

    const newModule = {
      ...module,
      _id: uuidv4(),
      course: courseId,
    };
    const created = await modulesModel.create(newModule);
    return created;
  }

  async function deleteModule(courseId, moduleId) {
    const status = await modulesModel.deleteOne({
      _id: moduleId,
      course: courseId,
    });
    return status;
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {
    const updated = await modulesModel.findOneAndUpdate(
      { _id: moduleId, course: courseId },
      { $set: moduleUpdates },
      { new: true }
    );
    return updated;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}