import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongodb/mongodb-community-server:$MONGODB_VERSION
dotenv.config();
function get_db() {
    console.log(process.env.PORT)
  let environment = process.env.NODE_ENV;
  if (environment === "test") {
    return process.env.TEST_MONGODB_URI as string;
  } else {
    return process.env.PRODUCTION_MONGODB_URI as string;
  }
}

const uri = get_db();
const client = new MongoClient(uri);
const db_name = process.env.DB_NAME;
const db = client.db(db_name);
export { db };
