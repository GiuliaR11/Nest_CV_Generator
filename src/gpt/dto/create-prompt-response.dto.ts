import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePromptResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty()
  completions: string[];
}
