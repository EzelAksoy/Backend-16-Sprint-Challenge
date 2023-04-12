const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(201).json({ message: "Tweets alltweets çalışıyor." });
});

router.get("/:id", (req, res) => {
  res.status(201).json({ message: "Tweets id tweet  çalışıyor." });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Tweets add  tweet  çalışıyor." });
});

router.put("/:id", (req, res) => {
  res.status(201).json({ message: "Tweets güncelleme  tweet  çalışıyor." });
});
router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "Tweets silme  tweet  çalışıyor." });
});

module.exports = router;
