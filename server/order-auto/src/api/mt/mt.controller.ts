import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import {
  ApplyParam,
  DeleteParam,
  MtService,
  PassParam,
  SearchParam,
  UploadParam,
} from './mt.service';
import { Request } from 'express';

@Controller('api/mt')
export class MtController {
  constructor(private readonly mtService: MtService) {}

  @Post('apply')
  @HttpCode(200)
  apply(@Body() param: ApplyParam) {
    return this.mtService.apply(param);
  }

  @Post('order')
  @HttpCode(200)
  order(@Req() request: Request) {
    return this.mtService.order(request);
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
}
