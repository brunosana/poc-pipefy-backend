export type UpdateFieldsInput = {
  nodeId: number;
  fields: {
    fieldId: string;
    value: number | string;
  }[];
};
