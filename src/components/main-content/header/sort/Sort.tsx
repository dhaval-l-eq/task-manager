import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import inputStyles from '../../../../mui-customization/inputStyles';
import { SortText } from '../../../../interfaces/task';
import { useDispatch } from 'react-redux';
import { taskActions } from '../../../../store/tasks';

function Sort() {

   const [sortParam, setSortParam] = useState<SortText>('');

   const dispatch = useDispatch();

   function handleChange(e: SelectChangeEvent) {
      const el = e.target;
      const sortText = el.value as SortText;
      setSortParam(sortText);
      dispatch(taskActions.sortTask(sortText));
   }

   return (
      <FormControl size='small' color="warning" sx={{ minWidth: 300 }}>
         <InputLabel sx={inputStyles} id="sort">
            Sort by
         </InputLabel>
         <Select sx={inputStyles} labelId="sort" value={sortParam} id="sort-input" label="Sort by" onChange={handleChange}>
            <MenuItem sx={inputStyles} value="">
               None
            </MenuItem>
            <MenuItem sx={inputStyles} value="imp">
               Importance
            </MenuItem>
            <MenuItem sx={inputStyles} value="time-asc">
               Time created (Ascending)
            </MenuItem>
            <MenuItem sx={inputStyles} value="time-dsc">
               Time created (Descending)
            </MenuItem>
         </Select>
      </FormControl>
   );
}
export default Sort;
