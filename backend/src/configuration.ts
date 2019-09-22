import * as AWS from 'aws-sdk';
import * as path from 'path';
import {BadRequestException} from '@nestjs/common';

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

    static getMulterOptions(folder: string) {
        return {
            s3: new AWS.S3({credentials: Configuration.getAWSCredentials()}),
            bucket: 'global-animal-shelter',
            key: (req, file, cb) => {
                const {email} = (req as any).body;
                const ext = path.extname(file.originalname);

                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return cb(new BadRequestException('Only images are allowed'));
                }

                cb(null, `${folder}/${email}/${Date.now()}-${file.originalname}`);
            },
            acl: 'public-read',
        };
    }
}
