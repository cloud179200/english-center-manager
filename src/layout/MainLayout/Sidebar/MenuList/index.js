import React from 'react';
// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import {menuItems, menuItemsAdmin}  from '../../../../menu-items/index';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const userDetail = useSelector(state => state.user.userDetail)
    const navItems = (userDetail?.user_Type === 1 ? menuItemsAdmin : menuItems).items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
