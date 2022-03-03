const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${db.connection.host}`.cyan.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  dbConnect,
};
