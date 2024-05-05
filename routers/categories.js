const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await Category.find().select("name");
  // const categoryList = await Category.find().select("name -_id");
  res.send(categoryList);

  if (!categoryList) {
    res.status(500).json({
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("The category cannot be created");
  res.status(200).send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("The category cannot be created");
  res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) return res.status(404).send("The category cannot be created");
  res.status(200).send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "Category has found",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        erro: err,
      });
    });
});

module.exports = router;
