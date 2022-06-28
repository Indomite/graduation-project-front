import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { login } from '@/services/login';

import styles from '@/pages/user/layout.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [loginResult, setLoginResult] = useState<API.LoginResult>({});
  const [formRef] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async () => {
    let values: API.LoginParams;
    try {
      values = await formRef.validateFields();
    } catch (error: any) {
      return;
    }
    try {
      // 登录
      const result = await login({ ...values });
      await setInitialState((s) => ({ ...s, currentUser: result.data }));
      switch (result.status) {
        case 200: {
          message.success(result.message || '登入成功');
          localStorage.setItem('token', result.token);
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as { redirect: string };
          history.push(redirect || '/');
          return;
        }
        default: {
          setLoginResult(result);
          message.error(result.message || '登入失败');
        }
      }
    } catch (error: any) {
      message.error(error?.message || '登录失败，请重试！');
    }
  };

  const { status } = loginResult;
  return (
    <Form form={formRef}>
      {status === 500 && <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />}

      <ProFormText
        name="user_no"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'用户名: '}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'密码: '}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
      <Button
        type="primary"
        style={{ width: '100%', marginTop: '12px' }}
        size="large"
        onClick={handleSubmit}
      >
        登入
      </Button>
    </Form>
  );
};

export default Login;
