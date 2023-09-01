import { Module } from '@nestjs/common';
import { MtModule } from './api/mt/mt.module';
import { ElemeModule } from './api/eleme/eleme.module';

@Module({
  imports: [MtModule, ElemeModule],
})
export class AppModule {}
