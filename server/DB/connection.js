const mongoose = require('mongoose')

const connectionToDB = (url) => {
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));
}

module.exports = connectionToDB;