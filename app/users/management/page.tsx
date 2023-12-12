"use client"

import React, { useState } from "react"
import { Grid, Column, Tag, Breadcrumb, BreadcrumbItem, OverflowMenu, OverflowMenuItem } from "@carbon/react"
import CustomTable from "@/components/CustomTable/CustomTable"
import CTA from "@/components/CTA/CTA"

const headers = [
    {
        key: "userId",
        header: "ID"
    },
    {
        key: "name",
        header: "Name"
    },
    {
        key: "type",
        header: "User type"
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

const Overflow = () => {
    return (
        <OverflowMenu>
            <OverflowMenuItem itemText="Edit user" />
            <OverflowMenuItem itemText="Deactivate user" />
            <OverflowMenuItem hasDivider itemText="Delete user" />
        </OverflowMenu>
    )
}

const rows = [
    {
        userId: "832j01ik",
        name: "Adam Boateng",
        type: "Driver",
        dateCreated: new Date(Date.now()).toDateString(),
        status: <Tag type="red">Deactivated</Tag>,
        actions: <Overflow/>

    }
]


export default function UserManagement() {

    const [ openModal, setOpenModal ] = useState<boolean>();

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
                <CustomTable rows={rows} headers={headers} search button={<CTA label="Create user" modalOpener={setOpenModal}/>}/>
            </Column>
        </Grid>
    )
}