import { PipefyActionValues } from '@core/dtos/create-webhook.dto';

export class CreateWebhookPayload {
  actions: PipefyActionValues[];
  name: string;
  url: string;
}
