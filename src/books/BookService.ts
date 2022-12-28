import {injectable} from "inversify";
import "reflect-metadata";

import {Document, Model} from "mongoose";
import {model} from "mongoose";
import {BookMod} from "./book.schema";
import {Book} from "./book"

export interface BookItem {
    createBook(Book: Omit<Book, "id">): Promise<Book>

    getBook(id: string): Promise<Book>

    getBooks(): any

    updateBook(id: string): Promise<Book>

    deleteBook(): any
}
interface Bookint {
    id: Book["id"],
    title: Book['title'],
    description: Book['description'],
    authors: Book['authors'],
    favorite: Book['favorite'],
    fileCover: Book['fileCover'],
}

@injectable()
class BooksRepository implements BookItem {
    constructor() {
        console.log('new Book')
    }

    public async createBook(data: Bookint): Promise<Book> {
        const book = new BookMod(data)
      return await book.save()
    }

    public async getBook(id: string): Promise<Book> {

        return await BookMod.findById(id).select('-__V')
    }

    public async getBooks(): Promise<Book[]> {
        return await BookMod.find().select('-__V')

    }

    public async updateBook(id: string, Book: Bookint): Promise<Book> {
        return await BookMod.findByIdAndUpdate(id, Book)
    }

    public async deleteBook(id: any): string {
        await BookMod.deleteOne({_id: id})
        return "ok"

    }
}

export interface BookDocument extends Book, Document {
}

export interface BookModel extends Model<BookDocument> {
}

export const BookModel = model<BookDocument>("user", bookSchema);


export {BooksRepository};