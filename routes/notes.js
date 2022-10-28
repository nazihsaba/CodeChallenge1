const Note = require("../models/Note");
const Category = require("../models/Category");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

// CREATE NOTE
router.post("/create", verifyToken, async (req, res) => {
  const { category, hashtags, description, title } = req.body;

  try {
    if (category) {
      const foundCategory = await Category.findById(category);
      if (foundCategory) {
        const newNote = new Note({
          title: title,
          description: description,
          hashtags: hashtags,
          categoryId: category,
          creatorId: req.user.id,
        });
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
      } else {
        res.json("please provide a valid category");
      }
    } else {
      res.json("please provide category");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE NOTE
router.post("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE NOTE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json("Note Has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL NOTES
// router.get("/find", verifyToken, async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.status(200).json(notes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET NOTES BY CATEGORYID OR BY HASHTAGS
router.get("/find", verifyToken, async (req, res) => {
  const qHashtags = req.query.hashtags;
  const qCategory = req.query.categoryId;
  try {
    let notes;
    if (qHashtags) {
      notes = await Note.find({
        hashtags: {
          $in: [qHashtags],
        },
      });
    } else if (qCategory) {
      notes = await Note.find({
        categoryId: {
          $in: [qCategory],
        },
      });
    } else {
      notes = await Note.find();
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
