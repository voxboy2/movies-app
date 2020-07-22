const express = require('express')
const router = express.Router();
const { Favorite } = require("../models/Favorite");


const { auth } = require("../middleware/auth");


 
// user

router.post('/favoriteNumber', auth, (req,res) => {
    


    // find favorite information by movie id
    Favorite.find({"movieId": req.body.movieId })
         .exec((err, favorite) => {
             if(err) return res.status(400).send(err)
             res.status(200).json({ success: true, favoriteNumber: favorite.length })
         })

});


router.post('/favorited', auth, (req,res) => {
    
    // find favorite information by movie id
    Favorite.find({"movieId": req.body.movieId , "userFrom": req.body.userFrom })
         .exec((err, favorite) => {
             if(err) return res.status(400).send(err)

            //  we check if favorite has already been added
            let result = false;
            if(favorite.length !== 0) {
                result = true
            }
             res.status(200).json({ success: true, favorited: result })
         })

});



router.post("/addToFavorite", (req, res) => {

    console.log(req.body)

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/removeFromFavorite", auth, (req,res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })

      .exec((err, doc) => {
          if (err) return res.status(400).json({ success: false, err})
          res.status(200).json({ success: true, doc})

      })
});


router.post("/getFavoriteMovie", auth, (req,res) => {
     Favorite.find({ 'userFrom': req.body.userFrom })
     .exec((err, favorites) => {
         if(err) return res.status(400).send(err);
         return res.status(200).json({ success: true, favorites })
     })
   
});










module.exports = router;