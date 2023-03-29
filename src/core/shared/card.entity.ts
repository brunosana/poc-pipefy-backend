export type CardEntity = {
  pipe: {
    id: string;
    name: string;
  };
  fields: {
    name: string;
    value: string;
    filled_at: string;
  }[];
  current_phase: {
    id: string;
    name: string;
  };
  assignees: {
    name: string;
    email: string;
  }[];
};
