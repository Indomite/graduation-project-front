import Footer from '@/components/Footer';
import { Tabs } from 'antd';
import React from 'react';
import styles from './layout.less';
import { history, useLocation } from 'umi';

enum PageType {
  Login = 'login',
  Register = 'register',
}

const UserLayout: React.FC = (props) => {
  const location = useLocation();
  const defaultKey = location.pathname.replace(/\/user\//, '') as PageType;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="title">本科评估数据管理系统</div>
        <div className="desc">江西师范大学</div>
        <div className="form-box">
          <Tabs
            onChange={(targetType) => {
              history.push(`/user/${targetType}`);
            }}
            centered={true}
            defaultActiveKey={defaultKey}
          >
            <Tabs.TabPane key={PageType.Login} tab="用户登录" />
            <Tabs.TabPane key={PageType.Register} tab="用户注册" />
          </Tabs>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
