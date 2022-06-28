// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/queryCurrentUser', {
    headers: {
      Authorization: 'Bearer ' + `${localStorage.getItem('token')}`,
    },
  });
}

/** 获取所有用户数据 GET /api/user */
export async function getUserInfoAll() {
  return request<API.ProjectList>('/api/user', {
    method: 'GET',
  });
}