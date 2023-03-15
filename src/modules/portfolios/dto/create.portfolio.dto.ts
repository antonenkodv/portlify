import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreatePortfolioDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    description: string;

}
