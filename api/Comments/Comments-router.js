const router = require("express").Router();
const comments_model = require("./Comments-model");

router.get("/", async (req, res, next) => {
  try {
    const comments = await comments_model.getAllComments();
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { tweet_id, user_id } = req.body;
    const comments = await comments_model.getByFilter(tweet_id);
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Comments add  comment  çalışıyor." });
});

router.put("/:id", (req, res) => {
  res.status(201).json({ message: "Comments güncelleme  comment  çalışıyor." });
});
router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "Comments silme  comment  çalışıyor." });
});

module.exports = router;
