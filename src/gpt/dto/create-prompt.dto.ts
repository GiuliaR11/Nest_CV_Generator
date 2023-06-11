import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  text: string;
}
