import mongoose from "mongoose";
const followUpSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        _id: { type: String, ref: "UserModel", required: true },
        name: String,
        role: { type: String, enum: ['student', 'instructor', 'ta'], default: 'student' }
    },
    isAnswer: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { _id: true });
const pazzaPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        course: { type: String, ref: "CourseModel", required: true },
        author: {
            _id: { type: String, ref: "UserModel", required: true },
            name: String,
            role: { type: String, enum: ['student', 'instructor', 'ta'], default: 'student' }
        },
        tags: [{ type: String }],
        isPinned: { type: Boolean, default: false },
        isInstructor: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        bookmarked: [{ type: String, ref: "UserModel" }],
        starred: [{ type: String, ref: "UserModel" }],
        followups: [followUpSchema],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { collection: "pazza_posts" }
);
pazzaPostSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
export default pazzaPostSchema;