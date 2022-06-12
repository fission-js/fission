import React, { FC } from 'react'
import { Button, Table, Typography } from 'antd'
import { getEntityMetadata, getIdFieldKey } from '../metadata-store'
import { gql, useQuery } from '@apollo/client'
import { query } from 'gql-query-builder'
import { ColumnType } from 'antd/es/table'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

interface EntityListProps {
  entityType: Function
}

const { Title } = Typography

export const EntityList: FC<EntityListProps> = ({
  entityType,
}: EntityListProps) => {
  const { title, fields } = getEntityMetadata(entityType)
  const queryName = `get${entityType.name}List`
  const { query: QUERY } = query({
    operation: queryName,
    fields: Array.from(fields.keys()),
  })
  const idColumnKey = getIdFieldKey(entityType)
  const columns: ColumnType<any>[] = Array.from(fields.entries()).map(
    ([key, { title }]) => ({
      dataIndex: key,
      title,
      render: (text, record) => <Link to={record[idColumnKey]}>{text}</Link>,
    }),
  )
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
        <Table
          dataSource={data[queryName]}
          columns={columns}
          rowKey={idColumnKey}
        />
      ) : null}
    </>
  )
}
