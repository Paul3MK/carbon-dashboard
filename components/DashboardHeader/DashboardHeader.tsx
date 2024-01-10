"use client"

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  OverflowMenuItem,
  OverflowMenu,
} from '@carbon/react';
import { Switcher, Notification, UserAvatar, BottlesContainer, List, Report, BuildTool, UserServiceDesk, UserAdmin, UserFavorite, Email } from "@carbon/icons-react"
import Link from 'next/link';
import UserOverflow from './UserOverflow';
import { useState } from 'react';

export default function DashboardHeader() {

  const [ overflowOpen, setOverflowOpen ] = useState<boolean>(false)

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Carbon Dashboard">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <Link href="/" passHref legacyBehavior>
            <HeaderName prefix="PeoplesPay">Manufacturing</HeaderName>
          </Link>
          <HeaderNavigation aria-label="Carbon Tutorial">
            <Link href="/inventory" passHref legacyBehavior>
              <HeaderMenuItem>Inventory</HeaderMenuItem>
            </Link>
            <Link href="/requests" passHref legacyBehavior>
              <HeaderMenuItem>Requests</HeaderMenuItem>
            </Link>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notifications"
              tooltipAlignment="center"
            >
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="User Avatar"
              tooltipAlignment="center"
              onClick={()=>{setOverflowOpen(true)}}
              >
                <UserAvatar size={20}/>
              <UserOverflow renderIcon={UserAvatar} open={overflowOpen}/>
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
              <Switcher size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  )
}
