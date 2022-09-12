const { Tag } = require('../models/tag');
const { User } = require('../models/user');
const ApiError = require('../utils/error');
const { success } = require('../utils/response');

const postTag = async (req, res, next) => {
     const { name, sort_order } = req.body;
     let user;
     try {
          user = await User.findOne({ where: { email: req.payload.email } });
     } catch (err) {
          next(ApiError.internal());
          return;
     }
     if (user == null) {
          next(ApiError.internal());
          return;
     }
     let tag;
     try {
          tag = await Tag.create({
               creator: user.uid,
               name,
               ...(sort_order && { sort_order }) 
          });
          console.log(tag);
     } catch (err) {
          console.log(err);
          next(ApiError.internal());
          return;
     }

     res.status(201).send(success({ id: tag.id, name: tag.name, sort_order: tag.sort_order }));
};

const getTagId = (req, res) => {
     res.send('getTagId');
};

const getTag = (req, res) => {
     res.send('getTag');
};

const putTagId = (req, res) => {
     res.send('putTagId');
};

const deleteTagId = (req, res) => {
     res.send('deleteTagId');
};

module.exports = {
     postTag,
     getTagId,
     getTag,
     putTagId,
     deleteTagId,
};
