import { Input } from '@nextui-org/input';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import { ShopEntity } from '@/entity/shop-entity';
import { OrderEntity } from '@/entity/order-entity';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { RenewalButton } from '@/app/components/renewal';
import { ConfirmButton } from '@/app/components/confirm-button';

export const Mt = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const [shopList, setShopList] = useState<ShopEntity[]>([]);
  const [orderList, setOrderList] = useState<OrderEntity[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isOnLine, setIsOnLine] = useState(1);

  async function search() {
    setSearchLoading(true);
    try {
      const res = await fetch('/api/mt/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopName: searchText }),
      });
      const data: any = await res.json();
      if (data.status == 0) {
        setShopList(data.data.rows);
      } else {
        toast.error('' + data.status);
      }
      setSearchLoading(false);
    } catch (error) {
      console.error(error);
      setSearchLoading(false);
    }
  }

  const [applyIng, setApplyIng] = useState(false);

  async function apply(shopEntity: ShopEntity, day: number) {
    //判断是否选择了服务
    console.log(shopEntity);
    if (
      !shopEntity.mtShopAppItemOrder1.isSelected &&
      !shopEntity.mtShopAppItemOrder3.isSelected &&
      !shopEntity.mtShopAppItemOrder6.isSelected
    ) {
      toast.error('请选择服务');
      return;
    }
    setApplyIng(true);
    if (shopEntity.mtShopAppItemOrder1.isSelected) {
      try {
        const res1 = await fetch('/api/mt/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wmPoiId: shopEntity.wmPoiId,
            itemId: 1,
            orderDay: day,
          }),
        });
        const data1: any = await res1.json();
        if (data1.status == 0) {
        } else {
          toast.error('自动出餐 + 防漏单申请失败');
          setApplyIng(false);
          return;
        }
      } catch (e) {
        setApplyIng(false);
        return;
      }
    }
    if (shopEntity.mtShopAppItemOrder3.isSelected) {
      try {
        const res3 = await fetch('/api/mt/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wmPoiId: shopEntity.wmPoiId,
            itemId: 3,
            orderDay: day,
          }),
        });
        const data3: any = await res3.json();
        if (data3.status == 0) {
        } else {
          toast.error('利润汇总+精准营销+评论回复申请失败');
          setApplyIng(false);
          return;
        }
      } catch (e) {
        setApplyIng(false);
        return;
      }
    }
    if (shopEntity.mtShopAppItemOrder6.isSelected) {
      try {
        const res6 = await fetch('/api/mt/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wmPoiId: shopEntity.wmPoiId,
            itemId: 6,
            orderDay: day,
          }),
        });
        const data6: any = await res6.json();
        if (data6.status == 0) {
        } else {
          toast.error('自动消息回复申请失败');
          setApplyIng(false);
          return;
        }
      } catch (e) {
        setApplyIng(false);
        return;
      }
    }
    setApplyIng(false);
    await getOrderList();
  }

  useEffect(() => {
    getOrderList();
  }, []);

  async function getOrderList() {
    try {
      const res = await fetch('/api/mt/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: any = await res.json();
      if (data.status == 0) {
        setIsOnLine(0);
        setOrderList(data.data.rows);
      } else {
        setIsOnLine(2);
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error));
      console.error(error);
    }
  }

  /**
   * 审核通过
   */
  async function pass(order: OrderEntity) {
    try {
      // 设置加载中
      order.loadingPass = true;
      setOrderList([...orderList]);
      const res6 = await fetch('/api/mt/pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_str: `${order.id}` }),
      });
      const data6: any = await res6.json();
      if (data6.status == 0) {
        toast.success('审核成功');
        await getOrderList();
      } else {
        toast.error('审核失败');
        order.loadingPass = false;
        setOrderList([...orderList]);
      }
    } catch (e) {
      toast.error('审核失败');
      console.log(e);
      order.loadingPass = false;
      setOrderList([...orderList]);
    }
  }

  /*拒绝*/
  async function rejection(order: OrderEntity) {
    try {
      // 设置加载中
      order.loadingDelete = true;
      setOrderList([...orderList]);
      const res6 = await fetch('/api/mt/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: `${order.id}` }),
      });
      const data6: any = await res6.json();
      if (data6.status == 0) {
        toast.success('已删除');
        await getOrderList();
      } else {
        toast.error('删除失败');
        order.loadingDelete = false;
        setOrderList([...orderList]);
      }
    } catch (e) {
      toast.error('删除失败');
      console.log(e);
      order.loadingDelete = false;
      setOrderList([...orderList]);
    }
  }

  const [passAllIng, setPassAllIng] = useState(false);

  async function passAll() {
    try {
      // 设置加载中
      setPassAllIng(true);
      orderList.forEach((order) => {
        order.loadingPass = true;
      });
      const id_str = orderList
        .map((order) => {
          return order.id;
        })
        .join(';');
      setOrderList([...orderList]);
      const res6 = await fetch('/api/mt/pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_str: id_str }),
      });
      const data6: any = await res6.json();
      if (data6.status == 0) {
        toast.success('审核成功');
        await getOrderList();
      } else {
        toast.error('审核失败');
        setPassAllIng(false);
        orderList.forEach((order) => {
          order.loadingPass = false;
        });
        setOrderList([...orderList]);
      }
    } catch (e) {
      toast.error('审核失败');
      console.error(e);
      setPassAllIng(false);
      orderList.forEach((order) => {
        order.loadingPass = false;
      });
      setOrderList([...orderList]);
    }
  }

  return (
    <div className={'flex flex-col gap-4 justify-center'}>
      <div>
        状态：
        {isOnLine == 1 && <span className={'text-yellow-500'}>检测中...</span>}
        {isOnLine == 0 && <span className={'text-green-500'}>在线</span>}
        {isOnLine == 2 && <span className={'text-red-500'}>离线</span>}
      </div>
      <div className={'text-2xl font-medium'}>申请续期</div>
      <Card>
        <CardBody>
          <div className={'flex gap-2'}>
            <Input
              type="text"
              placeholder="请输入要搜索的店铺"
              variant={'bordered'}
              color={'primary'}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <Button
              color="primary"
              isDisabled={searchText.length == 0}
              onClick={search}
              isLoading={searchLoading}
            >
              搜索
            </Button>
          </div>
        </CardBody>
      </Card>
      {shopList.length == 0 && (
        <div className={'flex flex-col justify-center items-center'}>
          <Image
            src={'./empty.svg'}
            alt={''}
            width={220}
            height={300}
            className={'p-2'}
          />
        </div>
      )}
      {shopList.map((shop, index) => {
        return (
          <Card key={index}>
            <CardBody className={'flex flex-col gap-4'}>
              <div className={'flex flex-row justify-center items-center'}>
                <div className={'text-medium font-medium flex-1'}>
                  {shop.shopName}
                </div>
                <RenewalButton
                  isDisabled={
                    !shop.mtShopAppItemOrder1.isSelected &&
                    !shop.mtShopAppItemOrder3.isSelected &&
                    !shop.mtShopAppItemOrder6.isSelected
                  }
                  applyIng={applyIng}
                  apply={async (day) => {
                    await apply(shop, day);
                  }}
                />
              </div>
              <Divider />
              <div
                className={'flex justify-between flex-col md:flex-row gap-1'}
              >
                <Checkbox
                  isSelected={shop.mtShopAppItemOrder1.isSelected}
                  onValueChange={(isSelected) => {
                    shop.mtShopAppItemOrder1.isSelected = isSelected;
                    setShopList([...shopList]);
                  }}
                >
                  自动出餐 + 防漏单
                </Checkbox>
                <div className={'text-gray-500 text-sm'}>
                  到期时间：
                  {formatTime(shop.mtShopAppItemOrder1.serviceValidDate)}
                </div>
              </div>
              <div
                className={'flex justify-between flex-col md:flex-row gap-1'}
              >
                <Checkbox
                  isSelected={shop.mtShopAppItemOrder3.isSelected}
                  onValueChange={(isSelected) => {
                    shop.mtShopAppItemOrder3.isSelected = isSelected;
                    setShopList([...shopList]);
                  }}
                >
                  利润汇总+精准营销+评论回复
                </Checkbox>
                <div className={'text-gray-500 text-sm'}>
                  到期时间：
                  {formatTime(shop.mtShopAppItemOrder3.serviceValidDate)}
                </div>
              </div>
              <div
                className={'flex justify-between flex-col md:flex-row gap-1'}
              >
                <Checkbox
                  isSelected={shop.mtShopAppItemOrder6.isSelected}
                  onValueChange={(isSelected) => {
                    shop.mtShopAppItemOrder6.isSelected = isSelected;
                    setShopList([...shopList]);
                  }}
                >
                  自动消息回复
                </Checkbox>
                <div className={'text-gray-500 text-sm'}>
                  到期时间：
                  {formatTime(shop.mtShopAppItemOrder6.serviceValidDate)}
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
      <div className={'flex flex-row items-center'}>
        <div className={'text-2xl font-medium flex-1'}>审核列表</div>
        <ConfirmButton
          color={'primary'}
          variant={'shadow'}
          isLoading={passAllIng}
          isDisabled={orderList.length === 0}
          title={'注意'}
          description={'确定要全部通过么？'}
          text={'全部通过'}
          onConfirm={passAll}
        />
      </div>
      {orderList.length == 0 && (
        <div className={'flex flex-col justify-center items-center'}>
          <Image
            src={'./empty.svg'}
            alt={''}
            width={220}
            height={300}
            className={'p-2'}
          />
        </div>
      )}
      {orderList.map((order, index) => {
        return (
          <Card key={index}>
            <CardBody className={'flex flex-col gap-4'}>
              <div className={'flex flex-row justify-center items-center'}>
                <div className={'text-medium font-medium flex-1'}>
                  {order.shopName}
                </div>
                <div className={'flex gap-2'}>
                  <ConfirmButton
                    variant={'flat'}
                    color={'primary'}
                    isDisabled={false}
                    isLoading={order.loadingPass ?? false}
                    title={'注意'}
                    description={'确定要审核通过么？'}
                    text={'通过'}
                    onConfirm={async () => {
                      await pass(order);
                    }}
                  />
                  <ConfirmButton
                    variant={'flat'}
                    color={'danger'}
                    isDisabled={false}
                    isLoading={order.loadingDelete ?? false}
                    title={'注意'}
                    description={'确定要删除么'}
                    text={'拒绝'}
                    onConfirm={async () => {
                      await rejection(order);
                    }}
                  />
                </div>
              </div>
              <Divider />
              <div>
                {order.itemId == 1 && <div>续期类型：自动出餐 + 防漏单</div>}
                {order.itemId == 3 && (
                  <div>续期类型：利润汇总+精准营销+评论回复</div>
                )}
                {order.itemId == 6 && <div>续期类型：自动消息回复</div>}
              </div>
              <div>续期天数：{order.orderDay} 天</div>
              <div>消耗点数：{order.orderCost} 点</div>
              <div>申请时间：{formatTime(order.createAt)}</div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

/**
 * 将 1705703135000 转换为 2024-01-18 17:05:35
 */
function formatTime(time: number) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}
