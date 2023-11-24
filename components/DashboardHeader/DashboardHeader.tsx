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
} from '@carbon/react';
import { Switcher, Notification, UserAvatar, BottlesContainer, List, Report, BuildTool, UserAccess } from "@carbon/icons-react"
import Link from 'next/link';

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
              <SideNavMenu renderIcon={UserAccess} title="Users">
                <SideNavMenuItem href="/">
                  User management
                </SideNavMenuItem>
                <SideNavMenuItem href="/">
                  User link 2
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={BottlesContainer} title="Inventory">
                <SideNavMenuItem href="/inventory">
                  Inventory control
                </SideNavMenuItem>
                <SideNavMenuItem href="/inventory">
                  Inventory management
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Report} href="/reports">
                Reports
              </SideNavLink>
              <SideNavLink renderIcon={List} href="/">
                Transactions
              </SideNavLink>
              <SideNavLink renderIcon={BuildTool} href="/">
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
              <UserAvatar size={20} />
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
