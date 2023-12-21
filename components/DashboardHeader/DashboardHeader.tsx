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
  OverflowMenu
} from '@carbon/react';
import { Switcher, Notification, UserAvatar, BottlesContainer, List, Report, BuildTool, UserServiceDesk, UserAdmin, UserFavorite, Email } from "@carbon/icons-react"
import Link from 'next/link';
import UserOverflow from './UserOverflow';

export default function DashboardHeader() {
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
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}
            onSideNavBlur={onClickSideNavExpand}
            isRail
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <Link href="/inventory" passHref legacyBehavior>
                  <HeaderMenuItem>Inventory</HeaderMenuItem>
                </Link>
                <Link href="/requests" passHref legacyBehavior>
                  <HeaderMenuItem>Requests</HeaderMenuItem>
                </Link>
              </HeaderSideNavItems>
              <SideNavMenu renderIcon={UserAdmin} title="User">
                <SideNavMenuItem href="/users/management">
                  User management
                </SideNavMenuItem>
                <SideNavMenuItem href="/users/add">
                  Add user
                </SideNavMenuItem>
                <SideNavMenuItem href="/profile">
                  My profile
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={UserServiceDesk} title="Contact">
                <SideNavMenuItem href="#">
                  Contact management
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={UserFavorite} title="CRM">
                <SideNavMenuItem href="#">
                  Setup customers
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Manage customers
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Sales leads
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Sales pipeline
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Manage leads
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Email} title="Mass Email">
                <SideNavMenuItem href="#">
                  Spam check
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Import email list
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={BottlesContainer} title="Inventory">
                {/* <SideNavMenuItem href="/inventory">
                  Home
                </SideNavMenuItem> */}
                <SideNavMenuItem href="/inventory/control">
                  Inventory control
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Edit inventory control
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Stock levels
                </SideNavMenuItem>
                <SideNavMenuItem href="/inventory/management">
                  Inventory management
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Stock shop
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Report} title="Reports">
                <SideNavMenuItem href="#">
                  Inventory report
                </SideNavMenuItem>
                <SideNavMenuItem href="#">
                  Sales report
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={List} href="/transactions">
                Transactions
              </SideNavLink>
              <SideNavLink renderIcon={BuildTool} href="/setup">
                Setup
              </SideNavLink>
            </SideNavItems>
          </SideNav>
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
              >
              <UserOverflow renderIcon={UserAvatar}/>
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
