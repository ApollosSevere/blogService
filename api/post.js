const {
  models: { Post },
} = require("../db");

const router = require("express").Router();

const { requireToken } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const posts = await Post.findAll({ order: [["updatedAt", "DESC"]] });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/addpost", requireToken, async (req, res, next) => {
  try {
    await Post.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.put("/:postId", requireToken, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const updatedPost = await post.update(req.body);
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.get("/:postId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.postId;
    const result = await Post.findByPk(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:postId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.postId;
    const post = await Post.findByPk(id);
    await post.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
