import cls from './Filter.module.css';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../../store/tasks'
import { FilterText } from '../../../interfaces/task';
import { RootState } from '../../../store';

function Filter() {
   const menuBtnStyles = {
      ...buttonStyles,
      py: 1.3,
      px: 3,
      textTransform: 'capitalize',
      justifyContent: 'flex-start',
   };

   const filterList: FilterText[] = ['pending', 'finished', 'all', 'important'];

   const currentFilter = useSelector((state: RootState) => state.tasks.filterCriteria);

   const dispatch = useDispatch();

   const changeFilterHandler = function(this: FilterText) {
      dispatch(taskActions.filterTask(this));
   }

   function FilterIcon(value: FilterText) {
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
                  onClick={changeFilterHandler.bind(filter)} 
               >
                  {filter} Tasks
               </Button>
            </li>
         ))}
      </ul>
   );
}
export default Filter;
