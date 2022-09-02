import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  listTodos,
  createTodo,
  updateTodo,
  softDeleteTodo,
  softDeleteMultipleTodo,
  getTodoAggregate,
  getTodoById,
  getTodoCount
} from "../services/Todo.service";

function useTodoList(args, id = "") {
  const { page, limit: paginate } = args.options;
  let $and = [],
    sort = {};

  if (args.query?.$and) {
    $and = { ...args.query?.$and };
  }
  if (args.options?.sort) {
    sort = { ...args.options?.sort };
  }
  return useQuery([`Todo${id}`, { page, paginate, $and, sort }], () =>
    listTodos(args)
  );
}

function useTodoCreate() {
  const queryClient = useQueryClient();
  return useMutation(record => createTodo(record), {
    onMutate: async newRecord => {
      await queryClient.cancelQueries(["Todo"]);

      const previousValue = queryClient.getQueryData(["Todo"]) || [];

      queryClient.setQueryData(["Todo"], () => [...previousValue, newRecord]);
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Todo"], previousValue),
    // After success or failure, refetch the Todos query
    onSettled: () => {
      queryClient.invalidateQueries(["Todo"]);
    }
  });
}

function useTodoUpdate() {
  const queryClient = useQueryClient();
  return useMutation(record => updateTodo(record), {
    onMutate: async updatedData => {
      await queryClient.cancelQueries(["Todo"]);

      const previousValue = queryClient.getQueryData(["Todo"]);

      queryClient.setQueryData(["Todo"], old => {
        return old?.map(oldData => {
          if (oldData.id === updatedData.id) return updatedData;
          else return oldData;
        });
      });
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Todo"], previousValue),
    // After success or failure, refetch the Todos query
    onSettled: () => {
      queryClient.invalidateQueries(["Todo"]);
    }
  });
}

function useTodoSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteTodo(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Todo"]);

      const previousValue = queryClient.getQueryData(["Todo"]) || [];
      queryClient.setQueryData(["Todo"], oldData =>
        previousValue.filter(record => record.id !== deletedRecord.id)
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Todo"], previousValue),
    // After success or failure, refetch the Todos query
    onSettled: () => {
      queryClient.invalidateQueries(["Todo"]);
    }
  });
}

function useTodoMultipleSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteMultipleTodo(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Todo"]);

      const previousValue = queryClient.getQueryData(["Todo"]) || [];
      queryClient.setQueryData(["Todo"], oldData =>
        previousValue.filter(record => !deletedRecord.ids.includes(record.id))
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Todo"], previousValue),
    // After success or failure, refetch the Todos query
    onSettled: () => {
      queryClient.invalidateQueries(["Todo"]);
    }
  });
}

function useTodoCount(id = "") {
  return useQuery([`Todo${id}Count`], () => {
    return getTodoCount();
  });
}

function useTodoAggregate(record) {
  return useQuery("Todo", () => {
    return getTodoAggregate(record);
  });
}

function useTodoGetById(id) {
  return useQuery(["Todo", id], () => {
    return getTodoById(id);
  });
}

export {
  useTodoList,
  useTodoCreate,
  useTodoUpdate,
  useTodoMultipleSoftDelete,
  useTodoCount,
  useTodoSoftDelete,
  useTodoAggregate,
  useTodoGetById
};
