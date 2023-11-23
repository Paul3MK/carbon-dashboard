"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Modal, Form, TextInput, NumberInput, TextArea } from "@carbon/react"

export default function EditProductModal({ row, dataSetter, openEdit, setOpenEdit }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs.Products>()
  const onSubmit: SubmitHandler<Inputs.Products> = data => dataSetter(data)
  console.log(row)
  return (
    <Modal
      open={openEdit}
      onRequestClose={() => setOpenEdit(false)}
      onRequestSubmit={() => {
        handleSubmit(onSubmit)()
        return setOpenEdit(false)
      }}
      onSecondarySubmit={() => setOpenEdit(false)}
      modalHeading="Edit a product"
      modalLabel="Inventory"
      primaryButtonText="Save edits"
      secondaryButtonText="Cancel"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput labelText="Product name" value={row?.product} placeholder="e.g. Fanta Cocktail..." id="text-1" {...register("product")} />
        <NumberInput label="Quantity" value={row?.quantity} id="number-1" {...register("quantity")} max={1000} min={0} step={10} />
        <NumberInput label="Unit price (GHS)" id="number-2" value={row?.cost} {...register("cost")} max={10000} min={0} step={1} />
        <TextArea placeholder="Write a description here..." labelText="Product description" id="textarea-1" rows={4} {...register("description")} />
      </Form>
    </Modal>)

}
