import 'reflect-metadata';
import express from 'express';
import "./infrestructure/db_connection"
import {BooksRepository} from "./books/BookService";

const port = process.env.port || 5000;
const app = express();
import container from './infrastructure/inversify.config';

import booksRouter from "./books.routes";
app.use(express.json())
app.use("/api/books", booksRouter)

app.listen(port, () => console.log(`listening on port: ${port}`));