import cls from './Search.module.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Search() {
   return (
      <div className={cls.searchWrapper}>
         <input type="text" placeholder="Search Tasks" className={cls.search} />
         <SearchOutlinedIcon className={cls.searchIcon} />
      </div>
   );
}
export default Search;
