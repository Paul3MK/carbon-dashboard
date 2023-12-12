"use client"
import React, { useState } from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio, Form, TextInput, NumberInput, Button, Modal, Select, SelectItem, TextArea } from "@carbon/react";
import { Add, ArrowRight, ArrowUpRight, Edit } from "@carbon/react/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomTable from "@/components/CustomTable/CustomTable";
import { ActionList } from "../../page";
import EditProductModal from "@/components/Modals/EditProductModal";
import CommonModal from "@/components/Modals/CommonModal";
import { Inputs } from "@/common";
import { useMainStore } from "@/state/mainStore";
import useStore from "@/state/useStore";

export default function CategoryControl() {

  const headers = [
    {
      key: "category",
      header: "Category name"
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

  const [rows, setRows] = useState<Inputs.Categories[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<any>(0);
  const [editingRow, setEditingRow] = useState();
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);


  const addCategory = useMainStore(state => state.addCategory)
  const categories = useStore(useMainStore, state=>state.categories)
  const hasHydrated = useStore(useMainStore, state => state._hasHydrated);

  if(!hasHydrated || typeof categories == "undefined"){
    return <>Loading...</>
  }else{
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
        <h1 className="inventory-control__heading">Categories</h1>
      </Column>
      <Column lg={16}>
        <Grid>
          <Column lg={16}>
            <CustomTable rows={categories} headers={headers} button={
              <Button renderIcon={Add} iconDescription="Add category" onClick={() => setModalOpen(true)} className="page__cta">Add category</Button>
            } />
          </Column>
        </Grid>
      </Column>
      <CommonModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        label="Inventory control"
        headingText="category"
        storeUpdater={(data) => addCategory(data)}
        openEditModal={setEditingModalOpen}
        setEditingRow={setEditingRow}
      >
        {register =>
          <Grid className="inventory__modal__grid">
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <TextInput labelText="Category name" placeholder="e.g. Soft drinks" id="text-1" {...register("category")} />
            </Column>
          </Grid>}
      </CommonModal>
      <EditProductModal
        row={rows.find((row) => row.id === editingRow)}
        dataSetter={(data: Inputs.Categories) => {
          const editedRows = [...rows]
          editedRows[editedRows.findIndex((row) => row.id === data.id)] = data
          return setRows(editedRows)
        }}
        openEdit={editingModalOpen}
        setOpenEdit={setEditingModalOpen}
        setEditingRow={setEditingRow}
        label="Inventory control"
        headingText="category"
      >
        {(row, register) => <Grid className="inventory__modal__grid">
          <Column lg={16} md={8} sm={4} className="inventory__modal__column">
            <TextInput labelText="Category name" placeholder="e.g. Soft drinks..." id="text-1" {...register("category")} defaultValue={
              row?.category} />
          </Column>
        </Grid>}
      </EditProductModal>
    </Grid>
  )}
}