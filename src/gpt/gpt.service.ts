import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { OpenAIModels } from 'src/enums';

@Injectable()
export class GptService {
  async promptGpt(
    prompt: string,
    model: OpenAIModels = OpenAIModels.Ada,
    maxTokens = 1,
    temperature = 1,
  ): Promise<any> {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
    });

    return response.data.choices.map(({ text }) => text);
  }
}
