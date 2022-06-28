import { getUserInfoAll } from '@/services/user';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';

const Admin: React.FC = () => {

  const columns: ProColumns[] = [
    {
      title: '用户名称',
      dataIndex: 'username',
      ellipsis: true,
    },
    {
      title: '工号',
      dataIndex: 'user_no',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'role',
      sorter: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '普通用户',
          status: 'Default',
        },
        10: {
          text: '管理员',
          status: 'Success',
        }
      },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      sorter: true,
      hideInSearch: true,
      width: 200,
      valueEnum: {
        '020': {
          text: '计算机信息工程学院',
          status: 'Processing',
        },
        '021': {
          text: '软件学院',
          status: 'Success',
        }
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a>
          操作
        </a>,
      ],
    }
  ];

  const actionRef = useRef<ActionType>();

  async function requestProject() {
    const result = await getUserInfoAll();

    return {
      data: result.data
    };
  }

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      request={async () => {
        return requestProject();
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};

export default Admin;
