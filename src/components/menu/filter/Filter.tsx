import cls from './Filter.module.css';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../../store/tasks';
import { RootState } from '../../../store';

function Filter() {
   const menuBtnStyles = {
      ...buttonStyles,
      py: 1.3,
      px: 3,
      textTransform: 'capitalize',
      justifyContent: 'flex-start',
   };

   type Filter = 'pending' | 'finished' | 'all' | 'important';
   const filterList: Filter[] = ['pending', 'finished', 'all', 'important'];

   const [currentFilter, setCurrentFilter] = useState<Filter>('all');

   const dispatch = useDispatch();

   const taskStateChanged = useSelector((state: RootState) => state.tasks.stateChanged);

   useEffect(() => {
      dispatch(taskActions.filterTask({filter: currentFilter, sort: null}));
   }, [currentFilter])

   useEffect(() => {
      if (taskStateChanged) {
         dispatch(taskActions.filterTask({filter: currentFilter, sort: null}));
         dispatch(taskActions.resetStateChange());
      }
   }, [taskStateChanged])
   

   function FilterIcon(value: Filter) {
      switch (value) {
         case 'pending':
            return <PendingActionsIcon />;
         case 'all':
            return <ChecklistIcon />;
         case 'finished':
            return <CheckCircleIcon />;
         case 'important':
            return <StarRateRoundedIcon />;
      }
   }

   return (
      <ul className={cls.filter}>
         {filterList.map(filter => (
            <li key={filter}>
               <Button
                  startIcon={FilterIcon(filter)}
                  fullWidth
                  sx={{ ...menuBtnStyles, backgroundColor: currentFilter === filter ? '#bdd3ff91' : 'none' }}
                  color="primary"
                  className={cls.btn}
                  onClick={() => setCurrentFilter(filter)} 
               >
                  {filter} Tasks
               </Button>
            </li>
         ))}
      </ul>
   );
}
export default Filter;
