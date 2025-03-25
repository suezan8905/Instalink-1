import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

const port = process.env.PORT || 4500 //the value 4500 is by choice

if(!port) {
    throw new Error ("Please there is a port number provided");
}

// initialize server 
// from here downwoard to line 24 means "First, we check if the database is properly connected. If it is, we start the server. If it’s not, we show an error message to let you know something went wrong.

connectToDb()
.then(() => {
    startServer();
})
.catch((error) => {
    console.log("Invalid database connection", error);
});

function startServer() {
    app.listen(port, () => {
        console.log(`Server is connected to port ${port}`);        
    });
}






//  const port = process.env.PORT || 4500 : process.env is an environment variable in Node.js.
// PORT is a specific environment variable that may be set by a hosting service (like Heroku, Railway, or others) to tell your server what port to run on.
//  4500: This is a fallback port number in case process.env.PORT is undefined.