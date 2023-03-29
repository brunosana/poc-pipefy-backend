type IsPipefyRequestErrorType = {
  isError: boolean;
  messages?: string[];
};

type PipefyGraphqlError = {
  errors: {
    message: string;
    locations: {
      line: number;
      column: number;
    }[];
    path: string[];
    code: number;
    type: string;
  }[];
};

export function isPipefyRequestError(input: any): IsPipefyRequestErrorType {
  if (Array.isArray(input?.errors)) {
    const grapqhlResponse: PipefyGraphqlError = input;
    const errors: string[] = [];

    grapqhlResponse.errors.forEach((err) => {
      errors.push(err.message);
    });

    return {
      isError: true,
      messages: errors,
    };
  }

  return {
    isError: false,
  };
}
