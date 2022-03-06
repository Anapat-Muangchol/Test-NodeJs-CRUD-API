
const serviceBook = require('../services/books.js')

module.exports = (app) => {

    // retrieve all book
    app.get(['/books', '/allbooks'], (req, res) => {
        serviceBook.getAllBooks((error, results) => {
            if (error) {
                // handle error
                res.status(500).send({status: false, message: "Server error", error: error});
            }
    
            let message = ''; 
            if (results === undefined || results.length == 0) {
                message = 'Books table is empry';
            } else {
                message = 'Successfully retrieved all books';
            }
            return res.send({status: true, data: results, message: message});
        });
    
    });

    // retrieve book by id
    app.get('/book/:id', (req, res) => {
        const id = req.params.id;
        if (!id) return res.send(400).send({status: false, message: "Please provide book id"});
        else {
            serviceBook.getBook(id, (error, results) => {
                if (error) res.status(500).send({status: false, message: "Server error", error: error});
        
                let message = ''; 
                if (results === undefined || results.length == 0) {
                    message = 'Book not found';
                } else {
                    message = 'Successfully retrieved book data';
                }
                return res.send({status: true, data: results[0], message: message});
            });
        }
    })

    // add a new book
    app.post('/book', (req, res) => {
        let name = req.body.name;
        let author = req.body.author;

        // validation
        if (!name || !author) {
            return res.status(400).send({status: false, message: "Please provide book name and author."});
        } else {
            serviceBook.addBook(name, author, (error, results, faileds) => {
                if (error) res.status(500).send({status: false, message: "Server error", error: error});
                return res.send({ status: true, message: "Book successfully added."});
            })
        }
    })

    // update book with id
    app.put('/book/:id', (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const author = req.body.author;

        // validation
        if (!id || !name || !author) {
            return res.status(400).send({status: false, message: "Please provide book id, name and author."});
        } else {
            serviceBook.updateBook(id, name, author, (error, results, faileds) => {
                    if (error) res.status(500).send({status: false, message: "Server error", error: error});
                    let message = "";
                    if (results.changedRows == 0) {
                        message = "Book data are same";
                    } else {
                        message = "Book successfully updated.";
                    }
                    // get update book
                    serviceBook.getBook(id, (error, results, faileds) => {
                        if (results && results.length > 0) {
                            return res.send({status: true, data: results[0], message: message});
                        } else {
                            return res.send({status: true, data: null, message: "Book not found"});
                        }
                    })
                }
            )
        }
    })

    // delete book by id
    app.delete('/book/:id', (req, res) => {
        let id = req.params.id;
        if (!id) {
            return res.status(400).send({status: false, message: "Please provide book id"});
        } else {
            serviceBook.deleteBook(id, (error, results, failed) => {
                if (error) {
                    // throw error;

                    // handle error
                    res.status(500).send({status: false, message: "Server error", error: error});
                }

                if (results.affectedRows == 0) {
                    return res.send({status: false, message: "Book not found"});
                } else {
                    return res.send({status: false, message: "Book successfully deleted"});
                }
            })
        }
    });

}
