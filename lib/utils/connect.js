const mongoose = require('mongoose');
const { parse } = require('url');

const redact = dbUri => {
  const parsedDbUri = parse(dbUri);
  const authPart = parsedDbUri.auth ? '***:***@' : '';

  return `${parsedDbUri.protocol}//${authPart}${parsedDbUri.hostname}:${parsedDbUri.port}${parsedDbUri.pathname}`;
};

const addEvent = (event, dbUri) => {
  mongoose.connection.on(event, () => {
    // eslint-disable-next-line no-console
    console.log(`MongoDb connection ${event} on ${dbUri}`);
  });
};

module.exports = (dbUri = process.env.MONGODB_URI) => {
  const redactedUri = redact(dbUri);
  ['open', 'error', 'close', 'disconnected', 'reconnected'].forEach(event => addEvent(event, redactedUri));

  return mongoose.connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
};
