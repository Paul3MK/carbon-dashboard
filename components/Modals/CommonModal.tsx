"use client"

import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form"
import { Modal, Form, TextInput, NumberInput, TextArea, Grid, Column, Select, SelectItem } from "@carbon/react"
import { ActionList } from "@/app/inventory/page";
import { Inputs } from "@/common";

export default function CommonModal({ modalOpen, setModalOpen, label, headingText, storeUpdater, openEditModal, setEditingRow, children }: { storeUpdater: (arg: any) => void, modalOpen: boolean, setModalOpen: Dispatch<any>, label: string, headingText: string, openEditModal: Dispatch<any>, setEditingRow: Dispatch<any>, children: any }) {

    const [rowId, setRowId] = useState<number>(0)


    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs.Products & Inputs.Categories>()
    const onSubmit: SubmitHandler<Inputs.Products & Inputs.Categories> = data => {
        data.dateCreated = new Date(Date.now()).toDateString()
        storeUpdater({ ...data, id: rowId, actions: "" })
        return setRowId(rowId + 1)
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

    return (
        <Modal
            open={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            onRequestSubmit={() => {
                handleSubmit(onSubmit)()
                return setModalOpen(false)
            }}
            onSecondarySubmit={() => setModalOpen(false)}
            modalHeading={`Add a ${headingText}`}
            modalLabel={label}
            primaryButtonText={`Add ${headingText}`}
            secondaryButtonText="Cancel"
        >
            <Form>
                {children(register)}
            </Form>
        </Modal>)

} 