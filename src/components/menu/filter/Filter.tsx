import cls from './Filter.module.css';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

function Filter() {
   const menuBtnStyles = { ...buttonStyles, py: 1.3, px: 3, textTransform: 'none', justifyContent: 'flex-start' };

   return (
      <ul className={cls.filter}>
         <li>
            <Button startIcon={<PendingActionsIcon />} fullWidth sx={menuBtnStyles} color="primary" className={cls.btn}>
               Pending Tasks
            </Button>
         </li>
         <li>
            <Button startIcon={<CheckCircleIcon />} fullWidth sx={menuBtnStyles} color="primary" className={cls.btn}>
               Finished Tasks
            </Button>
         </li>
         <li>
            <Button startIcon={<ChecklistIcon />} fullWidth sx={menuBtnStyles} color="primary" className={cls.btn}>
               All Tasks
            </Button>
         </li>
         <li>
            <Button startIcon={<StarRateRoundedIcon />} fullWidth sx={menuBtnStyles} color="primary" className={cls.btn}>
               Important Tasks
            </Button>
         </li>
      </ul>
   );
}
export default Filter;
