// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有数据 GET /api/award */
export async function getAwardInfoAll() {
  return request<API.AwardList>('/api/award', {
    method: 'GET',
  });
}

export async function getAwardInfoByUserNo(user_no: string) {
  return request<API.AwardList>(`/api/award/${user_no}`, {
    method: 'GET',
  });
}

export async function createAwardInfo(body: API.AwardListItem, options?: { [key: string]: any }) {
  return request<API.AwardList>('/api/award', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateAwardInfo(id: string, body: API.AwardListItem, options?: { [key: string]: any }) {
  return request<API.AwardList>(`/api/award/${id}`, {
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
