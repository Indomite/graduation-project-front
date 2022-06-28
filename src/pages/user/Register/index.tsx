import { LockOutlined, UserOutlined, MailOutlined, NumberOutlined, HomeOutlined } from '@ant-design/icons';
import { Alert, Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { register, getEmailCaptcha } from '@/services/login';

import styles from '@/pages/user/layout.less';

const RegisterMessage: React.FC<{
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

const Register: React.FC = () => {
  const [registerResult, setRegisterResult] = useState<API.RegisterResult>({});
  const [formRef] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async () => {
    let values: API.RegisterParams;
    try {
      values = await formRef.validateFields();
    } catch (error: any) {
      return;
    }
    try {
      // 注册
      const result = await register({ ...values });

      await setInitialState((s) => ({ ...s, currentUser: result.data }));
      switch (result.status) {
        case 200: {
          message.success(result.message || '注册成功');
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as { redirect: string };
          history.push(redirect || '/');
          return;
        }
        default: {
          setRegisterResult(result);
          throw new Error(result.message);
        }
      }
    } catch (error: any) {
      message.error(error?.message || '登录失败，请重试！');
    }
  };

  const { status } = registerResult;
  return (
    <Form form={formRef}>
      {status === 500 && <RegisterMessage content={'错误的用户名和密码(admin/ant.design)'} />}

      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'昵称: '}
        rules={[
          {
            required: true,
            message: '请输入昵称!',
          },
        ]}
      />
      <ProFormText
        name="user_no"
        fieldProps={{
          size: 'large',
          prefix: <NumberOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'工号: '}
        rules={[
          {
            required: true,
            message: '请输入工号!',
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
      <ProFormText
        name="unit"
        fieldProps={{
          size: 'large',
          prefix: <HomeOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'单位: '}
        rules={[
          {
            required: true,
            message: '请输入单位！',
          },
        ]}
      />
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'邮箱: '}
        rules={[
          {
            required: true,
            message: '请输入邮箱！',
          },
        ]}
      />
      <ProFormCaptcha
        placeholder={'请输入验证码'}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${'获取验证码'}`;
          }
          return '获取验证码';
        }}
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        onGetCaptcha={async () => {
          let emailValue = await formRef.getFieldValue('email')
          await getEmailCaptcha({ email: emailValue })
        }}
      />
      <Button
        type="primary"
        style={{ width: '100%', marginTop: '12px' }}
        size="large"
        onClick={handleSubmit}
      >
        注册
      </Button>
    </Form>
  );
};

export default Register;
