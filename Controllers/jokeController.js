const app = require('../app').app;
const jokeSchema = require('../Models/jokeSchema');

class jokeController {

    constructor() {}

    async getAllJokes() {
        return await jokeSchema.find().lean();
        //forces database to return data in JSOn text format instead of document array

    }

    async getJoke(id) {
        return await jokeSchema.findOne({_id: id}).lean();
    }

    async createJoke(joke) {
        return await jokeSchema.create(joke).lean();
    }

    async deleteJoke(id) {
        return await jokeSchema.findByIdAndDelete({_id: id}).lean();
    }

}


module.exports = jokeController = new jokeController();