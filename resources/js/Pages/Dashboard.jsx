import { LogoutOutlined, PieChartOutlined, UserOutlined,DesktopOutlined,TeamOutlined,SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Space, Table, Modal ,Button,  Checkbox, Form, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRef, useState, useEffect } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('users', '1', <PieChartOutlined />),
  getItem('View on github', '2', <DesktopOutlined />),
  getItem('Logout', 'sub2', <TeamOutlined />),
];

const Dashboard = ({users}) => {  

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: '#ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      filters: [
        {
          text: '15-30',
          value: '15-30',
        },
        {
          text: '31-45',
          value: '31-45',
        },
        {
          text: '46-60',
          value: '46-60',
        },
        {
          text: '61',
          value: '61',
        },
      ],
      filteredValue: filteredInfo.age || null,
      onFilter: (value, record) => record.age,
      sorter: (a, b) => a.age.length - b.age.length,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, row) => (
        <Space size="middle">
          <a onClick = {() => handleEdit(record)}>Edit</a>
          <a onClick = {() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    }
  ];

  function handleDelete(record){
    const path = '/dashboard/user/' + record.id + '/delete'
    window.location = path
  }
  function handleEdit(record){
    const path = '/dashboard/user/' + record.id + '/edit'
    window.location = path
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = (values) => {
    console.log('Success:', values);
    document.location = '/register/name=' + values.name + '&email=' + values.email + '&date_of_birth=' + values.date_of_birth + '&password=' + values.password + '&re-password=' + values.re_password + '/'
  };
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

  const onChanged = (date, dateString) => {
  console.log(date, dateString)
  }

  const dateFormat = 'YYYY/MM/DD';




  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{marginTop:'5rem'}}/>
        <a target='_blank' href="/logout"style={{padding: '0px 50px',marginBottom:'5rem', height: '50px',fontSize: '20px',color:'#ffffdd', textDecoration:'none'}}>Logout</a>
        <a href="https://github.com/peterondy/developatic-projet"style={{float: 'left',padding: '0px',paddingLeft:'10px', height: '50px',color:'#ffffdd', textDecoration:'none',fontSize: '20px', padding:'0'}}>VIEW ON GITHUB</a>

      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }}>
            <Button type="primary" onClick={showModal} style={{padding: '0px 50px', height: '50px',fontSize: '20px'}}>
              Add New User <PlusOutlined style={{fontSize: '25px'}} />
            </Button>
            
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                method='post'
                action='/register'
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on">
                <Form.Item label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input placeholder='Please Enter User Name'/>
                </Form.Item>

                <Form.Item label="Email" name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}>
                    <Input placeholder='Please Enter User Email'/>

                </Form.Item>

                <Form.Item label="Date Of Birth" name="date_of_birth"
                    rules={[
                        {
                            required: true,
                            message: 'Please input birthday date!',
                        },
                    ]}>
                    <Input type='date' name='date_of_birth' placeholder='Please Enter User Email'/>
                </Form.Item>

                <Form.Item label="Password" name="password"
                rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password placeholder='Please input your password!'/>
                </Form.Item>

                <Form.Item label="Re Password" name="re_password"
                rules={[
                        {
                        required: true,
                        message: 'Please input your password Again!',
                        },
                    ]}>
                    <Input.Password placeholder='Please input your password again!'/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
              </Form>
            </Modal>
            
              <Table columns={columns} dataSource={users} pagination={{ pageSize: 15 }} onChange={handleChange} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Developatic ©2023 Created by <a href="/">Ramzi Ben</a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;