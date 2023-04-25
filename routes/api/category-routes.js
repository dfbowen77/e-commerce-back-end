const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // The try...catch statement executes the try component first, and if there is an exception then the catch block is executed. 
  try {
    // Here we create a variable called categoryData that finds all rows and variables in the Category model and then joins it with the Product model. 
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
    // indicates that the request is successful and responds with the json formatted categoryData we defined earlier in the try statement. 
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Here we create a variable called categoryData that finds one row in the category data and then retreives all its values in the Category model and then joins it with the Product model.
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!categoryData) {
      // the 404 error responds if the category id requested does not exist. 
      res.status(404).json({message: `There is no category with an id of ${req.params.id}`})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // Here a new row of Category data is created based on user input. The user input comes from the req.body, which is intuitively... the body of the request.  
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }
  
});

router.put('/:id', async (req, res) => {
  try {
    // Here a specific row in the Category dataset is updated based on user input, which again, is coming from the req.body object. 
    const categoryData = await Category.update(req.body, {
      where: {
        // The req.params.id is pulling the id value from the parameters associated with the request. 
        id: req.params.id
      },
    })
    if (!categoryData) {
      res.status(404).json({message: `There is no category with an id of ${req.params.id}`})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Here we delete a specific row of data in the Category dataset based on user input. 
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: `There is no category with an id of ${req.params.id}`})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
