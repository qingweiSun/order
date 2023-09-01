import { Module } from '@nestjs/common';
import { MtController } from './mt.controller';
import { MtService } from './mt.service';
import { JsessionidModule } from '../../database/jsessionid/jsessionid.module';

@Module({
  imports: [JsessionidModule],
  controllers: [MtController],
  providers: [MtService],
})
export class MtModule {}
