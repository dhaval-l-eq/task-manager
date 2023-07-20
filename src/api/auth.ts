import { BASE_URL, SIGNIN_PATH, SIGNUP_PATH } from '../config/authURL';
import { USERS_URL } from '../config/dataURL';

interface FBBody {
   email: string;
   password: string;
   returnSecureToken: boolean;
}

// export interface UserData {
//     userName: string;
//     taskList: Task;
// }

export type AuthMode = 'signup' | 'signin';

export async function authenticateUser(userData: FBBody, mode: AuthMode) {
   const endpoint = mode === 'signup' ? SIGNUP_PATH : SIGNIN_PATH;

   try {
      const response = await fetch(BASE_URL + endpoint, {
         method: 'POST',
         body: JSON.stringify(userData),
      });

      const data = (await response.json()) as any;

      if (!response.ok) {
         throw new Error(data.error.message.replace('_', ' '));
      }

      return data;
   } catch (error: any) {
      throw error;
   }
}

export async function sendUserData(userName: string, userId: string, token: string) {
   const fullURL = `${USERS_URL}/${userId}.json?auth=${token}`;

   try {
      await fetch(fullURL, {
         method: 'PUT',
         body: JSON.stringify({ userName, taskList: {} }),
      });
   } catch (error: any) {
      console.log(error.message);
   }
}

export async function fetchUserData(userId: string, token: string) {
    const fullURL = `${USERS_URL}/${userId}.json?auth=${token}`;
 
    try {
       const response = await fetch(fullURL);
       const data = await response.json();

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        console.log(data);

        return data;

    } catch (error: any) {
       console.log(error.message);
    }
 }
