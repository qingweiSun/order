import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JsessionidEntity } from './jsessionid.entity';

@Injectable()
export class JsessionidService {
  constructor(
    @Inject('JSESSIONID_REPOSITORY')
    private jsessionidEntityRepository: Repository<JsessionidEntity>,
  ) {}

  /**
   * 根据type美团获取JSESSIONID
   */
  getJsessionid(type: string): Promise<JsessionidEntity | null> {
    return this.jsessionidEntityRepository.findOne({
      where: { type },
    });
  }

  /**
   * 删除全部，重新写入
   */
  saveJsessionid(jsessionidEntity: JsessionidEntity) {
    this.jsessionidEntityRepository.delete({ type: jsessionidEntity.type });
    return this.jsessionidEntityRepository.save(jsessionidEntity);
  }
}
