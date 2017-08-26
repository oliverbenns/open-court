import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  slug: String,
  lat: Number,
  lng: Number,
  city: {
    name: String,
    slug: String,
  },
  country: {
    name: String,
    slug: String,
  },
  votes: {
    pos: Number,
    neg: Number,
  },
});

schema.set('toJSON', { virtuals: true });

export default mongoose.model('Court', schema);
