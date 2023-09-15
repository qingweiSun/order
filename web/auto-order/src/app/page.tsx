'use client';
import { Tab, Tabs } from '@nextui-org/react';
import React, { useState } from 'react';
import { Mt } from '@/app/components/Mt';
import { Toaster } from 'react-hot-toast';
import { Eleme } from '@/app/components/Eleme';

/**
 * 首页
 * @constructorx
 */
export default function Home() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={'w-screen flex justify-center h-screen'}>
      <main className="flex flex-col px-2 pt-4 w-full max-w-[580px] bg-white md:pt-8 overflow-y-scroll gap-4 md:px-4">
        <Tabs aria-label="Options">
          <Tab key="mt" title="美团外卖">
            <Mt setSearchText={setSearchText} searchText={searchText} />
          </Tab>
          <Tab key="eleme" title="饿了么">
            <Eleme setSearchText={setSearchText} searchText={searchText} />
          </Tab>
        </Tabs>
        <div />
      </main>
      <Toaster
        toastOptions={{
          style: {
            paddingRight: 6,
            paddingLeft: 16,
            borderRadius: 10,
          },
        }}
      />
    </div>
  );
}
