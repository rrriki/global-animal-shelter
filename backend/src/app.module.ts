import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Configuration} from './configuration';
import {PetModule} from './pets/pet.module';

const mongoConfig = Configuration.getMongoDBConfig();

@Module({
    imports: [
        MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
        PetModule,
    ],
})
export class AppModule {
}
