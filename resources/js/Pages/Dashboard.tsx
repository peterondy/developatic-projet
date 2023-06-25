import React, react, { useState } from 'react';
import {DesktopOutlined, FileOutlined,MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,
  TeamOutlined, UserOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, theme } from 'antd';
import { Space, Table, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';


const { Header, Sider, Content } = Layout;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const items: MenuProps['items'] = [
  {
    key: 'users',
    icon: <PieChartOutlined />,
    label: 'Option 1',
  },
  {
    key: 'add new user',
    icon: <DesktopOutlined />,
    label: 'Option 2',
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'profile',
    children: [
      {
        key: '3',
        label: 'Tom',
      },
      {
        key: '4',
        label: 'Bill',
      },
      {
        key: '5',
        label: 'Alex',
      },
    ],
  },

  {
    key: 'logout',
    icon: <FileOutlined />,
  },
];


const navs: MenuProps['items'] = [
  {
    label: (
      <a href="/users" target="_blank" rel="noopener noreferrer">
        users
      </a>
    ),
    key: 'show all users',
  },
  {
    label: (
      <a href="/users/add" target="_blank" rel="noopener noreferrer">
        add new user
      </a>
    ),
    key: 'add new user',
  },
];


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{
      margin: '0',
    }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['3']}
          defaultOpenKeys={['sub1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu  mode="horizontal" items={navs} style={{backgroundColor: 'rgb(0 21 41)',color:colorBgContainer}} />;
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: 600,
            background: colorBgContainer,
            overflow: 'hidden'
          }}
        >
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;