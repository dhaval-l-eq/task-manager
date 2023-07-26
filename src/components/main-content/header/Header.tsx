import cls from './Header.module.css';

// import Search from './search/Search';
import Sort from './sort/Sort';

function Header() {
   

   return (
      <div className={cls.wrapper}>
         {/* <Search /> */}
         <Sort />
      </div>
   );
}
export default Header;
