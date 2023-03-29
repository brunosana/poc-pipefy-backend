import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { UpdateFieldsInput } from './update-fields.dto';
import {
  updateFieldsMutation,
  UpdateFieldsMutationOutput,
} from './update-fields.query';

@Injectable()
export class UpdateFields {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ fields, nodeId }: UpdateFieldsInput): Promise<void> {
    const response =
      await this.graphqlClient.request<UpdateFieldsMutationOutput>(
        updateFieldsMutation,
        {
          input: {
            nodeId,
            values: fields,
          },
        },
      );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }
  }
}
