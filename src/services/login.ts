// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /api/login/ */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/register/ */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/sendEmail */
export async function getEmailCaptcha(
  params: {
    email?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.EmailCaptcha>('/api/sendEmail', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}