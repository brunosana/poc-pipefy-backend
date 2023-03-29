export type AllWebhooksInput = {
  pipeId: number;
};

export type AllWebhooksOutput = {
  webhooks: {
    id: string;
    actions: string[];
    url: string;
    email: string;
    headers: string;
  }[];
};
