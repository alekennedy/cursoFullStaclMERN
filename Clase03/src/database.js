const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log('database connected'))
    .catch(err => console.error(err));


