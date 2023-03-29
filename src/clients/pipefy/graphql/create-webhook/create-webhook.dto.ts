export type CreateWebhookInput = {
  actions: string[];
  name: string;
  pipe_id: number;
  url: string;
};

export type CreateWebhookOutput = {
  webhook: {
    id: string;
    actions: string[];
    url: string;
  };
};
