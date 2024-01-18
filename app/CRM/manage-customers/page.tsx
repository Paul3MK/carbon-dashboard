"use client"

import React, { Dispatch, ReactNode, useState } from "react"
import { Grid, Column, Tag, Breadcrumb, BreadcrumbItem, OverflowMenu, OverflowMenuItem, Form, TextInput, Dropdown, Button } from "@carbon/react"
import CustomTable from "@/components/CustomTable/CustomTable"
import CTA from "@/components/CTA/CTA"
import Overflow from "@/components/OverflowMenus/Overflow"
import EditModal from "@/components/Modals/EditModal"
import { useStore } from "zustand"
import { useMainStore } from "@/state/mainStore"

const headers = [
    {
        key: "customerCode",
        header: "Customer Code"
    },
    {
        key: "customerName",
        header: "Customer Name"
    },
    {
        key: "email",
        header: "Email"
    },
    {
        key: "phoneNumber",
        header: "Phone"
    },
    {
        key: "address",
        header: "Address"
    },
    {
        key: "city",
        header: "City"
    },
    {
        key: "state/reg",
        header: "State/Region"
    },
     {
        key: "country",
        header: "Country"
    },
    {
        key: "status",
        header: "Status"
    },
    {
        key: "actions",
        header: ""
    }
]

function getRow(id, rows){
    return rows.filter((row)=> row.id == id)[0]
}

export default function UserManagement() {

    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ rowToEdit, setRowToEdit ] = useState<string>("");

    const editUser = useMainStore(state => state.editUser)
    const _users = useStore(useMainStore, state=>state.users)
    const hasHydrated = useStore(useMainStore, state => state._hasHydrated)


    const users = _users.map((_user)=>{
        const user = {..._user}
        Object.defineProperty(user, "actions", {
            value: <Overflow editAction={setOpenModal} rowId={user.id!} setRowToEdit={setRowToEdit}/>
        })
        const status = user.status
        user.status = <Tag type="red">{status}</Tag>
        return user
    })
    if(users){
        console.log(rowToEdit)
        return (
            <Grid>
                <Column lg={16} md={8} sm={4} className="page__banner">
                    <Breadcrumb>
                    
                    </Breadcrumb>
                    <h1 className="page__heading">Manage customers</h1>
                    <Button>Copy</Button>
                    <button>CSV</button>
                    <button>Excel</button>
                    <button>Print</button>
                </Column>
                <Column lg={16} md={8} sm={4}>
                    <CustomTable rows={users} headers={headers} search button/>
                </Column>
                <EditModal
                    row={getRow(rowToEdit, users)}
                    label="Users"
                    headingText="User"
                    setOpen={setOpenModal}
                    isOpen={openModal}
                >
                    {(row, register) =>
                        <Grid>
                            <Column lg={8}>
                                <TextInput labelText="First name" id="firstName" defaultValue={row?.firstName} {...register("firstName")}/>
                            </Column>
                            <Column lg={8}>
                                <TextInput labelText="Last name" id="lastName" defaultValue={row?.lastName} {...register("lastName")}/>
                            </Column>
                            <Column lg={8}>
                                <TextInput labelText="Email" id="email" defaultValue={row?.email} {...register("email")}/>
                            </Column>
                            <Column lg={8}>
                                <TextInput labelText="Phone number" id="phoneNumber" defaultValue={row?.phoneNumber} {...register("phoneNumber")}/>
                            </Column>
                            <Column lg={8}>
                                <Dropdown label="Role" initialSelectedItem={row?.role} titleText="Role" id="role" items={["Admin", "Support", "Salesperson"]} {...register("role")}/>
                            </Column>
                        </Grid>
                    }
                </EditModal>
            </Grid>
        )
    }
}