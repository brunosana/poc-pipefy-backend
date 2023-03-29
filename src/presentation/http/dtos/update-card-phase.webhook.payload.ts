export class UpdateCardPhaseWebhookPayload {
  data: {
    action: string;
    from: {
      id: number;
      name: string;
    };
    to: {
      id: number;
      name: string;
    };
    moved_by: {
      id: number;
      name: string;
      username: string;
      email: string;
      avatar_url: string;
    };
    card: {
      id: number;
      title: string;
      pipe_id: string;
    };
  };
}
