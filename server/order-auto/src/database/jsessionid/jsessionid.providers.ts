import { DataSource } from 'typeorm';
import { JsessionidEntity } from './jsessionid.entity';

export const jsessionidProviders = [
  {
    provide: 'JSESSIONID_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(JsessionidEntity),
    inject: ['DATA_SOURCE'],
  },
];
