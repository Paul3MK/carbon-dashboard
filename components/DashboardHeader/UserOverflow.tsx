"use client"
import { useAuthStore, useMainStore } from "@/state/mainStore";
import { OverflowMenuItem, OverflowMenu } from "@carbon/react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function UserOverflow({renderIcon}: {renderIcon: any}){

    const logout = useAuthStore(state=>state.logout)
    const router = useRouter();

    return(
        <OverflowMenu aria-label="user-profile-menu" align="right" renderIcon={renderIcon}>
            <OverflowMenuItem itemText="My profile" href="/users/profile"/>
            <OverflowMenuItem itemText="Logout" onClick={()=>{
                logout({
                    username: "paulmkouadio@gmail.com",
                    password: "testing"
                })
                router.replace("/")
            }}/>
        </OverflowMenu>
    )
}