"use client"

import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Modal, Form, TextInput, NumberInput, TextArea, Grid, Column, Select, SelectItem, ToastNotification } from "@carbon/react"
import { ActionList } from "@/app/inventory/page";
import { Inputs } from "@/common";
import { useMainStore } from "@/state/mainStore";
import endpointsConfig from "@/endpoints.config";

export default function EditModal({
    row,
    isOpen,
    label,
    headingText,
    children,
    setOpen,
  }: { row: any, isOpen: boolean, setOpen: Dispatch<any>, label: string, headingText: string, children: any }) {
  
  const editProduct = useMainStore(state=> state.editProduct)
  const editUser = useMainStore(state=> state.editUser)

  const [showNotification, setShowNotification] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<typeof row>({defaultValues: row})
  
  const onSubmit: SubmitHandler<typeof row> = data => {
    console.log(`Row: ${row?.id}`)
    console.log(data)
    const saveEdit = async() => {
      const request = await fetch(endpointsConfig.BaseUrl+"/inventory/edit-product/", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        }
      })

      if(request.ok){
        setShowNotification(true)
        console.log(request)
      }
    }
    saveEdit()
    // return dataSetter({ ...data, id: row?.id, actions: <ActionList rowId={row?.id} setterFunction={setEditingRow} openEditModal={setOpen} /> })
    // if (typeToEdit == "products"){
    //   return editProduct({...data, id: row?.id})
    // }else if(typeToEdit == "users"){
    //   return editUser({...data, id: row?.id})
    // }
  }
  


  useEffect(()=>{
    reset(row)
  }, [isSubmitSuccessful, isOpen])
  // console.log(row)
  const modalHeading = `Edit a ${headingText}`
  return (
    <Modal
      open={isOpen}
      onRequestClose={() => setOpen(false)}
      onRequestSubmit={() => {
        handleSubmit(onSubmit)()
        // return setOpen(false)
      }}
      onSecondarySubmit={() => setOpen(false)}
      modalHeading={`Edit a ${headingText}`}
      modalLabel={label}
      primaryButtonText="Save edits"
      secondaryButtonText="Cancel"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {children(row, register )}
      </Form>
      {showNotification && <ToastNotification kind="success" />}
    </Modal>
    )

}
