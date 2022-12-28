import mongoose, {Schema, Document} from "mongoose";
import  {Book} from "./book";

const bookSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite:{
        type: String,
        default: "",
    },
    fileCover:{
        type: String,
        default: "",
    },
    fileName:{
        type: String,
        default: "",
    }
})

export const BookMod = mongoose.model<Book & Document>("Book", bookSchema)