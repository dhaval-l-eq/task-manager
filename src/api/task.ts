import { USERS_URL } from '../config/dataURL';
import { Task } from '../interfaces/task';

interface FetchConfig {
   method: string;
   body?: string;
}

export async function taskHttpRequest(task: Task, token: string, userId: string, method: 'send' | 'fetch') {
   const taskURL = `${USERS_URL}/${userId}/tasks.json?auth=${token}`;

   let fetchConfig: FetchConfig | undefined = {
      method: 'POST',
      body: JSON.stringify(task),
   };

   if (method === 'fetch') fetchConfig = undefined;

   try {
      const response = await fetch(taskURL, fetchConfig);
      const data = await response.json();
      return data;
   } catch (error: any) {
      console.log(error.message);
   }
}

export async function updateTaskHttpRequest(taskId: string, token: string, userId: string, deleteTask?: boolean, payload?: any) {
   const taskURL = `${USERS_URL}/${userId}/tasks/${taskId}.json?auth=${token}`;

   let fetchConfig: FetchConfig = {
      method: 'PATCH',
      body: JSON.stringify(payload),   
   };

   if (deleteTask) fetchConfig = { method: 'DELETE' };

   try {
      await fetch(taskURL, fetchConfig);
   } catch (error: any) {
      console.log(error.message);
   }
}
