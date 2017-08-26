import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const { MONGODB_DATABASE, MONGODB_URI } = process.env;
const db = mongoose;

db.connect = db.connect.bind(db, `${MONGODB_URI}/${MONGODB_DATABASE}`);

export default db;
