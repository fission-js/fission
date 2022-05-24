import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { store } from './store'

export const getMenuItems = (): ItemType[] => {
  const entities = Array.from(store.values())
  return entities.map(({ title, path }) => ({
    key: path,
    label: title,
  }))
}
