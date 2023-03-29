import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation.module';

@Module({
  imports: [PresentationModule],
})
export class RootModule {}
