import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { GptService } from './gpt.service';
import { Response } from 'express';
import { OpenAIModels } from 'src/enums';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get()
  async promptGpt(@Body() promptDto: CreatePromptDto, @Res() res: Response) {
    const prompt = 'Create a CV description for a React software developer';
    const maxLength = 100;
    const data = {
      prompt,
      ada: await this.gptService.promptGpt(prompt, OpenAIModels.Ada, maxLength),
      bbg: await this.gptService.promptGpt(
        prompt,
        OpenAIModels.Babbage,
        maxLength,
      ),
      curie: await this.gptService.promptGpt(
        prompt,
        OpenAIModels.Curie,
        maxLength,
      ),
      dv2: await this.gptService.promptGpt(
        prompt,
        OpenAIModels.Davinci2,
        maxLength,
      ),
      dv3: await this.gptService.promptGpt(
        prompt,
        OpenAIModels.Davinci3,
        maxLength,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }
}
