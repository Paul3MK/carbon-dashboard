"use client"

import React, { Dispatch, ReactNode, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Modal, Form, TextInput, NumberInput, TextArea, Grid, Column, Select, SelectItem } from "@carbon/react"
import { ActionList } from "@/app/inventory/page";
import { Inputs } from "@/common";
import { useMainStore } from "@/state/mainStore";

export default function EditModal({ row, dataSetter, openEdit, setOpenEdit, setEditingRow, label, headingText, typeToEdit, children }: { row: any, dataSetter?: (arg: any) => void, openEdit: boolean, setOpenEdit: Dispatch<any>, setEditingRow: Dispatch<any>, label: string, headingText: string, typeToEdit:string, children: any }) {
  
  const editProduct = useMainStore(state=> state.editProduct)
  const editUser = useMainStore(state=> state.editUser)

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<typeof row>({defaultValues: row})
  
  const onSubmit: SubmitHandler<typeof row> = data => {
    console.log(`Row: ${row?.id}`)
    console.log(data)
    // return dataSetter({ ...data, id: row?.id, actions: <ActionList rowId={row?.id} setterFunction={setEditingRow} openEditModal={setOpenEdit} /> })
    // if (typeToEdit == "products"){
    //   return editProduct({...data, id: row?.id})
    // }else if(typeToEdit == "users"){
    //   return editUser({...data, id: row?.id})
    // }
  }
  


  useEffect(()=>{
    reset(row)
  }, [isSubmitSuccessful, openEdit])
  // console.log(row)
  const modalHeading = `Edit a ${headingText}`
  return (
    <Modal
      open={openEdit}
      onRequestClose={() => setOpenEdit(false)}
      onRequestSubmit={() => {
        handleSubmit(onSubmit)()
        return setOpenEdit(false)
      }}
      onSecondarySubmit={() => setOpenEdit(false)}
      modalHeading={`Edit a ${headingText}`}
      modalLabel={label}
      primaryButtonText="Save edits"
      secondaryButtonText="Cancel"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {children(row, register )}
      </Form>
    </Modal>)

}
