"use client"

import React, { Dispatch, ReactNode, useState } from "react"
import { Grid, Column, Tag, Breadcrumb, BreadcrumbItem, OverflowMenu, OverflowMenuItem, Form, TextInput, Dropdown } from "@carbon/react"
import CustomTable from "@/components/CustomTable/CustomTable"
import CTA from "@/components/CTA/CTA"
import CommonModal from "@/components/Modals/CommonModal"
import { useForm } from "react-hook-form"
import EditModal from "@/components/Modals/EditProductModal"
import { useStore } from "zustand"
import { useMainStore } from "@/state/mainStore"

const headers = [
    {
        key: "userId",
        header: "ID"
    },
    {
        key: "firstName",
        header: "First name"
    },
    {
        key: "lastName",
        header: "Last name"
    },
    {
        key: "email",
        header: "Email"
    },
    {
        key: "phoneNumber",
        header: "Phone number"
    },
    {
        key: "role",
        header: "User role"
    },
    {
        key: "dateCreated",
        header: "Date created"
    },
    {
        key: "status",
        header: "User status"
    },
    {
        key: "actions",
        header: ""
    }
]

const Overflow = ({editAction, rowToEdit, setRowToEdit, rowId}: {editAction: Dispatch<any>, rowToEdit?: ReactNode, setRowToEdit: Dispatch<any>, rowId: string}) => {
    return (
        <OverflowMenu>
            <OverflowMenuItem itemText="Edit user" onClick={() => {
                editAction(true)
                setRowToEdit(rowId)
            }}/>
            <OverflowMenuItem itemText="Deactivate user" />
            <OverflowMenuItem hasDivider itemText="Delete user" />
        </OverflowMenu>
    )
}

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
                        <BreadcrumbItem>
                            <a href="/users">Users</a>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="page__heading">User management</h1>
                </Column>
                <Column lg={16} md={8} sm={4}>
                    <CustomTable rows={users} headers={headers} search button={<CTA label="Create user" link="/users/add"/>}/>
                </Column>
                <EditModal
                    row={getRow(rowToEdit, users)}
                    setEditingRow={setRowToEdit}
                    label="Users"
                    headingText="User"
                    openEdit={openModal}
                    setOpenEdit={setOpenModal}
                    typeToEdit="users"
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