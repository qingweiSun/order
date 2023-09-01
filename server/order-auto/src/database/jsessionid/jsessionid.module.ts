import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { JsessionidService } from './jsessionid.service';
import { jsessionidProviders } from './jsessionid.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...jsessionidProviders, JsessionidService],
  exports: [JsessionidService],
})
export class JsessionidModule {}
