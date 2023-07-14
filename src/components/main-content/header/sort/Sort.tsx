import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

function Sort() {
   type Sort = '' | 'imp' | 'time-asc' | 'time-dsc';

   const [sortParam, setSortParam] = useState<Sort>('');
   const selectStyles = { fontSize: 15, fontFamily: 'inherit', fontWeight: 500 };

   function handleChange(e: SelectChangeEvent) {
      const el = e.target;
      const sortText = el.value as Sort;
      setSortParam(sortText);
      console.log(sortText);
   }

   return (
      <FormControl color="warning" sx={{ minWidth: 300 }}>
         <InputLabel sx={selectStyles} id="sort">
            Sort by
         </InputLabel>
         <Select sx={selectStyles} labelId="sort" value={sortParam} id="sort-input" label="Sort by" onChange={handleChange}>
            <MenuItem sx={selectStyles} value="">
               None
            </MenuItem>
            <MenuItem sx={selectStyles} value="imp">
               Importance
            </MenuItem>
            <MenuItem sx={selectStyles} value="time-asc">
               Time created (Ascending)
            </MenuItem>
            <MenuItem sx={selectStyles} value="time-dsc">
               Time created (Descending)
            </MenuItem>
         </Select>
      </FormControl>
   );
}
export default Sort;
