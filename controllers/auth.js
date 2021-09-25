const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

   const { email, password } = req.body;

   try {

      let user = await User.findOne({ email });

      if (user) return res.status(400).json({
         ok: false,
         msg: 'Email is already in use',
      });

      user = new User(req.body);

      // Enciptando contraseña
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save(); // Guardando los datos en la base de datos

      // Generamos Json Web Token
      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      })
   } catch (error) {

      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'DB Error'
      });
   }
}

const loginUser = async (req, res = response) => {

   const { email, password } = req.body;

   try {

      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({
         ok: false,
         msg: 'Email or Password incorrect',
      });

      // Comparando con la password de la DB
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) return res.status(400).json({
         ok: false,
         msg: 'Email or Password incorrect'
      });

      // Generamos Json Web Token
      const token = await generateJWT(user.id, user.name);

      res.status(200).json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      })

   } catch (error) {

      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'DB Error'
      });
   }
}

const renewUser = async (req, res = response) => {

   const uid = req.uid;
   const name = req.name;

   // Generamos Json Web Token
   const token = await generateJWT(uid, name);

   res.json({
      ok: true,
      token
   })
}

module.exports = {
   createUser,
   loginUser,
   renewUser
}