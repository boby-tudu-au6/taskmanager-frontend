import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

function CustomeSelect(props) {
    const { label, value, onChange, options, className, name } = props;
    return (
        <FormControl size="small" variant="outlined" fullWidth className={className}>
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            <Select
            value={value}
            onChange={onChange}
            label={label}
            inputProps={{
                name: name,
                id: `outlined-${name}-native-simple`,
            }}
            >
            {
                options.map((item, i) => (
                    <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    )
}

export default CustomeSelect
