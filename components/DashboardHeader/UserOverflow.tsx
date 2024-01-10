"use client"
import { useAuthStore, useMainStore } from "@/state/mainStore";
import { OverflowMenuItem, OverflowMenu, Menu, MenuItem } from "@carbon/react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function UserOverflow({renderIcon, open}: {renderIcon: any, open: boolean}){

    const logout = useAuthStore(state=>state.logout)
    const router = useRouter();

    return(
        <Menu aria-label="user-profile-menu" align="right" open={open}>
            <MenuItem itemText="My profile" href="/users/profile"/>
            <MenuItem itemText="Logout" onClick={()=>{
                logout({
                    username: "paulmkouadio@gmail.com",
                    password: "testing"
                })
                router.replace("/")
            }}/>
        </Menu>
    )
}