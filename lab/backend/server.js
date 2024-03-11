const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");


async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the db!")

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err){
    console.log("Cannot connect to the db!\n >>> ", err)
    process.exit()
  }
}

startServer();