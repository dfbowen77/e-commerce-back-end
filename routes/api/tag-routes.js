const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Here we create a variable called tagData that finds all rows and variables in the Tag dataset/table and then joins them with the Product model.
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Here we create a variable called tagData that finds one row in the Tag dataset/table and then joins it with the Product model.
    const tagData = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product}]
    })
    if (!tagData) {
      res.status(404).json({message: `There is no tag with an id of ${req.params.id}`})
  }
  res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // Here a new row of Tag data is created based on user input. The user input comes from the req.body, which is intuitively... the body of the request. 
    const tagData = await Tag.create(req.body) 
    res.status(200).json(tagData)

  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Here a specific row in the Tag dataset is updated based on user input, which again, is coming from the req.body object.
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!tagData) {
      res.status(404).json({message: `There is no tag with an id of ${req.params.id}`})
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Here we delete a specific row of data in the Tag dataset based on user input.
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({message: `There is no tag with an id of ${req.params.id}`})
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
