import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        _id: { type: String, ref: "UserModel", required: true },
        name: String,
        role: { type: String, enum: ['student', 'instructor', 'ta'], default: 'student' }
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String, ref: "UserModel" }],
    createdAt: { type: Date, default: Date.now }
}, { _id: true });

const followUpSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        _id: { type: String, ref: "UserModel", required: true },
        name: String,
        role: { type: String, enum: ['student', 'instructor', 'ta'], default: 'student' }
    },
    isAnswer: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String, ref: "UserModel" }],
    replies: [replySchema],
    createdAt: { type: Date, default: Date.now }
}, { _id: true });

const pazzaPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        course: { type: String, ref: "CourseModel", required: true },
        category: { type: String, enum: ['Concept', 'Clarification', 'Testing', 'Bug', 'Setup', 'Other'], default: 'Other' },
        author: {
            _id: { type: String, ref: "UserModel", required: true },
            name: String,
            role: { type: String, enum: ['student', 'instructor', 'ta'], default: 'student' }
        },
        visibility: { 
            type: String, 
            enum: ['entire_class', 'instructors_only'], 
            default: 'entire_class' 
        }, 
        tags: [{ type: String }],
        isPinned: { type: Boolean, default: false },
        isInstructor: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: String, ref: "UserModel" }],
        bookmarked: [{ type: String, ref: "UserModel" }],
        starred: [{ type: String, ref: "UserModel" }],
        followups: [followUpSchema],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        collection: "pazza_posts",
        timestamps: true
    }
);

export default pazzaPostSchema;