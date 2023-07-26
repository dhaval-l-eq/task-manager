import { FormEvent, PropsWithChildren, useRef, useState, FocusEvent, SyntheticEvent, Key, ChangeEvent } from 'react';
import Box from '../../Layout/Box';
import Modal from '../../Layout/Modal';
import cls from '../form-css/Form.module.css';
import { ModalProps } from '../../interfaces/props';
import { Button, Popper, Typography } from '@mui/material';
import buttonStyles from '../../mui-customization/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/tasks';
import { Color, Task } from '../../interfaces/task';
import {v4 as uuid} from 'uuid';
import { RootState } from '../../store';
import { taskHttpRequest } from '../../api/task';
import { updateTaskHttpRequest } from '../../api/task';

interface TaskFormProps extends ModalProps {
   edit?: boolean;
   title?: string;
   description?: string;
   color?: Color;
   imp?: boolean;
   id?: Key;
}

function TaskForm(props: PropsWithChildren<TaskFormProps>) {
   const titleRef = useRef(null);
   const descRef = useRef(null);
   const impRef = useRef(null);

   const [titleValid, setTitleValid] = useState(true);

   const [inputTitle, setInputTitle] = useState(props.title || '');
   const titleChangeHandler = () => {
      setTitleValid(true);
      setInputTitle((titleRef.current! as HTMLInputElement).value);
   }

   const [inputDesc, setInputDesc] = useState(props.description || '');
   const descChangeHandler = () => {
      setInputDesc((descRef.current! as HTMLInputElement).value);
   }

   const [inputImp, setInputImp] = useState(props.imp || false);
   const impChangeHandler = () => {
      setInputImp((impRef.current! as HTMLInputElement).checked);
   }

   const dispatch = useDispatch();

   const token = useSelector((state: RootState) => state.auth.token);
   const userId = useSelector((state: RootState) => state.auth.userId);

   const [selectedColor, setSelectedColor] = useState(props.color || Color.C1);
   const colorChoice: Color[] = [Color.C1, Color.C2, Color.C3];

   function changeColorHandler(e: SyntheticEvent<HTMLInputElement, Event>) {
      const colorInput = (e.target as HTMLInputElement).value;
      const colorInputEnum = colorChoice.find(color => color === colorInput)!;
      setSelectedColor(colorInputEnum);
   }

   async function updateTaskOnServer(payload: any) {
      if(token && props.id) await updateTaskHttpRequest(props.id.toString(),token,userId,false,payload);
   }

   async function addTaskHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (inputTitle && inputTitle.trim().length === 0) {
         setTitleValid(false);
         return;
      }

      if(props.edit) {

         const editedTask = {
            taskId: props.id,
            title: inputTitle,
            description: inputDesc,
            color: selectedColor,
            imp: inputImp
         };

         dispatch(taskActions.editTask(editedTask));
         await updateTaskOnServer(editedTask);
      }
      else {
         let taskId = uuid();

         const newTask: Task = {
            title: inputTitle!,
            description: inputDesc,
            dateCreated: Date.now(),
            imp: inputImp!,
            complete: false,
            color: selectedColor,
            id: '',
         }

         if(token) {
            const data = await taskHttpRequest(newTask, token, userId, 'send' );
            taskId = data.name;
         }

         newTask.id = taskId;

         dispatch(taskActions.addTask(newTask));
      }

      setInputTitle('');
      setInputDesc('');
      setInputImp(false);
      setSelectedColor(Color.C1);

      props.onHide();
   }

   
   const checkTitleValidity = (e: FocusEvent<HTMLInputElement>) => {
      if(e.target.value.length === 0) setTitleValid(false);
   };

   return (
      <Modal isVisible={props.isVisible} onHide={props.onHide}>
         <Box>
            <form onSubmit={addTaskHandler} className={cls.form}>
               <div className={cls.formControl}>
                  <label htmlFor="title">Title</label>
                  <input autoFocus value={inputTitle} onChange={titleChangeHandler} onBlur={checkTitleValidity} className={`${!titleValid && cls.error}`} ref={titleRef} placeholder="Buy Grocery" type="text" id="title" />
                  <Popper
                     anchorEl={titleRef.current}
                     placement='top'
                      sx={{zIndex: 250, boxShadow: '0 1px 2px #00000042'}}
                     open={!titleValid}
                  >
                     <Typography sx={{padding: 0.5, fontSize: 12}}>Title is required!</Typography>
                  </Popper>
               </div>
               <div className={cls.formControl}>
                  <label htmlFor="desc">Description</label>
                  <textarea onChange={descChangeHandler} value={inputDesc} ref={descRef} placeholder="Fruits, vegetables, brush etc..." id="desc" />
               </div>
               <div className={`${cls.formControl} ${cls.formControlRow}`}>
                  <label htmlFor="imp">Important</label>
                  <label className={cls.switch}>
                     <input onChange={impChangeHandler} checked={inputImp} ref={impRef} id="imp" type="checkbox" />
                     <div>
                        <span></span>
                     </div>
                  </label>
               </div>
               <div className={`${cls.formControl} ${cls.formControlRow}`}>
                  <h3>Choose Color</h3>
                  <div className={cls.formGroup}>
                     {colorChoice.map(color => (
                        <label key={color} className={`${cls[color]} ${selectedColor === color && cls.colorSelected}`} htmlFor={color}>
                           <input onChange={changeColorHandler} value={color} name='color' id={color} type="radio" hidden />
                        </label>
                     ))}
                  </div>
               </div>
               <div className={cls.actions}>
                  <Button type="submit" variant="contained" sx={buttonStyles}>
                     {props.edit ? 'Edit' : 'Add'}
                  </Button>
                  <Button onClick={props.onHide} variant="outlined" sx={buttonStyles}>
                     Cancel
                  </Button>
               </div>
            </form>
         </Box>
      </Modal>
   );
}
export default TaskForm;
