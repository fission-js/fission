import React from 'react'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { store } from '../../common'
import { Link } from 'react-router-dom'

export const getMenuItems = (): ItemType[] => {
  const entities = store.getEntities()
  return entities.map(({ title, path }) => ({
    key: path,
    label: <Link to={path}>{title}</Link>,
  }))
}
