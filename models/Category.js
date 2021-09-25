const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
   title: {
      type: String,
      required: true
   },
   color: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   }
});

// Para sobreescribir el _id por id (sin el guion bajo)
CategorySchema.method('toJSON', function () {
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
});

module.exports = model('Category', CategorySchema);