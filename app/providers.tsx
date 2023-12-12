"use client"

import { Content, Theme } from "@carbon/react"
import React from "react"
import Login from "@/components/Auth/login"
import { useAuthStore } from "@/state/mainStore"
import useStore from "@/state/useStore"
import { InlineLoading } from "@carbon/react"
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader"


export function Providers({ children }: { children: any }) {
  const loggedIn = useStore(useAuthStore, state => state.loggedIn)
  const loggedOut = useStore(useAuthStore, state => state.loggedOut)
  
  if (loggedIn && !loggedOut) {
    return (
      <div>
        <Theme theme="g100">
          <DashboardHeader />
        </Theme>
        <Content>{children}</Content>
      </div>
    )
  } else if (!loggedIn && loggedOut) {
    return (
      <Login/>
    )
  } else {
    return (
      <div>
        <Theme theme="g100">
          <DashboardHeader />
        </Theme>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
          <InlineLoading status="active" description="Loading data..." style={{ justifyContent: "center" }} />
        </div>
      </div>
    )
  }
}
