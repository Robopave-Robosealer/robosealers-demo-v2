const mongoose = require("mongoose")

const uriMap = {
    local: process.env.LOCAL_DB_URI,
    development: process.env.DEV_DB_URL
};
const selectedEnv = process.env.CURRENT_URL || 'development';
let uri = uriMap[selectedEnv];
const connection = async () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`Connected to MongoDB database successfully on ${selectedEnv} environment!`);

        }).catch((err) => {
            console.log("MongoDB Error: ", err);
        })
}


module.exports = connection

