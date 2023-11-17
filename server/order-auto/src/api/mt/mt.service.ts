import { Injectable } from '@nestjs/common';
import { mtHeaders } from './head';
import { JsessionidService } from '../../database/jsessionid/jsessionid.service';
import { JsessionidEntity } from '../../database/jsessionid/jsessionid.entity';
import axios from 'axios';
export interface ApplyParam {
  wmPoiId: string;
  orderDay: string;
  itemId: string;
}

export interface DeleteParam {
  id: number;
}

export interface PassParam {
  id_str: string;
}

export interface SearchParam {
  shopName: string;
}

export interface UploadParam {
  jsessionid: string;
}

@Injectable()
export class MtService {
  constructor(private readonly jsessionidService: JsessionidService) {
    // axios.interceptors.request.use(function (config) {
    //   // Do something before request is sent
    //   console.log('axios.interceptors.request', config);
    //   return config;
    // });
  }

  /**
   * 申请
   * @param reqBody
   */
  async apply(reqBody: ApplyParam) {
    const jsessionidEntity = await this.jsessionidService.getJsessionid('mt');
    const response = await axios(
      'https://pmt.qiyusoft.cn/meituan/team/save_apply.json',
      {
        method: 'POST',
        headers: await mtHeaders(jsessionidEntity?.jsessionid ?? ''),
        data: JSON.stringify({
          wmPoiId: reqBody.wmPoiId,
          orderDay: reqBody.orderDay,
          itemId: reqBody.itemId,
        }),
      },
    );
    return response.data;
  }

  /**
   * 待审核列表
   */
  async order() {
    try {
      const jsessionidEntity = await this.jsessionidService.getJsessionid('mt');
      const response = await axios(
        'https://pmt.qiyusoft.cn/meituan/team/order_apply.json',
        {
          method: 'POST',
          headers: {
            ...(await mtHeaders(jsessionidEntity?.jsessionid ?? '')),
          },
          data: JSON.stringify({
            limit: 15,
            offset: 0,
          }),
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return JSON.stringify(e);
    }
  }

  /**
   * 审核审核记录
   * @param reqBody
   */
  async delete(reqBody: DeleteParam) {
    const jsessionidEntity = await this.jsessionidService.getJsessionid('mt');
    const response = await axios(
      'https://pmt.qiyusoft.cn/meituan/team/del_order_check.json',
      {
        method: 'POST',
        headers: await mtHeaders(jsessionidEntity?.jsessionid ?? ''),
        data: JSON.stringify({
          id: reqBody.id,
        }),
      },
    );
    return response.data;
  }

  /**
   * 通过审核
   * @param param
   */
  async pass(param: PassParam) {
    const jsessionidEntity = await this.jsessionidService.getJsessionid('mt');
    const response = await axios(
      'https://pmt.qiyusoft.cn/meituan/team/do_order_check_more.json',
      {
        method: 'POST',
        headers: await mtHeaders(jsessionidEntity?.jsessionid ?? ''),
        data: JSON.stringify({
          id_str: param.id_str, //"327111;327112;327113",
          passwd: '123456',
        }),
      },
    );
    return response.data;
  }

  async search(param: SearchParam) {
    const jsessionidEntity = await this.jsessionidService.getJsessionid('mt');
    const response = await axios(
      'https://pmt.qiyusoft.cn/meituan/team/shop.json',
      {
        method: 'POST',
        headers: await mtHeaders(jsessionidEntity?.jsessionid ?? ''),
        data: JSON.stringify({
          limit: 10,
          offset: 0,
          shopName: param.shopName,
          teamId: '',
        }),
      },
    );
    return response.data;
  }

  upload(param: UploadParam) {
    return this.jsessionidService.saveJsessionid(
      new JsessionidEntity(param.jsessionid, 'mt'),
    );
  }

  jsessionid() {
    return this.jsessionidService.getJsessionid('mt');
  }
}
