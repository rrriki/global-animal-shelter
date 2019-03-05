export class Configuration {

    static getPort() {
        return process.env.PORT;
    }

    static getJwtSecret() {
        return process.env.JWT_SECRET;
    }

    static getMongoDBConfig() {
        return {
            uri: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useFindAndModify: false,
            },
        };
    }
}
