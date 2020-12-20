/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { memo, useEffect } from 'react';

import { GhRepo } from 'github/type';
import { useGhState, useTrending } from 'github';
import Header from 'components/Header';
import ReopLayout from 'components/ReopLayout';

// import data from './data.test.json';
// const repos = data.items as GhRepo[];

const HomeView = () => {
  const ghState: any = useGhState();
  const [fetch] = useTrending();

  useEffect(() => {
    // fetch({});
  }, []);

  // if (!list) {
  //   return <div>loading...</div>;
  // }

  return (
    <div className="page-container">
      <Header />
      <ReopLayout />
    </div>
  );
};

export default memo(HomeView);
