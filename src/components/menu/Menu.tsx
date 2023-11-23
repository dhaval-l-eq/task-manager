import cls from './Menu.module.css';
import Clock from './clock/Clock';
import AddTask from './add-task/AddTask';
import Filter from './filter/Filter';
import MobileButton from '../../Layout/MobileButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useState } from 'react';

const windowWidth = window.innerWidth;

function Menu() {
   const [filterVisible, setFilterVisible] = useState(false);

   const showFilter = () => setFilterVisible(true);
   const hideFilter = () => setFilterVisible(false);

   return (
      <>
         {windowWidth > 700 ? (
            <aside className={cls.menu}>
               <AddTask />
               <Filter />
               <Clock />
            </aside>
         ) : (
            <div onClick={hideFilter} className={`${!filterVisible && cls.filterHidden} ${cls.mobileMenu}`}>
               <div className={cls.filterWrapper}><Filter /></div>
            </div>
         )}
         <AddTask mobile />
         <MobileButton onClick={showFilter} position="left">
            <FilterAltOutlinedIcon fontSize="large" />
         </MobileButton>
      </>
   );
}
export default Menu;
