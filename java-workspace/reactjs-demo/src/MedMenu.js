import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    
  };

  return (
    <div>
      <Menu id="simple-menu" keepMounted  open={true}>
        <MenuItem onClick={handleClick}>Profile</MenuItem>
        <MenuItem onClick={handleClick}>My account</MenuItem>
        <MenuItem onClick={handleClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

