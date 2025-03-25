import express, {json} from "express";

const app = express()
app.use(json({limit: "25mb"})); //parses request to client side in json body format. 
app.use(express.urlencoded({ extended: true }));
//this above is for bridging gaps when searcing like (sussan+obi)
app.disabled("x-powered-by");
// this is to prevent people from having information on what was used to build the project.


// Express handles the backend (server) — managing data, API routes, and business logic.
// express has a middleware (more like access card) called json (java script object notation)
// to use anything from express, we say "app.use"

export default app