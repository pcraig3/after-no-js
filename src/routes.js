import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/About'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/form',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/Form'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/validation',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/Validation'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
]
