import React, { FC } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { getEntityMetadata, getIdFieldKey } from '../metadata-store'
import { gql, useMutation, useQuery } from '@apollo/client'
import { mutation, query } from 'gql-query-builder'
import { ColumnType } from 'antd/es/table'
import { Link, useParams } from 'react-router-dom'

interface EntityProps {
  entityType: Function
}

const { Title } = Typography

export const CreateEntity: FC<EntityProps> = ({ entityType }) => {
  const { title, fields } = getEntityMetadata(entityType)

  const { query: MUTATION } = mutation({
    operation: `create${entityType.name}`,
    fields: Array.from(fields.keys()),
    variables: {
      data: {
        type: `${entityType.name}InputWithoutId`,
        required: true,
      },
    },
  })

  const [onFinish, { loading: submitLoading }] = useMutation(gql(MUTATION))
  return (
    <>
      <Title level={1}>{title}</Title>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={async (values) => {
          const { id, ...data } = values
          const result = await onFinish({
            variables: {
              id: parseInt(id),
              data,
            },
          })
          console.log(result)
        }}>
        {Array.from(fields.entries()).map(([key, { title }]) => (
          <Form.Item key={key} label={title} name={key}>
            <Input readOnly={key === 'id'} />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
