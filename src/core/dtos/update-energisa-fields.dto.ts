export type UpdateEnergisaFieldsDto = {
  data: {
    action: string;
    card: {
      id: number;
      pipe_id: string;
    };
  };
};
