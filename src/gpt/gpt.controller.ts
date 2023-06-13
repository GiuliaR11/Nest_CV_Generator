import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreatePromptBodyDto } from './dto/create-prompt-body.dto';
import { GptService } from './gpt.service';
import { Response } from 'express';
import { OpenAIModels } from 'src/enums';
import { CreatePromptResponseDto } from './dto/create-prompt-response.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get('/models/all/prompt/sample')
  async getSample(@Res() res: Response) {
    const prompt = 'Create a CV description for a React software developer';
    const maxLength = 1;
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

  @Post('/models/ada/prompt')
  async createPromptAda(
    @Body() promptDto: CreatePromptBodyDto,
    @Res() res: Response<CreatePromptResponseDto>,
  ) {
    const data = {
      prompt: promptDto.text,
      completions: await this.gptService.promptGpt(
        promptDto.text,
        OpenAIModels.Ada,
        promptDto.maxTokens,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/models/babbage/prompt')
  async createPromptBabbage(
    @Body() promptDto: CreatePromptBodyDto,
    @Res() res: Response<CreatePromptResponseDto>,
  ) {
    const data = {
      prompt: promptDto.text,
      completions: await this.gptService.promptGpt(
        promptDto.text,
        OpenAIModels.Babbage,
        promptDto.maxTokens,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/models/curie/prompt')
  async createPromptCurie(
    @Body() promptDto: CreatePromptBodyDto,
    @Res() res: Response<CreatePromptResponseDto>,
  ) {
    const data = {
      prompt: promptDto.text,
      completions: await this.gptService.promptGpt(
        promptDto.text,
        OpenAIModels.Curie,
        promptDto.maxTokens,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/models/davinci2/prompt')
  async createPromptDavinci2(
    @Body() promptDto: CreatePromptBodyDto,
    @Res() res: Response<CreatePromptResponseDto>,
  ) {
    const data = {
      prompt: promptDto.text,
      completions: await this.gptService.promptGpt(
        promptDto.text,
        OpenAIModels.Davinci2,
        promptDto.maxTokens,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/models/davinci3/prompt')
  async createPromptDavinci3(
    @Body() promptDto: CreatePromptBodyDto,
    @Res() res: Response<CreatePromptResponseDto>,
  ) {
    const data = {
      prompt: promptDto.text,
      completions: await this.gptService.promptGpt(
        promptDto.text,
        OpenAIModels.Davinci3,
        promptDto.maxTokens,
      ),
    };

    return res.status(HttpStatus.OK).json(data);
  }
}
