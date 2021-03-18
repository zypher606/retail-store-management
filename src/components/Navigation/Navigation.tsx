import React, { useState } from 'react';
import { Header, SideDrawer } from '../';

interface INavigation {
  handleDrawerToggle: (state: boolean) => void;
  profile: any,
  unreadCount: number;
}

export const Navigation = ({
  handleDrawerToggle,
  profile,
  unreadCount,
}: INavigation) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    const newState = !isDrawerOpen;
    setIsDrawerOpen(newState);
    handleDrawerToggle(newState);
  }
  return (
    <div>
      <Header unreadCount={unreadCount} isDrawerOpen={isDrawerOpen} handleDrawerToggle={toggleDrawer} />
      <SideDrawer handleDrawerClose={toggleDrawer} profile={profile} isDrawerOpen={isDrawerOpen} />
    </div>
  )
}