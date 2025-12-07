import mongoose from "mongoose";
import schema from "./schema.js";

const modulesModel = mongoose.model("Modules", schema);
export default modulesModel;
