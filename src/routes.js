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
    path: '/values',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/Values'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/theme',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/Theme'),
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
]
