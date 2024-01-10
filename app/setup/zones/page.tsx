"use client"

import React, { SetStateAction, useState } from "react";
import EditModal from "@/components/Modals/EditModal";
import CustomTable from "@/components/CustomTable/CustomTable";
import {
    Grid,
    Column,
    Modal,
    TextInput,
    NumberInput,
    Select,
    SelectItem,
    TextArea,
    Form,
    OverflowMenuItem,
    OverflowMenu,
    Breadcrumb,
    BreadcrumbItem
} from "@carbon/react";
import { ActionList } from "@/app/inventory/page";
import CTA from "@/components/CTA/CTA";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "@/common";
import AddModal from "@/components/Modals/AddModal";


export default function Zones() {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editingRow, setEditingRow] = useState<Inputs.Zones>();
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<Inputs.Zones[]>([
        {
            zoneCode: "931M",
            zoneName: "Adenta West",
            gps: "21kS+W",
            actions: <Overflow openEditModal={setEditModalOpen} />
        }
    ]);

    const headers = [
        {
            key: "zoneCode",
            header: "Zone code"
        },
        {
            key: "zoneName",
            header: "Zone name"
        },
        {
            key: "gps",
            header: "GPS"
        },
        {
            key: "actions",
            header: ""
        },
    ]





    const { register, handleSubmit, formState: { errors } } = useForm<Inputs.Zones>();
    const onSubmit: SubmitHandler<Inputs.Zones> = (data) => {
        setRows([...rows, data])
    }

    return (
        <Grid>
            <Column lg={16} className="page__banner">
                <Breadcrumb>
                    <BreadcrumbItem href="/setup">Setup</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page__heading">Zones</h1>
            </Column>
            <Column lg={16}>
                <CustomTable headers={headers} rows={rows} button={<CTA label="Add zone" modalOpener={setModalOpen} />} search={true} />
            </Column>
            <AddModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                label="Zones"
                headingText="zone"
                storeUpdater={(data)=>setRows([...rows, data])}
                openEditModal={setEditModalOpen}
                setEditingRow={setEditingRow}
            >
                {register=><Grid className="zone__modal__grid">
                        <Column lg={16} md={8} sm={4} className="zone__modal__column modal__column">
                            <TextInput labelText="Zone name" placeholder="e.g. Fanta Cocktail..." id="text-1" {...register("zoneName")} />
                        </Column>
                        <Column lg={16} md={8} sm={4} className="zone__modal__column modal__column">
                            <Grid>
                                <Column lg={8} md={4} sm={4}>
                                    <TextInput labelText="Zone code" id="text-2" {...register("zoneCode")} />
                                </Column>
                                <Column lg={8} md={4} sm={4}>
                                    <TextInput labelText="GPS" id="text-3" {...register("gps")} />
                                </Column>
                            </Grid>
                        </Column>
                    </Grid>}
            </AddModal>
            <EditModal
                row={rows.find((_row: Inputs.Zones) => _row.id === editingRow)}
                dataSetter={(data)=>rowDataEdit(data, rows, setRows)}
                label="Zones"
                headingText="zone"
                openEdit={editModalOpen}
                setOpen={setEditModalOpen}
                setEditingRow={setEditingRow}
            >
                {(row, register) => <Grid></Grid>}
            </EditModal>
        </Grid>
    )
}

const Overflow = ({ openEditModal }) => {
    return (
        <OverflowMenu>
            <OverflowMenuItem itemText="Edit zone" onClick={() => openEditModal(true)} />
            <OverflowMenuItem itemText="Delete zone" />
        </OverflowMenu>
    )
}

function rowDataEdit<T>(newData:T, rows:T[], rowUpdater:SetStateAction<any>){
    let editedRows = [...rows]
    editedRows[editedRows.findIndex((row) => row.id === newData.id)] = newData
    return rowUpdater(editedRows)
}