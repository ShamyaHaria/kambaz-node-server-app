import PazzaDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function PazzaRoutes(app) {
    const dao = PazzaDao();
    const findPostsForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const { tags, pinned } = req.query;
            const filters = {};
            if (tags) filters.tags = tags.split(',');
            if (pinned !== undefined) filters.pinned = pinned === 'true';
            const posts = await dao.findPostsForCourse(courseId, filters);
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const findPostById = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await dao.findPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const createPost = async (req, res) => {
        try {
            console.log('=== CREATE POST REQUEST ===');
            console.log('Course ID:', req.params.courseId);
            console.log('Request body:', req.body);
            console.log('Session user:', req.session["currentUser"]);

            const { courseId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                console.log('ERROR: No user in session');
                return res.status(401).json({ error: "Must be logged in to create posts" });
            }

            let pazzaRole = 'student';
            if (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') {
                pazzaRole = 'instructor';
            } else if (currentUser.role === 'TA') {
                pazzaRole = 'ta';
            }

            const post = {
                ...req.body,
                course: courseId,
                author: {
                    _id: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`,
                    role: pazzaRole
                },
                isInstructor: currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN'
            };

            console.log('Creating post:', post);
            const newPost = await dao.createPost(post);
            console.log('Post created successfully:', newPost._id);

            res.json(newPost);
        } catch (error) {
            console.error('ERROR creating post:', error);
            console.error('Error stack:', error.stack);
            res.status(500).json({ error: error.message });
        }
    };

    const updatePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const postUpdates = req.body;
            const updatedPost = await dao.updatePost(postId, postUpdates);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const deletePost = async (req, res) => {
        try {
            const { postId } = req.params;
            await dao.deletePost(postId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const togglePin = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await dao.togglePin(postId);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const incrementViews = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await dao.incrementViews(postId);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const toggleLike = async (req, res) => {
        try {
            console.log('=== TOGGLE LIKE REQUEST ===');
            const { postId } = req.params;
            const currentUser = req.session["currentUser"];

            console.log('Post ID:', postId);
            console.log('Current user:', currentUser?._id);

            if (!currentUser) {
                console.log('ERROR: No user in session');
                return res.status(401).json({ error: "Must be logged in" });
            }

            console.log('Calling dao.toggleLike...');
            const post = await dao.toggleLike(postId, currentUser._id);
            console.log('After toggle - likes:', post.likes);
            console.log('After toggle - likedBy:', post.likedBy);
            const userHasLiked = (post.likedBy || []).includes(currentUser._id);
            console.log('User has liked:', userHasLiked);

            res.json({
                ...post.toObject(),
                userHasLiked
            });
        } catch (error) {
            console.error('ERROR in toggleLike:', error);
            res.status(500).json({ error: error.message });
        }
    };

    const toggleBookmark = async (req, res) => {
        try {
            const { postId } = req.params;
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }
            const post = await dao.toggleBookmark(postId, currentUser._id);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const toggleStar = async (req, res) => {
        try {
            const { postId } = req.params;
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }
            const post = await dao.toggleStar(postId, currentUser._id);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const addFollowUp = async (req, res) => {
        try {
            const { postId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }
            let pazzaRole = 'student';
            if (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') {
                pazzaRole = 'instructor';
            } else if (currentUser.role === 'TA') {
                pazzaRole = 'ta';
            }

            const followup = {
                ...req.body,
                author: {
                    _id: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`,
                    role: pazzaRole
                }
            };

            const post = await dao.addFollowUp(postId, followup);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteFollowUp = async (req, res) => {
        try {
            const { postId, followupId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }

            const post = await dao.findPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            const followup = post.followups.find(f => f._id.toString() === followupId);
            if (!followup) {
                return res.status(404).json({ error: "Followup not found" });
            }

            const isAuthor = followup.author._id === currentUser._id;
            const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';

            if (!isAuthor && !isFacultyOrAdmin) {
                return res.status(403).json({ error: "Not authorized to delete this followup" });
            }

            const updatedPost = await dao.deleteFollowUp(postId, followupId);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const likeFollowUp = async (req, res) => {
        try {
            const { postId, followupId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }

            const post = await dao.toggleLikeFollowUp(postId, followupId, currentUser._id);
            const followup = post.followups.id(followupId);
            const userHasLiked = (followup.likedBy || []).includes(currentUser._id);

            res.json({
                ...post.toObject(),
                userHasLiked,
                followupLikes: followup.likes
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const addReply = async (req, res) => {
        try {
            const { postId, followupId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }

            let pazzaRole = 'student';
            if (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') {
                pazzaRole = 'instructor';
            } else if (currentUser.role === 'TA') {
                pazzaRole = 'ta';
            }

            const reply = {
                content: req.body.content,
                author: {
                    _id: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`,
                    role: pazzaRole
                },
                likes: 0,
                likedBy: [],
                createdAt: new Date()
            };

            const post = await dao.addReply(postId, followupId, reply);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteReply = async (req, res) => {
        try {
            const { postId, followupId, replyId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }

            const post = await dao.findPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            const followup = post.followups.id(followupId);
            if (!followup) {
                return res.status(404).json({ error: "Followup not found" });
            }

            const reply = followup.replies.id(replyId);
            if (!reply) {
                return res.status(404).json({ error: "Reply not found" });
            }

            const isAuthor = reply.author._id === currentUser._id;
            const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';

            if (!isAuthor && !isFacultyOrAdmin) {
                return res.status(403).json({ error: "Not authorized to delete this reply" });
            }

            const updatedPost = await dao.deleteReply(postId, followupId, replyId);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const likeReply = async (req, res) => {
        try {
            const { postId, followupId, replyId } = req.params;
            const currentUser = req.session["currentUser"];

            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }

            const post = await dao.toggleLikeReply(postId, followupId, replyId, currentUser._id);
            const followup = post.followups.id(followupId);
            const reply = followup.replies.id(replyId);
            const userHasLiked = (reply.likedBy || []).includes(currentUser._id);

            res.json({
                ...post.toObject(),
                userHasLiked,
                replyLikes: reply.likes
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getCourseStats = async (req, res) => {
        try {
            const { courseId } = req.params;
            const stats = await dao.getCourseStats(courseId);
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getStatistics = async (req, res) => {
        try {
            const { courseId } = req.params;
            const posts = await dao.findPostsForCourse(courseId, {});

            const enrollmentsDao = EnrollmentsDao();
            const enrolledUsers = await enrollmentsDao.findUsersForCourse(courseId);

            const usageByDay = {};
            posts.forEach(post => {
                const date = new Date(post.createdAt).toLocaleDateString();
                if (!usageByDay[date]) {
                    usageByDay[date] = new Set();
                }
                usageByDay[date].add(post.author._id);
            });

            const usageData = Object.keys(usageByDay).map(date => ({
                date,
                uniqueUsers: usageByDay[date].size
            })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            const postsByDay = {};
            posts.forEach(post => {
                const date = new Date(post.createdAt).toLocaleDateString();
                postsByDay[date] = (postsByDay[date] || 0) + 1;
            });

            const postsData = Object.keys(postsByDay).map(date => ({
                date,
                posts: postsByDay[date]
            })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            const categoryBreakdown = {};
            posts.forEach(post => {
                const folder = post.tags[0] || 'other';
                const category = post.category || 'Other';

                if (!categoryBreakdown[folder]) {
                    categoryBreakdown[folder] = {};
                }
                categoryBreakdown[folder][category] = (categoryBreakdown[folder][category] || 0) + 1;
            });

            const totalContributions = posts.length + posts.reduce((sum, p) => sum + p.followups.length, 0);
            const instructorResponses = posts.filter(p => p.author.role === 'instructor').length +
                posts.reduce((sum, p) => sum + p.followups.filter(f => f.author.role === 'instructor').length, 0);

            const contributorMap = {};

            enrolledUsers.forEach(user => {
                if (user && user.role === 'STUDENT') {
                    contributorMap[user._id] = {
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email || `${user.username}@northeastern.edu`,
                        contributions: 0,
                        postsViewed: 0,
                        daysOnline: 0
                    };
                }
            });

            posts.forEach(post => {
                const authorId = post.author._id;
                if (contributorMap[authorId]) {
                    contributorMap[authorId].contributions += 1;

                    post.followups.forEach(followup => {
                        if (contributorMap[followup.author._id]) {
                            contributorMap[followup.author._id].contributions += 1;
                        }
                    });
                }
            });

            const topContributors = Object.values(contributorMap)
                .sort((a, b) => b.contributions - a.contributions)
                .slice(0, 10);

            const studentParticipation = Object.values(contributorMap);

            res.json({
                usageByDay: usageData,
                postsByDay: postsData,
                categoryBreakdown,
                classStats: {
                    totalPosts: posts.length,
                    totalContributions,
                    uncreditedContributions: 0,
                    instructorResponses,
                    avgResponseTime: 28,
                },
                topContributors,
                studentParticipation,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const getTagCounts = async (req, res) => {
        try {
            const { courseId } = req.params;
            const tagCounts = await dao.getTagCounts(courseId);
            res.json(tagCounts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.get("/api/pazza/courses/:courseId/statistics", getStatistics);
    app.get("/api/pazza/courses/:courseId/posts", findPostsForCourse);
    app.get("/api/pazza/posts/:postId", findPostById);
    app.post("/api/pazza/courses/:courseId/posts", createPost);
    app.put("/api/pazza/posts/:postId", updatePost);
    app.delete("/api/pazza/posts/:postId", deletePost);
    app.patch("/api/pazza/posts/:postId/pin", togglePin);
    app.post("/api/pazza/posts/:postId/view", incrementViews);
    app.post("/api/pazza/posts/:postId/like", toggleLike);
    app.post("/api/pazza/posts/:postId/bookmark", toggleBookmark);
    app.post("/api/pazza/posts/:postId/star", toggleStar);
    app.post("/api/pazza/posts/:postId/followups", addFollowUp);
    app.delete("/api/pazza/posts/:postId/followups/:followupId", deleteFollowUp);
    app.post("/api/pazza/posts/:postId/followups/:followupId/like", likeFollowUp);
    app.post("/api/pazza/posts/:postId/followups/:followupId/replies", addReply);
    app.delete("/api/pazza/posts/:postId/followups/:followupId/replies/:replyId", deleteReply);
    app.post("/api/pazza/posts/:postId/followups/:followupId/replies/:replyId/like", likeReply);
    app.get("/api/pazza/courses/:courseId/stats", getCourseStats);
    app.get("/api/pazza/courses/:courseId/tag-counts", getTagCounts);
}