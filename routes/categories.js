const Category = require("../models/Category");

const { verifyToken } = require("./verifyToken");
const router = require("express").Router();

//CREATE CATEGORY
router.post("/create", verifyToken, async (req, res) => {
  const { title } = req.body;
  const newCategory = new Category({
    title: title,
    creatorId: req.user.id,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE CATEORY
router.post("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CATEGORY
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET 1 CATEGORY
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.id);
    res.status(201).json(foundCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
