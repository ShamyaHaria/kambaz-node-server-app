import model from "./model.js";
export default function PazzaDao() {
    function findPostsForCourse(courseId, filters = {}) {
        const query = { course: courseId };
        if (filters.pinned !== undefined) {
            query.isPinned = filters.pinned;
        }
        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }
        return model.find(query).sort({ isPinned: -1, createdAt: -1 });
    }
    function findPostById(postId) {
        return model.findById(postId);
    }
    function createPost(post) {
        return model.create(post);
    }
    function updatePost(postId, postUpdates) {
        return model.findByIdAndUpdate(
            postId,
            { $set: { ...postUpdates, updatedAt: new Date() } },
            { new: true }
        );
    }
    function deletePost(postId) {
        return model.deleteOne({ _id: postId });
    }
    function togglePin(postId) {
        return model.findById(postId).then(post => {
            post.isPinned = !post.isPinned;
            return post.save();
        });
    }
    function incrementViews(postId) {
        return model.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 } },
            { new: true }
        );
    }
    function toggleLike(postId, userId) {
        return model.findById(postId).then(post => {
            post.likes = (post.likes || 0) + 1;
            return post.save();
        });
    }
    function toggleBookmark(postId, userId) {
        return model.findById(postId).then(post => {
            const index = post.bookmarked.indexOf(userId);
            if (index > -1) {
                post.bookmarked.splice(index, 1);
            } else {
                post.bookmarked.push(userId);
            }
            return post.save();
        });
    }
    function toggleStar(postId, userId) {
        return model.findById(postId).then(post => {
            const index = post.starred.indexOf(userId);
            if (index > -1) {
                post.starred.splice(index, 1);
            } else {
                post.starred.push(userId);
            }
            return post.save();
        });
    }
    function addFollowUp(postId, followup) {
        return model.findByIdAndUpdate(
            postId,
            {
                $push: { followups: followup },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        );
    }
    function likeFollowUp(postId, followupId) {
        return model.findOneAndUpdate(
            { _id: postId, "followups._id": followupId },
            { $inc: { "followups.$.likes": 1 } },
            { new: true }
        );
    }
    async function getCourseStats(courseId) {
        const posts = await model.find({ course: courseId });
        const totalPosts = posts.length;
        const totalContributions = posts.reduce((sum, post) => sum + post.followups.length, 0) + totalPosts;
        const unansweredQuestions = posts.filter(post =>
            post.followups.length === 0 || !post.followups.some(f => f.isAnswer)
        ).length;
        const unansweredFollowups = posts.reduce((sum, post) =>
            sum + post.followups.filter(f => !f.isAnswer).length, 0
        );
        const instructorResponses = posts.filter(post => post.author.role === 'instructor').length +
            posts.reduce((sum, post) =>
                sum + post.followups.filter(f => f.author.role === 'instructor').length, 0
            );
        const studentResponses = posts.filter(post => post.author.role === 'student').length +
            posts.reduce((sum, post) =>
                sum + post.followups.filter(f => f.author.role === 'student').length, 0
            );
        return {
            totalPosts,
            totalContributions,
            studentsEnrolled: 373,
            unreadPosts: 0,
            unansweredQuestions,
            unansweredFollowups,
            instructorResponses,
            studentResponses,
        };
    }
    return {
        findPostsForCourse,
        findPostById,
        createPost,
        updatePost,
        deletePost,
        togglePin,
        incrementViews,
        toggleLike,
        toggleBookmark,
        toggleStar,
        addFollowUp,
        likeFollowUp,
        getCourseStats,
    };
}