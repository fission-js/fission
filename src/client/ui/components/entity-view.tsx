import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { EntityBasedComponent, EntityIdType, store } from '../../../common'
import { gql, useMutation, useQuery } from '@apollo/client'
import { mutation, query } from 'gql-query-builder'
import { useParams } from 'react-router-dom'

type EntityProps<T extends EntityIdType = number> = EntityBasedComponent<T>

const { Title } = Typography

export const EntityView = <T extends EntityIdType = number>({
  EntityClass,
}: EntityProps<T>) => {
  const { title } = store.getEntityMetadata(EntityClass)
  const fields = store.getEntityFields(EntityClass)
  const queryName = `get${EntityClass.name}ById`
  const { id } = useParams()
  const { query: QUERY } = query({
    operation: queryName,
    fields: fields.map(({ name }) => name),
    variables: {
      id: {
        type: 'Float',
        value: parseInt(id),
        required: true,
      },
    },
  })
  const { loading, error, data } = useQuery(gql(QUERY), {
    variables: { id: parseInt(id) },
  })

  const { query: MUTATION } = mutation({
    operation: `update${EntityClass.name}`,
    fields: fields.map(({ name }) => name),
    variables: {
      data: {
        type: `${EntityClass.name}InputWithoutId`,
        required: true,
      },
      id: {
        type: 'Float',
        required: true,
      },
    },
  })

  const [onFinish, { loading: submitLoading }] = useMutation(gql(MUTATION))
  return (
    <>
      <Title level={1}>{title}</Title>
      {!loading && !error ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) => {
            const { id, ...data } = values
            onFinish({
              variables: {
                id: parseInt(id),
                data,
              },
            })
          }}
          initialValues={data[queryName]}>
          {fields.map(({ title, name }) => (
            <Form.Item key={name} label={title} name={name}>
              <Input readOnly={name === 'id'} />
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </>
  )
}
