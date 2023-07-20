import { USERS_URL } from '../config/dataURL';
import { Task } from '../interfaces/task';

export async function sendTask(task: Task, token: string, userId: string) {
   const taskURL = `${USERS_URL}/${userId}/tasks.json?auth=${token}`;

   try {
      const response = await fetch(taskURL, {
         method: 'POST',
         body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
   } catch (error: any) {
      console.log(error.message);
   }
}
