/*
Overall, these lines of code set up a connection pool to a PostgreSQL database 
using the pg module in Node.js. The pool manages connections to the database, 
allowing the application to efficiently interact with the database by reusing connections 
from the pool rather than creating new ones for each operation. 
*/
const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tutorial',
    password: '######',
    port: 5432
});

// called Response class from /models folder.
const ResponseClass = require("./model/response");

// Creating CRUD Operation Functions
// 1.) getStudents() — to retrieve all student data
// 2.) getStudentById() — to retrieve data of a student based on ID
// 3.) createStudent() — to create a student's data
// 4.) updateStudent() — to update a student's data based on ID
// 5.) deleteStudent() — to delete a student's data based on ID

// These functions helps us to talk to our postgresql db.
// They will be used/called by/from index.js.

// GET | getStudents()
const getStudents = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;

        response.status(200).json(responseReturn);
    })
}

// GET | getStudentById()
const getStudentById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "User not found";
            responseReturn.data = null;
        } else {
            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "Success";
            responseReturn.data = results.rows[0];
        }
        response.status(200).json(responseReturn);
    })
}

// POST | createStudent()
const createStudent = (request, response) => {
    const { firstname, lastname, origin } = request.body;
    pool.query('INSERT INTO students (firstname, lastname, origin) VALUES ($1, $2, $3)', [firstname, lastname, origin], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Student added");
    })
}

// PUT | updateStudent()
const updateStudent = (request, response) => {
    const id = parseInt(request.params.id);
    var responseReturn = new ResponseClass();
    try {
        const { firstname, lastname, origin } = request.body;
        pool.query('UPDATE students SET firstname = $1, lastname = $2, origin = $3 WHERE id = $4', [firstname, lastname, origin, id], (error, results) => {
            if (error) {
                throw error
            }

            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "User modification successed";
            responseReturn.data = null;
            response.status(200).send(responseReturn);
        })
    } catch (error) {
        responseReturn.status = false;
        responseReturn.code = 500;
        responseReturn.message = error.message;
        responseReturn.data = null
        response.status(500).json(responseReturn);
    }
}

// DELETE | deleteStudent()
const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Student deleted");
    })
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}