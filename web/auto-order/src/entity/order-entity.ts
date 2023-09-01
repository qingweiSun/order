/**
 * {
 *                 "id": 327114,
 *                 "platformId": 2368,
 *                 "wmPoiId": 18541541,
 *                 "teamId": 320,
 *                 "itemId": 3,
 *                 "orderDay": 30,
 *                 "orderCost": 90,
 *                 "payStatus": 0,
 *                 "createAt": 1693210506619,
 *                 "checkDate": null,
 *                 "applyNickname": "别叫我天真",
 *                 "shopName": "浆小白·豆浆夜市（山海关集市店）"
 *             }
 */
export interface OrderEntity {
  id: number;
  platformId: number;
  wmPoiId: number;
  teamId: number;
  itemId: number;
  orderDay: number;
  orderCost: number;
  payStatus: number;
  createAt: number;
  checkDate: number;
  applyNickname: string;
  shopName: string;
  loadingPass?: boolean;
  loadingDelete?: boolean;
}
