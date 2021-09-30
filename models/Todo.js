const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
   content: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   }
});

TodoSchema.method('toJSON', function () {
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
});

module.exports = model('Todo', TodoSchema);