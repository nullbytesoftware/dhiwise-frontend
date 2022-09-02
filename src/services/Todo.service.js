import { apiClient } from "./../api/client";
import { API_URLS } from "../api/config";
const { todo } = API_URLS;

export const listTodos = payload => {
  return apiClient({ url: todo.list, data: payload })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const createTodo = payload => {
  return apiClient({ url: todo.create, data: payload })
    .then(res => res)
    .catch(err => {
      throw new Error(err?.data?.message);
    });
};

export const updateTodo = payload => {
  return apiClient({
    url: todo.update + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err?.data?.message || "Can't update record.");
    });
};

export const softDeleteTodo = payload => {
  return apiClient({
    url: todo.softdelete + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};

export const getTodoCount = () => {
  return apiClient({ url: todo.count })
    .then(res => res.data?.totalRecords || 0)
    .catch(err => {
      throw new Error(err);
    });
};

export const getTodoAggregate = payload => {
  return apiClient({ url: todo.aggregation, data: payload })
    .then(res => res.data?.data || [])
    .catch(err => {
      throw new Error(err);
    });
};

export const getTodoById = payload => {
  return apiClient({
    url: todo.singlerecord + payload,
    data: { query: { isActive: true, isDeleted: false } },
    method: "GET"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const softDeleteMultipleTodo = payload => {
  return apiClient({
    url: todo.multisoftdelete,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};
