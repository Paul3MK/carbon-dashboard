"use client"

import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form"
import { Modal, Form, TextInput, NumberInput, TextArea, Grid, Column, Select, SelectItem } from "@carbon/react"
import { ActionList } from "@/app/inventory/page";
import { Inputs } from "@/common";

export default function AddModal({ 
    isOpen,
    label,
    headingText,
    children,
    setOpen,
    storeUpdater,
}: {
    isOpen: boolean,
    label: string,
    headingText: string,
    children: any,
    storeUpdater?: (arg: any) => void,
    setOpen: Dispatch<any>,
}){

    const [rowId, setRowId] = useState<number>(0)

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs.Products & Inputs.Categories>()
    const onSubmit: SubmitHandler<Inputs.Products & Inputs.Categories> = data => {
        console.log(data)
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

    return (
        <Modal
            open={isOpen}
            onRequestClose={() => setOpen(false)}
            onRequestSubmit={() => {
                handleSubmit(onSubmit)()
                return setOpen(false)
            }}
            onSecondarySubmit={() => setOpen(false)}
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