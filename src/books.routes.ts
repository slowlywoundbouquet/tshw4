import container from "./infrastructure/inversify.config";
import {BooksRepository} from "./books/BookService";
import {Router} from "express";
const router = Router()
const bookRepository = container.get<BooksRepository>(BooksRepository)
router.get(':id', async (req, res, next) => {

    const book = await bookRepository.getBook(req.params.id);
    res.json(book);
})

router.get('/view/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await bookRepository.getBook(id)
        res.json(book);
    } catch (e) {
        res.status(500).json
    }
})


router.post('/create', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
    try {
        await bookRepository.createBook(newBook)
        res.json(book);
    } catch (e) {
        res.status(500).json
    }
})

//put
router.post('/update/:id', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    try {
        await bookRepository.updateBook(id, book)
        res.redirect(`/api/books/view/${id}`)
    } catch (e) {
        res.redirect('/404');
    }
})


router.post('/delete/:id', async (req, res) => {
    const {id} = req.params
    try {
        await bookRepository.deleteBook(id)
        res.json("ok");
    } catch (e) {
        res.status(500).json
    }

});
export default router