
    import React from 'react';
    import { useTodoCreate, useTodoSoftDelete,useTodoMultipleSoftDelete, useTodoUpdate } from '../../queries/Todo.queries';
    import Todo from './Todo';
    
    const TodoContainer = () => {
    
      const {mutate:addRecord} = useTodoCreate();
      const {mutate:editRecord} = useTodoUpdate();
      const {mutate:deleteRecord} = useTodoSoftDelete();
      const {mutate:deleteRecords} = useTodoMultipleSoftDelete();
    
      const onAddRecord = (record) => {
        return new Promise((resolve,reject) => {
          addRecord(record, {
            onSuccess: async () => resolve('Record created successfully.'),
            onError: async (error) => reject(error?.message || "Can not connect to server"),
          });
        })
      };
    
      const onEditRecord = (record) => {
        return new Promise((resolve, reject) => {
          editRecord(
            record,
            {
              onSuccess: async () => resolve('Record updated successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };
    
      const onDeleteRecord = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecord(
            record, 
            {
              onSuccess: async () => resolve('Record deleted successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };

      const onMultiDelete = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecords(
            record, 
            {
              onSuccess: async () => resolve('Records deleted successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };

      return (
        <Todo 
          addRecord={onAddRecord}
          deleteRecord={onDeleteRecord}
          deleteRecords={onMultiDelete}
          editRecord={onEditRecord}
        />
      )
    }
    
    export default TodoContainer;
    