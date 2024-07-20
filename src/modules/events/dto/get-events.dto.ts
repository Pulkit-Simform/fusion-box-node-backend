import { IsDate, IsNotEmpty } from "class-validator";

export class GetEventsDTO {
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;
}