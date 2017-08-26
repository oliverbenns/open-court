import '../../app/env';
import database from '../../app/database';
import Court from '../../app/models/court';
import data from './data';

// This should only really be run on the CI.

const promises = data.map(c => {
  const court = new Court(c);

  return court.save();
});

const main = () => {
  Promise
    .all(promises)
    .then(inserts => {
      console.log(`Added ${inserts.length} courts to database`);
      database.connection.close();
    })
    .catch(console.log);
};

database.connect(main);
