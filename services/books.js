const db = require('../db/connection-db.js');

function getAllBooks(callback) {
    db.con.query('SELECT * FROM BOOKS', (error, results, faileds) => {
        return callback(error, results, faileds);
    });
}

function getBook(id, callback) {
    db.con.query('SELECT * FROM BOOKS WHERE id = ?', id, (error, results, faileds) => {
        return callback(error, results, faileds);
    });
}

function addBook(name, author, callback) {
    db.con.query('INSERT INTO BOOKS (NAME, AUTHOR) VALUES(?,?)', [name, author], (error, results, faileds) => {
        return callback(error, results, faileds);
    });
}

function updateBook(id, name, author, callback) {
    db.con.query('UPDATE BOOKS SET NAME = ?, AUTHOR = ? WHERE id = ?', [name, author, id], (error, results, faileds) => {
        return callback(error, results, faileds);
    });
}

function deleteBook(id, callback) {
    db.con.query('DELETE FROM BOOKS WHERE ID = ?', [id], (error, results, faileds) => {
        return callback(error, results, faileds);
    });
}

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}

// ---- NOTE ----
// Update DB Results
// {
//     "fieldCount": 0,
//     "affectedRows": 1,
//     "insertId": 5,
//     "serverStatus": 2,
//     "warningCount": 0,
//     "message": "",
//     "protocol41": true,
//     "changedRows": 0
// }