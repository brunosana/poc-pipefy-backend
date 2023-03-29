export type UpdateFieldsInputDto = {
  nodeId: number;
  fields: {
    fieldId: string;
    value: number | string;
  }[];
};
