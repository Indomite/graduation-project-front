// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有数据 GET /api/project */
export async function getMeetingInfoAll() {
  return request<API.MeetingList>('/api/meeting', {
    method: 'GET',
  });
}

export async function getMeetingInfoByUserNo(user_no: string) {
  return request<API.MeetingList>(`/api/meeting/${user_no}`, {
    method: 'GET',
  });
}

export async function createMeetingInfo(body: API.MeetingListItem, options?: { [key: string]: any }) {
  return request<API.MeetingList>('/api/meeting', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateMeetingInfo(id: string, body: API.MeetingListItem, options?: { [key: string]: any }) {
  return request<API.MeetingList>(`/api/meeting/${id}`, {
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
