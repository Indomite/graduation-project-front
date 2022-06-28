import { getPatentInfoByUserNo, getPatentInfoAll, createPatentInfo, updatePatentInfo, uploadFile } from '@/services/patent';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useAccess, useModel } from 'umi';

const ProjectList: React.FC = () => {

  const columns: ProColumns[] = [
    {
      title: '专利名称',
      dataIndex: 'patent_name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      ellipsis: true,
      tip: '描述过长会自动收缩',
    },
    {
      title: '作者',
      dataIndex: 'username',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
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
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未提交',
          status: 'Default',
        },
        1: {
          text: '审核中',
          status: 'Processing',
        },
        2: {
          text: '已通过',
          status: 'Success',
        }
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => {
        let url = record.file_address
        if (access.canAdmin) {
          return (
            <>
              <Button type='primary' size='small'><a href={url} download={url}>下载</a></Button>
              <Button type='default' size='small' onClick={() => {
                handleSaveProjectInfo(record)
                setModalVisit(true);
              }}>审核</Button>
            </>
          );
        } else {
          return (
            <>
              <Button type='primary' size='small'><a href={url} download={url}>下载</a></Button>
            </>
          );
        }
      },
    },
  ];

  const actionRef = useRef<ActionType>();
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [modalVisit, setModalVisit] = useState(false);
  const [patentInfo, handleSaveProjectInfo] = useState({});
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const access = useAccess();

  async function requestProject() {
    if (access.canAdmin) {
      const result = await getPatentInfoAll();
      return {
        data: result.data
      };
    } else {
      const result = await getPatentInfoByUserNo(currentUser.user_no);
      return {
        data: result.data
      };
    }
  }

  return (
    <PageContainer>
      <ModalForm<{
        patent_name: string;
        describe: string;
        status: number
      }>
        title="编辑专利"
        visible={modalVisit}
        onFinish={async (values) => {
          await updatePatentInfo(patentInfo.id, { user_no: currentUser.user_no, ...values })
          setModalVisit(false);
          actionRef.current?.reload()
        }}
        onVisibleChange={setModalVisit}
      >
        <ProForm.Group>
          <ProFormText label="专利名称" name="patent_name" value={patentInfo.patent_name} />
          <ProFormText
            name="describe"
            label="描述"
            value={patentInfo.describe}
          />
          <ProFormSelect
            value={patentInfo.status}
            options={[
              {
                value: 0,
                label: '未提交',
              },
              {
                value: 1,
                label: '审核中',
              },
              {
                value: 2,
                label: '审核通过',
              },
            ]}
            width="xs"
            name="status"
            label="审核进度"
          />
          <ProFormText width="md" name="remarks" label="备注" placeholder="请输入备注" />
        </ProForm.Group>
      </ModalForm>
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
          <DrawerForm<{
            patent_name: string;
            describe: string;
            file_address: string | {
              file_address: Blob
            };
          }>
            visible={drawerVisit}
            title="新建专利"
            trigger={
              <Button type="primary" onClick={() => {
                setDrawerVisit(true);
              }}>
                <PlusOutlined />
                新建专利
              </Button>
            }
            autoFocusFirstInput
            onFinish={async (values) => {
              const formData = new FormData();
              formData.append('file', values.file_address[0].originFileObj);
              let { filePath } = await uploadFile(formData)
              values.file_address = filePath
              await createPatentInfo({ user_no: currentUser.user_no, ...values })
              setDrawerVisit(false);
              actionRef.current?.reload()
            }}
            onVisibleChange={setDrawerVisit}
          >
            <ProFormText width="md" name="patent_name" label="专利名称" placeholder="请输入名称" rules={[{ required: true, message: '此项为必填项' }]} />
            <ProFormTextArea
              name="describe"
              label="描述"
              rules={[{ required: true, message: '此项为必填项' }]}
            />
            <ProFormUploadDragger max={2} label="文件上传" name="file_address" rules={[{ required: true, message: '此项为必填项' }]} />
            <ProFormText width="md" name="remarks" label="备注" placeholder="请输入备注" />
          </DrawerForm>,
        ]}
      />
    </PageContainer>
  );
};

export default ProjectList;
