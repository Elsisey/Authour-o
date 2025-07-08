const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("./models/Author");
 

/**
 *  @description Get all authors
 *  @route GET /api/authors
 *  @method GET
 *  @access public
 */



router.get("/",asyncHandler(
    async (req,res) =>{
        const authorList =await Author.find()
        res.status(200).json(authorList)
    }
))

/**
 *  @description Get author by id
 *  @route GET /api/authors/:id
 *  @method GET
 *  @access public
 */

router.get("/:id",asyncHandler (
   async (req,res) => {
      const author = await Author.findById(req.params.id);
      if (author) {
        res.status(200).json(author)
      }else{
        res.status(404).json({message:"author not found"})
      }
   }
))
/**
 *  @description Create a new author
 *  @route  /api/authors
 *  @method POST
 *  @access public
 */
router.post("/",asyncHandler (
    async (req,res) =>{
        const {error} = validateCreateAuthor(req.body) 
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        try {
            const author = new Author({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image
            })
            const result = await author.save()
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }
))

    


  /**
 *  @description update a author
 *  @route  /api/authors/:id
 *  @method PUT
 *  @access public
 */

  router.put("/:id", asyncHandler(
    async (req,res) => {
        const {error} = validateUpdateAuthor(req.body)
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        try {
            const author = await Author.findByIdAndUpdate(req.params.id, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nationality: req.body.nationality,
                    image: req.body.image
                }
            }, {new:true})
            res.status(200).json(author)
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }
))


   /**
 *  @description delete a author
 *  @route  /api/authors/:id
 *  @method DELETE
 *  @access public
 */

        router.delete("/:id", asyncHandler(
            async (req,res) => {
        const author = await Author.findById(req.params.id)
        if(author) {
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"author has been deleted"});
        }else{
            res.status(404).json({message:"author not found"});
        }
    }
))


module.exports = router;