import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'hello',
})
export class HelloController {
  @Get()
  async getHello(): Promise<{ message: string }> {
    return Promise.resolve({ message: 'Hello World' });
  }
}
