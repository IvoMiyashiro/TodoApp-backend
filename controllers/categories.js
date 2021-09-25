const { response } = require('express');
const Category = require('../models/Category');

const createCategory = async (req, res = response) => {

   const category = new Category(req.body);

   try {
      category.user = req.uid;
      const categorySaved = await category.save();

      res.json({
         ok: true,
         category: categorySaved,
      })

   } catch (error) {

      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal server Error'
      })
   }
}

const getCategory = async (req, res = response) => {

   const categories = await Category.find().populate('user', 'name'); // para obtener el nombre del usuario que creó la categoría

   res.json({
      ok: true,
      categories
   })
}

const updateCategory = async (req, res = response) => {

   const categoryId = req.params.id;
   const uid = req.uid;

   try {

      const category = await Category.findById(categoryId);

      if (!category) {
         res.status(404).json({
            ok: false,
            msg: 'Could not find category.'
         })
      }

      if (category.user.toString() !== uid) return res.status(404).json({
         ok: false,
         msg: 'Do not have permissions to edit this category.'
      })

      const newCategory = {
         ...req.body,
         user: uid,
      }

      const updatedCategory = await Category.findByIdAndUpdate(categoryId, newCategory, { new: true });

      res.json({
         ok: true,
         category: updatedCategory
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal server Error'
      })
   }
}

const deleteCategory = async (req, res = response) => {

   const categoryId = req.params.id;
   const uid = req.uid;

   try {

      const category = await Category.findById(categoryId);

      if (!category) {
         res.status(404).json({
            ok: false,
            msg: 'Could not find category.'
         })
      }

      if (category.user.toString() !== uid) return res.status(404).json({
         ok: false,
         msg: 'Do not have permissions to delete this category.'
      })

      await Category.findByIdAndDelete(categoryId);

      res.json({ ok: true });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal server Error'
      })
   }
}

module.exports = {
   createCategory,
   getCategory,
   updateCategory,
   deleteCategory
}