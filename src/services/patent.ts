// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有数据 GET /api/patent */
export async function getPatentInfoAll() {
  return request<API.ProjectList>('/api/patent', {
    method: 'GET',
  });
}

export async function getPatentInfoByUserNo(user_no: string) {
  return request<API.ProjectList>(`/api/patent/${user_no}`, {
    method: 'GET',
  });
}

export async function createPatentInfo(body: API.PatentListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>('/api/patent', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updatePatentInfo(id: string, body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectList>(`/api/patent/${id}`, {
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
