'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;

// mongodb 

const mongoose = require('mongoose');

main().catch(err => console.log(err));


let bookModel;

async function main() {
    await mongoose.connect('mongodb://localhost:27017/books');

    const bookSchema = new mongoose.Schema({
        title: String,
        description: String,
        status: String,
        email: String,
    });
    bookModel = mongoose.model('book', bookSchema);

    // seedData();
}


async function seedData() {

    //seeding database
    const book1 = new bookModel({
        title: 'BEHIND HER EYES',
        description: 'The book follows a London receptionist named Louise, who becomes romantically entangled with her psychiatrist boss, David, while secretly befriending his enigmatic wife, Adele.',
        status: 'released',
        email: 'y.linux96@gmail.com'


    });

    const book2 = new bookModel({
        title: 'Disgrace',
        description: 'One afternoon while talking with a friend about books, I wondered how to best describe my experience of reading Disgrace, and this is what I came up with: its like a finely crafted, very sharp knife resting gently against your skin. The uneasiness and suspense are there from the beginning, made all the more powerful by Coetzee control and use of spare language, and you never really take a deep breath until its all over.',
        status: 'in progress',
        email: 'y.linux96@gmail.com'


    });

    const book3 = new bookModel({
        title: 'Poems',
        description: 'Elizabeth Bishop poetry is dearly loved amongst her fans but perhaps not as wellknown as it should be; for one of America towering talents of the 20th century, she is not read nearly as much as Eliot or Whitman, or even cummings.',
        status: 'not released',
        email: 'y.linux96@gmail.com'


    });

    await book1.save();
    await book2.save();
    await book3.save();


}

server.get('/books', seedData);
server.get('/getBook', getBookHandler);
server.get('/', homeHandler);



function homeHandler(req, res) {

    res.send('Hello World')
}


function getBookHandler(req, res) {

    const email = req.query.email;
    bookModel.find({email:email}, (error, result) => {
        console.log(result);
        res.send(result);

    })
}

server.listen(PORT, () => {

    console.log(`listining to PORT ${PORT}`);
})