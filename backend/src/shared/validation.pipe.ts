import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/* https://docs.nestjs.com/pipes */

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const failedConstraints = [];
            const messages = errors.map((error) => {
                const { constraints } = error;

                for (const key of Object.keys(constraints)) {
                    failedConstraints.push(constraints[key]);
                }
            });
            throw new BadRequestException(failedConstraints, 'Validation Failed');
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
