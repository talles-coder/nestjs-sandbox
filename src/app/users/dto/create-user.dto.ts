import { isEmail, IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from "src/app/utils/regex.utils";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password)
    password: string;
}