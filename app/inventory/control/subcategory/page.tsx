"use client"
import React, { useState } from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio, Form, TextInput, NumberInput, Button, Modal, Select, SelectItem, TextArea } from "@carbon/react";
import { Add, ArrowRight, ArrowUpRight, Edit } from "@carbon/react/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomTable from "@/components/CustomTable/CustomTable";
import { ActionList } from "../../page";
import EditModal from "@/components/Modals/EditModal";
import AddModal from "@/components/Modals/AddModal";
import { Inputs } from "@/common";

export default function SubcategoryControl() {

  const headers = [
    {
      key: "subcategory",
      header: "Subcategory"
    },  
    {
      key: "dateCreated",
      header: "Date created"
    },
    {
      key: "actions",
      header: "Actions"
    },
  ]

  const [rows, setRows] = useState<Inputs.Subcategories[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<any>(0);
  const [editingRow, setEditingRow] = useState();
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs.Subcategories>()
  const onSubmit: SubmitHandler<Inputs.Subcategories> = (_data) => {
    const data = { ..._data, id: rowId?.toString(), actions: <ActionList rowId={rowId?.toString()} setterFunction={setEditingRow} openEditModal={setEditingModalOpen} /> }
    setRows([...rows, data])
    setRowId(rowId + 1)
    console.log(data)
  }


  return (
    <Grid>
      <Column lg={16} className="inventory-control__banner">
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/inventory">Inventory</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/inventory/control">Control</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="inventory-control__heading">Subcategories</h1>
      </Column>
      <Column lg={16}>
        <Grid>
          <Column lg={16}>
            <CustomTable rows={rows} headers={headers} button={
              <Button renderIcon={Add} iconDescription="Add subcategory" onClick={() => setModalOpen(true)} className="page__cta">Add subcategory</Button>
            } />
          </Column>
        </Grid>
      </Column>
      <AddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        label="Inventory control"
        headingText="subcategory"
        storeUpdater={(data)=>(setRows([...rows, data]))}
        openEditModal={setEditingModalOpen}
        setEditingRow={setEditingRow}
      >
        {register => 
        <Grid className="inventory__modal__grid">
          <Column lg={16} md={8} sm={4} className="inventory__modal__column">
            <TextInput labelText="Subcategory name" placeholder="e.g. Soft drinks" id="text-1" {...register("subcategory")} />
          </Column>
        </Grid>}
      </AddModal>
      <EditModal
        row={rows.find((row) => row.id === editingRow)}
        dataSetter={(data: Inputs.Subcategories) => {
          const editedRows = [...rows]
          editedRows[editedRows.findIndex((row) => row.id === data.id)] = data
          console.log(editedRows)
          return setRows(editedRows)
        }}
        openEdit={editingModalOpen}
        setOpen={setEditingModalOpen}
        setEditingRow={setEditingRow}
        label="Inventory control"
        headingText="subcategory"
      >
        {(row, register) => <Grid className="inventory__modal__grid">
          <Column lg={16} md={8} sm={4} className="inventory__modal__column">
            <TextInput labelText="Subcategory name" placeholder="e.g. Soft drinks..." id="text-1" {...register("subcategory")} defaultValue={
              row?.subcategory} />
          </Column>
        </Grid>}
      </EditModal>
    </Grid>
  )
}