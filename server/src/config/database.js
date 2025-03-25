import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URL

if( !mongoUri) {
    throw new Error("MONGO_URI environment vatiable is not defined");
    // this is done so if my work is cloned without them passing their own uri, it should throw error. 
}

let connection ={}
// each time we import a mongoodb it gives us something, and that is why we have the vatiable "let connection = {}"

const connectToDb = async ()=> {
    try {
        // using already established connection 
        if(connection.isConnected) {
            console.log("Already connected to the database");
            return;
        }
        // try to connect to db if we are not connected 
    const db = await mongoose.connect(mongoUri, {
        dbName: "Instaclone",
        serverSelectionTimeoutMS: 45000,
        // how long we want to keep the server opens before it closes. and the below is the time duration. 
        socketTimeOutMS: 5000,
    });
    connection.isConnected = db.connections[0].readyState === 1;
    // out of all, pick the correct one that is strictly equal to 1

    if(connection.isConnected) {  //from here downward is not really neccessary it is essential only when we are connected. 
      console.log("MongoDb connected successfully");

        //this is for keeping tracks of errors 
      // handle connection events
      mongoose.connection.on("error", (err) => {
        console.log("Mongodb connection error", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongodb disconnected");
            connection.isConnected = false;
        });
        // handle graceful shutdown of db server
        // this is to avoid abrupt shutting down of the server
        process.on ("SIGINT", async()=> {
            await mongoose.connection.close();
            console.log("Mongodb connection closed throught app termination");
            process.exit(0);
        });
      }
    } catch (error) {
        // for general error
        console.log("Mongodb connection failed", error.message);
        connection.isConnected = false
        throw new Error("Failed to connect to MongoDb", error.message);
    }
};

export default connectToDb;