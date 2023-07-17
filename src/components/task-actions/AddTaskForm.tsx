import { FormEvent, PropsWithChildren, useRef, useState, FocusEvent, SyntheticEvent } from 'react';
import Box from '../../Layout/Box';
import Modal from '../../Layout/Modal';
import cls from './AddTaskForm.module.css';
import { ModalProps } from '../../interfaces/props';
import { Button, Popper, Typography } from '@mui/material';
import buttonStyles from '../../mui-customization/buttonStyles';
import { useDispatch } from 'react-redux';
import { taskActions } from '../../store/tasks';
import { Color, Task } from '../../interfaces/task';
import {v4 as uuid} from 'uuid';

function AddTaskForm(props: PropsWithChildren<ModalProps>) {
   const titleRef = useRef(null);
   const descRef = useRef(null);
   const impRef = useRef(null);

   const [titleValid, setTitleValid] = useState(true);

   const dispatch = useDispatch();

   const [selectedColor, setSelectedColor] = useState(Color.C1);
   const colorChoice: Color[] = [Color.C1, Color.C2, Color.C3];

   function changeColorHandler(e: SyntheticEvent<HTMLInputElement, Event>) {
      const colorInput = (e.target as HTMLInputElement).value;

      setSelectedColor(Color[colorInput as keyof typeof Color]);
   }

   function addTaskHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const titleInput = (titleRef.current! as HTMLInputElement).value;
      const descInput = (descRef.current! as HTMLInputElement).value;
      const impInput = (impRef.current! as HTMLInputElement).checked;

      if (titleInput.trim().length === 0) {
         setTitleValid(false);
         return;
      }

      const newTask: Task = {
         id: uuid(),
         title: titleInput,
         description: descInput,
         dateCreated: Date.now(),
         imp: impInput,
         complete: false
      }

      dispatch(taskActions.addTask(newTask));
      props.onHide();

   }

   const titleChangeHandler = () => setTitleValid(true);
   const checkTitleValidity = (e: FocusEvent<HTMLInputElement>) => {
      if(e.target.value.length === 0) setTitleValid(false);
   };

   return (
      <Modal isVisible={props.isVisible} onHide={props.onHide}>
         <Box>
            <form onSubmit={addTaskHandler} className={cls.form}>
               <div className={cls.formControl}>
                  <label htmlFor="title">Title</label>
                  <input onChange={titleChangeHandler} onBlur={checkTitleValidity} className={`${!titleValid && cls.error}`} ref={titleRef} placeholder="Buy Grocery" type="text" id="title" />
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
                  <textarea ref={descRef} placeholder="Fruits, vegetables, brush etc..." id="desc" />
               </div>
               <div className={`${cls.formControl} ${cls.formControlRow}`}>
                  <label htmlFor="imp">Important</label>
                  <label className={cls.switch}>
                     <input ref={impRef} id="imp" type="checkbox" />
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
                           <input onSelect={changeColorHandler} value={color} name='color' id={color} type="radio" hidden />
                        </label>
                     ))}
                  </div>
               </div>
               <div className={cls.actions}>
                  <Button type="submit" variant="contained" sx={buttonStyles}>
                     Add
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
export default AddTaskForm;
