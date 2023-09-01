import { DataSource } from 'typeorm';
import { JsessionidEntity } from './jsessionid/jsessionid.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '43.142.234.117',
        port: 3306,
        username: 'order-auto',
        password: 'Zhsp3Sk3ireZ2hpM',
        database: 'order-auto',
        entities: [JsessionidEntity],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
