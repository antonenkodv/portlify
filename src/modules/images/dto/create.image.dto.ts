

import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateImageDto{

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    portfolio_id: string;

}
