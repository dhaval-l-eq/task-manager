import cls from './Menu.module.css';
import Clock from './clock/Clock';
import AddTask from './add-task/AddTask';
import Filter from './filter/Filter';

function Menu() {
   return (
      <aside className={cls.menu}>
         <AddTask />
         <Filter />
         <Clock />
      </aside>
   );
}
export default Menu;
