/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import { lazy } from 'react';
import { RouteOption } from 'router/types';

const routes: RouteOption[] = [
  {
    path: '/',
    component: lazy(() => import('views/home')),
  },
];

export default routes;
