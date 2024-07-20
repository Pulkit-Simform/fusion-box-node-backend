import { IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    users: number;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsNumber()
    @Max(100)
    @Min(0)
    @IsNotEmpty()
    progress: number;
}
