// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有数据 GET /api/paper */
export async function getPaperInfoAll() {
  return request<API.ProjectList>('/api/paper', {
    method: 'GET',
  });
}

export async function getPaperInfoByUserNo(user_no: string) {
  return request<API.ProjectList>(`/api/paper/${user_no}`, {
    method: 'GET',
  });
}

/** 获取所有数据 POST /api/project */
export async function createPaperInfo(body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>('/api/paper', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updatePaperInfo(id: string, body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>(`/api/paper/${id}`, {
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
