import React from 'react'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { store } from './store'
import { Link } from 'react-router-dom'

export const getMenuItems = (): ItemType[] => {
  const entities = Array.from(store.values())
  return entities.map(({ title, path }) => ({
    key: path,
    label: <Link to={path}>{title}</Link>,
  }))
}
