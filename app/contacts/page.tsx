'use client'

import React, { useState } from "react";
import {
    Grid,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    TextInput,
    Dropdown
} from "@carbon/react";
import { Add } from "@carbon/react/icons";
import CustomTable from "@/components/CustomTable/CustomTable";
import EditModal from "@/components/Modals/EditModal";
import Overflow from "@/components/OverflowMenus/Overflow";
import AddModal from "@/components/Modals/AddModal";

const headers = [
    {
        key: "name",
        header: "Name"
    },
    {
        key: "organisation",
        header: "Organisation"
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
        key: "actions",
        header: ""
    }
]


export default function Contacts() {

    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [rowToEdit, setRowToEdit] = useState<string>("");
    const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);

    const contacts = [
        {
            id: "1",
            name: "Timmy",
            organisation: "ABC Inc.",
            email: "tim@abc.inc",
            phoneNumber: "01234567890",
            actions: <Overflow rowSubject="contact" rowId={"1"} editAction={setEditingModalOpen} setRowToEdit={setRowToEdit} />
        },
        {
            id: "2",
            name: "Johnny",
            organisation: "XYZ Corporation",
            email: "johnny@xyz.corp",
            phoneNumber: "01234567890",
            actions: <Overflow rowSubject="contact" rowId={"2"} editAction={setEditingModalOpen} setRowToEdit={setRowToEdit} />
        }
    ]

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className="page__banner">
                <h1 className="page__heading">Contacts</h1>
            </Column>
            <Column lg={16} md={8}>
                <CustomTable
                    rows={contacts}
                    headers={headers}
                    button={<Button renderIcon={Add} onClick={() => setAddModalOpen(true)}>Add contact</Button>}
                    search={true}
                />
            </Column>
            <AddModal
                isOpen={isAddModalOpen}
                label="Contact management"
                headingText="contact"
                setOpen={setAddModalOpen}
            >
                {(register) =>
                    <Grid>
                        <Column lg={8}>
                            <TextInput labelText="Name" id="name" {...register("name")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Organisation" id="organisation" {...register("organisation")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Email" id="email" {...register("email")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Phone number" id="phoneNumber" {...register("phoneNumber")} />
                        </Column>
                    </Grid>
                }
            </AddModal>
            <EditModal
                row={contacts.find((contact) => contact.id == rowToEdit)}
                isOpen={editingModalOpen}
                setOpen={setEditingModalOpen}
                label="Contact management"
                headingText="contact"
            >
                {(row, register) =>
                    <Grid>
                        <Column lg={8}>
                            <TextInput labelText="Name" id="name" defaultValue={row?.name} {...register("firstName")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Organisation" id="organisation" defaultValue={row?.organisation} {...register("organisation")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Email" id="email" defaultValue={row?.email} {...register("email")} />
                        </Column>
                        <Column lg={8}>
                            <TextInput labelText="Phone number" id="phoneNumber" defaultValue={row?.phoneNumber} {...register("phoneNumber")} />
                        </Column>
                    </Grid>
                }
            </EditModal>
        </Grid>
    )
}