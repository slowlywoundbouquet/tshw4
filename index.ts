import 'reflect-metadata';
import express from 'express';
const mongoose = require("mongoose");
import {BooksRepository} from "./booksrouters";
const port = process.env.port || 5000;
const app = express();
import container from './inversify.config';

const bookRepository = container.get<BooksRepository>(BooksRepository)
app.get(':id', async (req, res, next) => {
    const book = await bookRepository.getBook(req.params.id);
    res.json(book);
})

app.get('/view/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await bookRepository.getBook(id)
        res.json(book);
    } catch (e) {
        res.status(500).json
    }
})

app.post('/create', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
    try {
        await bookRepository.createBook(newBook)
        res.json(book);
    } catch (e) {
        res.status(500).json
    }
})

app.post('/update/:id', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    try {
        await bookRepository.updateBook(id, book)
        res.redirect(`/api/books/view/${id}`)
    } catch (e) {
        res.redirect('/404');
    }
})


app.post('/delete/:id', async (req, res) => {
    const {id} = req.params
    try {
        await bookRepository.deleteBook(id)
        res.json("ok");
    } catch (e) {
        res.status(500).json
    }

});
const PORT = process.env.PORT || 3000
const UrlDB = process.env.UrlDB

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect('mongodb://root:example@mongo:27017/');
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start(PORT, UrlDB);
