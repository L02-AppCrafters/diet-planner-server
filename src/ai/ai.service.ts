import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

type RecognizedRecipe = {
  isRelevantFoodImage?: boolean;
  rejectionReason?: string;
  recipeName: string;
  description: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  category: string[];
  cookTime: number;
  serveTo: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  ingredients: Array<{ ingredient: string; quantity?: string }>;
  steps: string[];
};

@Injectable()
export class AiService {
  constructor(private readonly configService: ConfigService) {}

  async recognizeFoodFromImage(imageBase64: string, prompt?: string) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const model = this.configService.get<string>('OPENAI_VISION_MODEL') ?? 'gpt-4.1-mini';

    if (!apiKey) {
      throw new InternalServerErrorException('OPENAI_API_KEY is not configured.');
    }

    const isAllowedImage = await this.classifyFoodImage(apiKey, model, imageBase64);
    if (!isAllowedImage.allowed) {
      throw new BadRequestException(
        isAllowedImage.reason || 'This image is not a valid food, drink, or fruit photo.',
      );
    }

    const instruction =
      prompt ??
      'Identify this food dish and return one concrete recipe suggestion with real dish name and a specific description (not generic placeholders). Estimate nutrition and provide practical ingredients/steps.';

    const schemaHint = `Return strict JSON with keys:
isRelevantFoodImage(boolean), rejectionReason(string, optional), recipeName, description, mealType(one of breakfast/lunch/dinner/snack), category(array of strings), cookTime(number, minutes), serveTo(number), calories(number), proteins(number), carbs(number), fats(number), ingredients(array of {ingredient, quantity?}), steps(array of strings).`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `${instruction}\n${schemaHint}\nRules:\n- Set isRelevantFoodImage=true only when image clearly contains food, drink, or fruit.\n- If image is not food/drink/fruit, set isRelevantFoodImage=false and provide rejectionReason.\n- recipeName must be specific dish name.\n- description must be 1-2 concrete sentences about dish ingredients/flavor.\n- Do not use placeholder text.\nOnly output JSON.`,
              },
              { type: 'input_image', image_url: imageBase64 },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new InternalServerErrorException(`AI provider error: ${errorText}`);
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{
          type?: string;
          text?: string;
        }>;
      }>;
    };
    const modelText = this.extractModelText(data);
    const parsed = this.parseJsonRecipe(modelText);
    if (parsed.isRelevantFoodImage === false) {
      throw new BadRequestException(
        parsed.rejectionReason?.trim() || 'This image is not a valid food, drink, or fruit photo.',
      );
    }

    return {
      imageUrl: await this.persistImageAndGetUrl(imageBase64),
      recognized: parsed,
    };
  }

  private async classifyFoodImage(apiKey: string, model: string, imageBase64: string) {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text:
                  'Classify this image. Return ONLY JSON: {"allowed": boolean, "reason": string}. allowed=true only if the primary subject is food, drink, or fruit intended for human consumption. For animals, people, documents, landscapes, products, objects, set allowed=false.',
              },
              { type: 'input_image', image_url: imageBase64 },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new InternalServerErrorException(`AI provider error: ${errorText}`);
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{
          type?: string;
          text?: string;
        }>;
      }>;
    };

    const text = this.extractModelText(data);
    const payloadText = this.extractJsonPayload(text);
    const parsed = JSON.parse(payloadText) as { allowed?: boolean; reason?: string };

    return {
      allowed: parsed.allowed === true,
      reason: parsed.reason?.trim(),
    };
  }

  private parseJsonRecipe(text: string): RecognizedRecipe {
    const jsonText = this.extractJsonPayload(text);
    const value = JSON.parse(jsonText) as Partial<RecognizedRecipe>;

    return {
      recipeName: value.recipeName?.trim() || 'AI Recipe',
      description: value.description?.trim() || 'Recognized from image.',
      mealType: this.safeMealType(value.mealType),
      category: Array.isArray(value.category) ? value.category.filter(Boolean).slice(0, 4) : ['Snack'],
      cookTime: this.toPositiveNumber(value.cookTime, 15),
      serveTo: this.toPositiveNumber(value.serveTo, 1),
      calories: this.toPositiveNumber(value.calories, 200),
      proteins: this.toPositiveNumber(value.proteins, 10),
      carbs: this.toPositiveNumber(value.carbs, 20),
      fats: this.toPositiveNumber(value.fats, 8),
      ingredients: Array.isArray(value.ingredients)
        ? value.ingredients
            .map((item) => ({
              ingredient: item?.ingredient?.trim() ?? '',
              quantity: item?.quantity?.trim() || undefined,
            }))
            .filter((item) => item.ingredient)
            .slice(0, 20)
        : [],
      steps: Array.isArray(value.steps) ? value.steps.map((step) => step?.trim()).filter(Boolean).slice(0, 20) : [],
    };
  }

  private extractModelText(data: {
    output_text?: string;
    output?: Array<{
      content?: Array<{
        type?: string;
        text?: string;
      }>;
    }>;
  }) {
    if (data.output_text?.trim()) {
      return data.output_text;
    }

    const chunks: string[] = [];
    for (const item of data.output ?? []) {
      for (const content of item.content ?? []) {
        if (content.type === 'output_text' && content.text) {
          chunks.push(content.text);
        }
      }
    }

    return chunks.join('\n').trim() || '{}';
  }

  private extractJsonPayload(rawText: string) {
    const trimmed = rawText.trim();
    const withoutFence = trimmed.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();

    if (withoutFence.startsWith('{') && withoutFence.endsWith('}')) {
      return withoutFence;
    }

    const firstBrace = withoutFence.indexOf('{');
    const lastBrace = withoutFence.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      return withoutFence.slice(firstBrace, lastBrace + 1);
    }

    throw new InternalServerErrorException('AI response did not contain valid JSON.');
  }

  private toPositiveNumber(value: unknown, fallback: number) {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) {
      return fallback;
    }
    return Math.round(num);
  }

  private safeMealType(value: unknown): RecognizedRecipe['mealType'] {
    const meal = String(value ?? '').toLowerCase();
    if (meal === 'breakfast' || meal === 'lunch' || meal === 'dinner' || meal === 'snack') {
      return meal;
    }
    return 'snack';
  }

  private async persistImageAndGetUrl(imageBase64: string) {
    const match = imageBase64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) {
      return '';
    }

    const mimeType = match[1];
    const base64Payload = match[2];
    const extension = mimeType.includes('png') ? 'png' : 'jpg';
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const uploadDir = join(process.cwd(), 'public', 'recipes', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, fileName), Buffer.from(base64Payload, 'base64'));

    const publicBaseUrl =
      this.configService.get<string>('PUBLIC_BASE_URL') ??
      this.configService.get<string>('HEALTH_CHECK_URL')?.replace(/\/health\/?$/, '') ??
      'http://localhost:4000';

    return `${publicBaseUrl.replace(/\/$/, '')}/recipes/uploads/${fileName}`;
  }
}
