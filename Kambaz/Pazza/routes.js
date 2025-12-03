import PazzaDao from "./dao.js";
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
            const { courseId } = req.params;
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in to create posts" });
            }
            const post = {
                ...req.body,
                course: courseId,
                author: {
                    _id: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`,
                    role: currentUser.role || 'student'
                },
                isInstructor: currentUser.role === 'instructor' || currentUser.role === 'ta'
            };
            const newPost = await dao.createPost(post);
            res.json(newPost);
        } catch (error) {
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
            const { postId } = req.params;
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Must be logged in" });
            }
            const post = await dao.toggleLike(postId, currentUser._id);
            res.json(post);
        } catch (error) {
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
            const followup = {
                ...req.body,
                author: {
                    _id: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`,
                    role: currentUser.role || 'student'
                }
            };
            const post = await dao.addFollowUp(postId, followup);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const likeFollowUp = async (req, res) => {
        try {
            const { postId, followupId } = req.params;
            const post = await dao.likeFollowUp(postId, followupId);
            res.json(post);
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
    app.post("/api/pazza/posts/:postId/followups/:followupId/like", likeFollowUp);
    app.get("/api/pazza/courses/:courseId/stats", getCourseStats);
}