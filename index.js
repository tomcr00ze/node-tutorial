// This line imports the Express.js framework into the current JavaScript file.
// Express.js is a popular web framework for Node.js that simplifies the process of building web apps
// by providing a set of features for handling HTTP requests, routing, middleware, and more.
const express = require("express");

//This line imports the body-parser middleware into the current JavaScript file.
// Body-parser is a middleware for Express.js that extracts the body portion of an
// incoming HTTP request and exposes it in a more convenient way to work with,
// especially for parsing JSON, URL-encoded, and other types of data sent in HTTP requests.
const bodyParser = require("body-parser");

// This line creates an instance of an Express application.
// The express() function is a top-level function exported by the Express module, 
// and calling it returns a new Express application instance.
// This app variable is then used to configure routes, middleware, and handle HTTP requests.
const app = express();

// This variable specifies the port number on which the Express app will listen for incoming HTTP requests. 
const port = 3000;

// To import the functions from queries.js
const db = require('./queries');

// This line registers the body-parser middleware with the Express application.
// It specifies that for any incoming HTTP request with a Content-Type of application/json,
// the body-parser middleware should parse the body of the request as JSON.
// This allows the application to access the request body as a JavaScript object.
app.use(bodyParser.json());

// This line registers the body-parser middleware again,
// but this time it specifies that for any incoming HTTP request
// with a Content-Type of application/x-www-form-urlencoded, 
// the body-parser middleware should parse the body of the request as URL-encoded data. 
// The extended: true option allows parsing of rich objects and arrays in the URL-encoded data.
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// This code sets up a route handler for HTTP GET requests to the root URL ("/") of the Express.js app.
// When a GET request is made to the root URL, the callback function (request, response) => {...} is executed.
app.get("/", (request, response) => {
    response.json({
        info: 'Hello world!'
    });
});

app.get("/students", db.getStudents);
app.get("/students/:id", db.getStudentById);
app.put("/students/:id", db.updateStudent);
app.post("/students", db.createStudent);
app.delete("/students/:id", db.deleteStudent);

// This will tell your Express application to start listening on the specified port (in this case, port 3000).
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
