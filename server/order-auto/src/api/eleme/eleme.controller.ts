import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApplyParam,
  DeleteParam,
  ElemeService,
  PassParam,
  SearchParam,
  UploadParam,
} from './eleme.service';

@Controller('api/eleme')
export class ElemeController {
  constructor(private readonly mtService: ElemeService) {}

  @Post('apply')
  @HttpCode(200)
  apply(@Body() param: ApplyParam) {
    return this.mtService.apply(param);
  }

  @Post('order')
  @HttpCode(200)
  order() {
    return this.mtService.order();
  }

  @Post('delete')
  @HttpCode(200)
  delete(@Body() param: DeleteParam) {
    return this.mtService.delete(param);
  }

  @Post('pass')
  @HttpCode(200)
  pass(@Body() param: PassParam) {
    return this.mtService.pass(param);
  }

  @Post('search')
  @HttpCode(200)
  search(@Body() param: SearchParam) {
    return this.mtService.search(param);
  }

  @Post('upload')
  @HttpCode(200)
  upload(@Body() param: UploadParam) {
    return this.mtService.upload(param);
  }
  @Post('jsessionid')
  @HttpCode(200)
  jsessionid() {
    return this.mtService.jsessionid();
  }
}
