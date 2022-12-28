import { Container } from "inversify";
import {BooksRepository} from "../books/BookService"
const container = new Container();
container.bind<BooksRepository>(BooksRepository).toSelf()

export default container;