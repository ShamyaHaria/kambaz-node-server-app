import model from "./model.js";
export default function PazzaDao() {
    async function findPostsForCourse(courseId, filters = {}, currentUser = null) {
        const query = { course: courseId };

        if (filters.pinned !== undefined) {
            query.isPinned = filters.pinned;
        }
        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }
        if (currentUser) {
            const isInstructor = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN' || currentUser.role === 'TA';

            if (!isInstructor) {
                query.$or = [
                    { visibility: 'entire_class' },
                    { 'author._id': currentUser._id }
                ];
            }
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
            console.log('DAO toggleLike - Post found:', post._id);
            console.log('DAO - Current likes:', post.likes);
            console.log('DAO - Current likedBy:', post.likedBy);

            const likedUsers = post.likedBy || [];
            const index = likedUsers.indexOf(userId);

            console.log('DAO - User index in likedBy:', index);

            if (index > -1) {
                console.log('DAO - Removing like');
                likedUsers.splice(index, 1);
                post.likes = Math.max(0, post.likes - 1);
            } else {
                console.log('DAO - Adding like');
                likedUsers.push(userId);
                post.likes = (post.likes || 0) + 1;
            }

            post.likedBy = likedUsers;
            console.log('DAO - New likes:', post.likes);
            console.log('DAO - New likedBy:', post.likedBy);

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

    function toggleLikeFollowUp(postId, followupId, userId) {
        console.log('DAO toggleLikeFollowUp called');
        console.log('postId:', postId, 'followupId:', followupId, 'userId:', userId);

        return model.findById(postId).then(post => {
            console.log('Post found:', post._id);
            const followup = post.followups.id(followupId);
            console.log('Followup found:', followup?._id);

            if (!followup) {
                throw new Error('Followup not found');
            }

            const likedUsers = followup.likedBy || [];
            console.log('Current likedBy:', likedUsers);
            const index = likedUsers.indexOf(userId);
            console.log('User index:', index);

            if (index > -1) {
                console.log('Removing like');
                likedUsers.splice(index, 1);
                followup.likes = Math.max(0, followup.likes - 1);
            } else {
                console.log('Adding like');
                likedUsers.push(userId);
                followup.likes = (followup.likes || 0) + 1;
            }

            followup.likedBy = likedUsers;
            post.markModified('followups');
            console.log('New likes:', followup.likes);
            console.log('New likedBy:', followup.likedBy);

            return post.save();
        });
    }

    function deleteFollowUp(postId, followupId) {
        return model.findByIdAndUpdate(
            postId,
            {
                $pull: { followups: { _id: followupId } },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        );
    }

    function addReply(postId, followupId, reply) {
        return model.findById(postId).then(post => {
            if (!post) {
                throw new Error('Post not found');
            }

            const followup = post.followups.id(followupId);
            if (!followup) {
                throw new Error('Followup not found');
            }

            if (!followup.replies) {
                followup.replies = [];
            }

            followup.replies.push(reply);
            post.markModified('followups');
            post.updatedAt = new Date();

            return post.save();
        });
    }

    function deleteReply(postId, followupId, replyId) {
        return model.findById(postId).then(post => {
            if (!post) {
                throw new Error('Post not found');
            }

            const followup = post.followups.id(followupId);
            if (!followup) {
                throw new Error('Followup not found');
            }

            followup.replies.pull(replyId);
            post.markModified('followups');
            post.updatedAt = new Date();

            return post.save();
        });
    }

    function toggleLikeReply(postId, followupId, replyId, userId) {
        return model.findById(postId).then(post => {
            if (!post) {
                throw new Error('Post not found');
            }

            const followup = post.followups.id(followupId);
            if (!followup) {
                throw new Error('Followup not found');
            }

            const reply = followup.replies.id(replyId);
            if (!reply) {
                throw new Error('Reply not found');
            }

            const likedUsers = reply.likedBy || [];
            const index = likedUsers.indexOf(userId);

            if (index > -1) {
                likedUsers.splice(index, 1);
                reply.likes = Math.max(0, reply.likes - 1);
            } else {
                likedUsers.push(userId);
                reply.likes = (reply.likes || 0) + 1;
            }

            reply.likedBy = likedUsers;
            post.markModified('followups');

            return post.save();
        });
    }

    async function getCourseStats(courseId) {
        const posts = await model.find({ course: courseId });
        const EnrollmentsDao = (await import("../Enrollments/dao.js")).default;
        const enrollmentsDao = EnrollmentsDao();
        const enrollments = await enrollmentsDao.findEnrollmentsForCourse(courseId);
        const studentsEnrolled = enrollments.length;

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
            studentsEnrolled,
            unreadPosts: 0,
            unansweredQuestions,
            unansweredFollowups,
            instructorResponses,
            studentResponses,
        };
    }

    async function getTagCounts(courseId) {
        const posts = await model.find({ course: courseId });
        const tagCounts = {};

        posts.forEach(post => {
            post.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return tagCounts;
    }

    function updateFollowUp(postId, followupId, content) {
        return model.findById(postId).then(post => {
            if (!post) throw new Error('Post not found');

            const followup = post.followups.id(followupId);
            if (!followup) throw new Error('Followup not found');

            followup.content = content;
            post.markModified('followups');
            post.updatedAt = new Date();

            return post.save();
        });
    }

    function updateReply(postId, followupId, replyId, content) {
        return model.findById(postId).then(post => {
            if (!post) throw new Error('Post not found');

            const followup = post.followups.id(followupId);
            if (!followup) throw new Error('Followup not found');

            const reply = followup.replies.id(replyId);
            if (!reply) throw new Error('Reply not found');

            reply.content = content;
            post.markModified('followups');

            return post.save();
        });
    }

    function toggleResolveDiscussion(postId, followupId) {
        return model.findById(postId).then(post => {
            if (!post) throw new Error('Post not found');

            const followup = post.followups.id(followupId);
            if (!followup) throw new Error('Followup not found');

            followup.isResolved = !followup.isResolved;
            post.markModified('followups');

            return post.save();
        });
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
        toggleLikeFollowUp,
        deleteFollowUp,
        addReply,
        deleteReply,
        toggleLikeReply,
        getCourseStats,
        getTagCounts,
        updateFollowUp,
        updateReply,
        toggleResolveDiscussion
    };
}