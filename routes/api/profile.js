const express = require("express");
const usersModel = require("../../models/UsersAndCards.model");
const auth = require('../../middlewares/auth');
const _ = require('lodash');
const router = express.Router();

router.get('/', auth,async (req,res)=>{ 
    try{
       const user = await usersModel.findUserDetails(req.payload._id);
       res.status(200).send(_.pick(user,['_id','name','email','biz']));
    }
    catch(error) {
        res.status(400).send('Error in profile');
    }
});

module.exports = router;