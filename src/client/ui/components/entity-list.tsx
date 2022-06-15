import React, { FC } from 'react'
import { Button, Table, Typography } from 'antd'
import { EntityBasedComponent, EntityIdType, store } from '../../../common'
import { gql, useQuery } from '@apollo/client'
import { query } from 'gql-query-builder'
import { ColumnType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'

type EntityListProps<T extends EntityIdType = number> = EntityBasedComponent<T>

const { Title } = Typography

export const EntityList = <T extends EntityIdType = number>({
  EntityClass,
}: EntityListProps<T>) => {
  const { title } = store.getEntityMetadata(EntityClass)
  const fields = store.getEntityFields(EntityClass)
  const queryName = `get${EntityClass.name}List`
  const { query: QUERY } = query({
    operation: queryName,
    fields: fields.map(({ name }) => name),
  })
  const columns: ColumnType<any>[] = fields.map(({ title, name }) => ({
    dataIndex: name,
    title,
    render: (text, record) => <Link to={record.id}>{text}</Link>,
  }))
  const { loading, error, data } = useQuery(gql(QUERY))
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate('create')
  }
  return (
    <>
      <Title level={1}>{title}</Title>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      {!loading && !error ? (
        <Table dataSource={data[queryName]} columns={columns} rowKey="id" />
      ) : null}
    </>
  )
}
