"use client"

import { Content, Theme } from "@carbon/react"
import React from "react"

import DashboardHeader from "@/components/DashboardHeader/DashboardHeader"

export function Providers({children}: {children: any}){
  return(
    <div>
      <Theme theme="g100">
        <DashboardHeader />
      </Theme>
      <Content>{children}</Content>
    </div>
  )
}
