import React, { Fragment } from 'react'
import { Layout, Menu, Grid } from 'antd'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import { getMenuItems } from '../../get-menu-items'
import { EntityClass, EntityIdType, store } from '../../../../common'
import { EntityList, EntityView } from '..'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const { Content, Footer, Sider } = Layout
const { useBreakpoint } = Grid

const siderWidth = 200

export interface AppProps {
  gqlUri: string
  entities: EntityClass<EntityIdType>[]
}

export const App: React.FC<AppProps> = ({ gqlUri }) => {
  const client = new ApolloClient({
    uri: gqlUri,
    cache: new InMemoryCache(),
  })
  const { lg } = useBreakpoint()
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={siderWidth}
            style={{
              position: 'fixed',
              minHeight: '100vh',
            }}>
            <Menu theme="dark" mode="inline" items={getMenuItems()} />
          </Sider>
          <Layout style={{ minHeight: '100vh' }}>
            <Content
              style={{ margin: lg ? `24px 16px 0 ${siderWidth + 16}px` : 0 }}>
              <div className="site-layout-background">
                <Routes>
                  {store
                    .getEntities()
                    .map(({ EntityClass, path, list: List }) => (
                      <Fragment key={path}>
                        <Route
                          path={path}
                          element={<EntityList EntityClass={EntityClass} />}
                        />
                        <Route
                          path={`${path}/create`}
                          element={<EntityView EntityClass={EntityClass} />}
                        />
                        <Route
                          path={`${path}/:id`}
                          element={<EntityView EntityClass={EntityClass} />}
                        />
                      </Fragment>
                    ))}
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Fission-js ©2018 Created by Damir Rashidov
            </Footer>
          </Layout>
        </Layout>
      </ApolloProvider>
    </BrowserRouter>
  )
}
