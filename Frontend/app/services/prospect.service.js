import axios from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import qs from "qs";

export class ProspectService {
  instance;
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      // timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  add = async (id, data) => {
    return this.instance
      .post(`/api/v1/enquiry/prospect/addProspect/${id}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data);
  };

  getAll = async () => {
    return this.instance
      .get(`/api/v1/enquiry/prospect/getProspect/getAll`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data);
  };

  getOne = async (id) => {
    return this.instance
      .get(`/api/v1/enquiry/prospect/getProspect/getOne/${id}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data);
  };
  saveHealth = async (id, data) => {
    return this.instance
      .post(`/api/v1/enquiry/health/addHealth/${id}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  getHealth = async (id) => {
    return this.instance
      .get(`/api/v1/enquiry/health/getHealth/getOne/${id}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  saveCompliance = async (id, data) => {
    return this.instance
      .post(`/api/v1/enquiry/compliance/addCompliance/${id}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  getCompliance = async (prospectId, complianceId) => {
    return this.instance
      .get(`/api/v1/enquiry/compliance/getCompliance/getAll/${prospectId}/${complianceId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  imgUpload = async (imgData)=>{
    return this.instance
    .post(`/api/v1/other/fileupload/upload`, imgData, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
      },
    })
    .then((res) => res.data.result.secure_url)
    .catch((err) => {console.log(err) });
  };
  saveContact = async (contactId, data) => {
    return this.instance
      .post(`/api/v1/enquiry/contact/addContact/${contactId}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  getContact = async (prospectId, contactId) => {
    return this.instance
      .get(`/api/v1/enquiry/contact/getContact/getAll/${prospectId}/${contactId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  saveTask = async (taskId, data) => {
    return this.instance
      .post(`/api/v1/enquiry/task/addTask/${taskId}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  getTask = async (prospectId, contactId) => {
    return this.instance
      .get(`/api/v1/enquiry/task/getTask/getAll/${prospectId}/${contactId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  saveNote = async (noteId, data) => {
    return this.instance
      .post(`/api/v1/enquiry/note/addNote/${noteId}`, data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  getNote = async (prospectId, noteId) => {
    return this.instance
      .get(`/api/v1/enquiry/note/getNote/getAll/${prospectId}/${noteId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  setPassword = async (prospectId, data) => {
    return this.instance
      .post(`/api/v1/enquiry/prospect/addProspect/password/${prospectId}`,data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  moveToResident = async (baseUrl, prospectId, data) => {
    return this.instance
      .post(`/${baseUrl}/${prospectId}`,data, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
  delete = async (id) => {
    return this.instance
      .delete(`/api/v1/customer/addCustomer/deleteOne/${id}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };
}
