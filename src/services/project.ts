// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有数据 GET /api/project */
export async function getProjectInfoAll() {
  return request<API.ProjectList>('/api/project', {
    method: 'GET',
  });
}

export async function getProjectInfoByUserNo(user_no: string) {
  return request<API.ProjectList>(`/api/project/${user_no}`, {
    method: 'GET',
  });
}

export async function createProjectInfo(body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>('/api/project', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateProjectInfo(id: string, body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>(`/api/project/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function uploadFile(data: FormData) {
  return request<string>('/api/upload', {
    method: 'POST',
    data,
  });
}
