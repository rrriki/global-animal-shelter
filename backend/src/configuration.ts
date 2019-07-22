export class Configuration {

    static getPort(): number {
        return +process.env.PORT;
    }

    static getJwtSecret(): string {
        return process.env.JWT_SECRET;
    }

    static getJwtExpirationSeconds(): number {
        return 3600;
    }

    static getMongoDBConfig() {
        return {
            uri: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            },
        };
    }

    static getAWSCredentials() {
        return {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
            region: process.env.AWS_REGION,
        };
    }
}
