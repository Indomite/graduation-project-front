// @ts-ignore
/* eslint-disable */

declare namespace API {
  // 用户
  type CurrentUser = {
    id: number,
    username: string,
    user_no: string,
    password: string,
    role: number,
    unit: string,
    email: string,
    create_time: string,
    update_time?: string
  };

  // 登录
  type LoginParams = {
    user_no?: string;
    password?: string;
  };

  type RegisterParams = {
    username: string,
    user_no: string,
    password: string,
    unit: string,
    email: string,
    code: string
  };

  type LoginResult = {
    status?: number;
    message?: string;
    token?: string;
    data?: CurrentUser;
  };

  type RegisterResult = {
    status?: number;
    message?: string;
  };

  // 项目信息
  type ProjectList = {
    data?: ProjectListItem[];
    status?: number;
    message?: string;
  };

  type ProjectListItem = {
    id?: number,
    user_no?: string,
    project_name: string,
    describe: string,
    file_address?: string,
    status?: number,
    remark?: string,
    create_time?: string,
    update_time?: string
  };

  // 论文信息
  type PaperList = {
    data?: PaperListItem[];
    status?: number;
    message?: string;
  };

  type PaperListItem = {
    id: number,
    user_no: string,
    paper_name: string,
    describe: string,
    paper_level: string,
    subject: string,
    status: number,
    remark: string,
    create_time: string,
    update_time?: string
  };

  // 专利信息
  type PatentList = {
    data?: PatentListItem[];
    status?: number;
    message?: string;
  };

  type PatentListItem = {
    id: number,
    user_no: string,
    patent_name: string,
    describe: string,
    file_address: string,
    status: number,
    remark: string,
    create_time: string,
    update_time?: string
  };

  // 获奖信息
  type AwardList = {
    data?: AwardListItem[];
    status?: number;
    message?: string;
  };

  type AwardListItem = {
    id: number,
    user_no: string,
    award_name: string,
    describe: string,
    award_level: string,
    award_time: string,
    status: number,
    remark: string,
    create_time: string,
    update_time?: string
  };

  // 会议信息
  type MeetingList = {
    data?: MeetingListItem[];
    status?: number;
    message?: string;
  };

  type MeetingListItem = {
    id: number,
    user_no: string,
    meeting_name: string,
    describe: string,
    meeting_time: string,
    status: number,
    remark: string,
    create_time: string,
    update_time?: string
  };

  type EmailCaptcha = {
    message?: string;
    status?: string;
  };

}
