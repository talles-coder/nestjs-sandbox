import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'First name of the user',
        example: 'João or Paula',
    })
    firstName: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Last name of the user',
        example: 'Silva',
    })
    lastName: string;
}