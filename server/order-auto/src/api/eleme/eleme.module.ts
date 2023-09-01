import { Module } from '@nestjs/common';
import { ElemeController } from './eleme.controller';
import { ElemeService } from './eleme.service';
import { JsessionidModule } from '../../database/jsessionid/jsessionid.module';

@Module({
  imports: [JsessionidModule],
  controllers: [ElemeController],
  providers: [ElemeService],
})
export class ElemeModule {}
