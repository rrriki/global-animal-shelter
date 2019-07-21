import * as fs from 'fs';
import * as path from 'path';

export class Configuration {

    static PUBLIC_FOLDER = 'public';

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

    static getPublicUploadsDirectory(folder?: string): string {

        let uploadPath = path.join(__dirname, '..', Configuration.PUBLIC_FOLDER);

        if (folder) {
            uploadPath = path.join(uploadPath, folder);
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true}); // Node V. >= 10.12
        }

        return uploadPath;
    }
}
