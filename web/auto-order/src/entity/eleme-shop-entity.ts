export interface ElemeShopEntity {
  shopName: string;
  teamName: string;
  shopId: number;
  platformId: number;
  createAt: string;
  token: string;
  remian_day4: number;
  remian_day3: number;
  remian_day2: number;
  remian_day1: number;
  remian_day6: number;
  remian_day5: number;
  onlineTitle: string;
  //1：自动出餐+防漏单3：利润汇总+精准营销+评论回复+评论回复6：自动消息回复
  shopAppItemOrder1: {
    id: number;
    platformId: number;
    wmPoiId: number;
    teamId: number;
    itemId: number;
    serviceValidDate: number;
    updateAt: number;
    isSelected: boolean;
  };
  //1：自动出餐+防漏单3：利润汇总+精准营销+评论回复+评论回复6：自动消息回复
  shopAppItemOrder3: {
    id: number;
    platformId: number;
    wmPoiId: number;
    teamId: number;
    itemId: number;
    serviceValidDate: number;
    updateAt: number;
    isSelected: boolean;
  };
}
