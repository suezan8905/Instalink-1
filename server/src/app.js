import express, { json } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
// import routes
import userRoutes from "./routes/user.js";
import cors from "cors"; //we installed this from npm (chrome)

const app = express(); //this is us initializing our app
const corsOption = {
  orgin: ["http://localhost:4600", "https://instalink-1.vercel.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  Credentials: true,
};

// put: this will update the whole document, while PATCH: replace a part (morelike an edited part of the document)
// the above is to enable our server relate with the client, so we want specificity hence using the CORS. and (cors(corsOption))  is written to pass exactly what we want

app.use(cors(corsOption)); //allows external origin points to communicate with the server
app.use(morgan(`dev`)); //log https request to terminal
app.use(json({ limit: "25mb" })); //parses request to client side in json body format. that is whatsoever e send to the frontend will not be greater than 25mb
app.use(express.urlencoded({ extended: true }));
//this above is for bridging gaps when searcing like (sussan+obi), it is us using the express
app.disabled("x-powered-by");
// this is to prevent people from having information on what was used to build the project.(ie. disable tech stack)

//home server route
// so that when vercwl start our sever, it can go to certain homepage
app.get("/", (req,res) => {
  res.send("Hello Instashots server");
});

// api
app.use("/api/auth", userRoutes);

//handle route errors
app.use((req, res, next) => {
  return next(createHttpError(404, `Route ${req.originalUrl} not found`));
});

// your routes needs to come before errors other wise the route will not work, hwnce we are writing it beofre the error below

// handle specific app errors
app.use((error, req, res, next) => {
  console.log(error);
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: error.message });
});

export default app;

// Express handles the backend (server) — managing data, API routes, and business logic.
// express has a middleware (more like access card) called json (java script object notation)
// to use anything from express, we say "app.use"
