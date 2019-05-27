const MongoClient = require('mongodb').MongoClient;
const $$validation = require('./$$validation');

const url = 'mongodb+srv://jquesada:intel-test123@intel-test-1yeen.mongodb.net/test?retryWrites=true';
const dbName = 'employees';

module.exports = {
  getCollection: function (name) {
    return new Promise((resolve, reject) => {
      // Use connect method to connect to the server
      MongoClient.connect(url, function (err, client) {
        try {
          const db = client.db(dbName);
          const collection = db.collection(name);
          resolve({
            collection,
            close() {
              client.close();
            }
          });
        } catch (error) {
          client.close();
          throw new $$validation(error);
        }
      });
    });
  }
}
