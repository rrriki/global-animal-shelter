import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration } from './configuration';
import { PetModule } from './pets/pet.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

const mongoConfig = Configuration.getMongoDBConfig();

@Module({
    imports: [
        MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
        AuthModule,
        UserModule,
        PetModule,
    ],
    controllers: [],
})
export class AppModule {
}
