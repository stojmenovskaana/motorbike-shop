import { helmets } from './helmets'
import { motorcycles } from './motorcycles'
import { apparel } from './apparel'
import { gadgets } from './gadgets'

export const allProducts = [
  ...helmets.map(product => ({
    ...product,
    productGroup: 'helmet',
  })),

  ...motorcycles.map(product => ({
    ...product,
    productGroup: 'motorcycle',
  })),

  ...apparel.map(product => ({
    ...product,
    productGroup: 'apparel',
  })),

  ...gadgets.map(product => ({
    ...product,
    productGroup: 'gadget',
  })),
]