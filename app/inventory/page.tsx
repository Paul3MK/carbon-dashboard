"use client"
import { Grid, Column, Modal, Form, Button, TextInput, NumberInput, ButtonSet, TextArea, Pagination, Select, SelectItem } from "@carbon/react";
import { Add } from "@carbon/react/icons"
import React, { Dispatch, useState } from "react";
import InventoryTable from "./InventoryTable";
import { useForm, SubmitHandler } from "react-hook-form"
import EditProductModal from "@/components/EditProductModal/EditProductModal";

export default function Inventory() {

  const headers = [
    {
      key: "product",
      header: "Product name"
    },
    {
      key: "sku",
      header: "SKU"
    },
    {
      key: "brand",
      header: "Brand"
    },
    {
      key: "quantity",
      header: "Quantity"
    },
    {
      key: "cost",
      header: "Unit cost (GHS)"
    },
    {
      key: "volume",
      header: "Volume"
    },
    {
      key: "category",
      header: "Category"
    },
    {
      key: "actions",
      header: "Actions"
    },
  ]

  type Row = {

  }

  type ProductInputs = {
    product: string,
    quantity: number,
    cost: number,
    description: string,
    sku: string,
    category: "bitters" | "beer" | "water" | "energy drinks",
    brand: string,
    volume: number
  }

  const [rows, setRows] = useState<any[]>([]);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const [editingRow, setEditingRow] = useState<any>();
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductInputs>()
  const onSubmit: SubmitHandler<ProductInputs> = (_data) => {
    const data = { ..._data, id: rowId.toString(), actions: <ActionList rowId={rowId.toString()} setterFunction={setEditingRow} openEditModal={setEditingModalOpen} /> }
    setRows([...rows, data])
    setRowId(rowId + 1)
    console.log(data)
  }

  return (
    <Grid>
      <Column className="inventory__banner" lg={16} md={8} sm={4}>
        <h1 className="page__heading">Inventory</h1>
        {/* <Button renderIcon={Add} iconDescription="Add product" onClick={()=>setModalOpen(true)} className="page__cta">Add product</Button> */}
      </Column>
      <Column className="inventory__table" lg={16} md={8} sm={4}>
        <InventoryTable headers={headers} rows={rows} button={
          <Button renderIcon={Add} iconDescription="Add product" onClick={() => setModalOpen(true)} className="page__cta">Add product</Button>
        } />
        <Pagination
          totalItems={rows.length}
          pageSize={currentPageSize}
          pageSizes={[10, 20, 50]}
          itemsPerPageText="Products per page"
          onChange={({ page, pageSize }) => {
            if (pageSize != currentPageSize) {
              setCurrentPageSize(pageSize)
            }
            setFirstRowIndex(pageSize * (page - 1))
          }}
        />
      </Column>
      <Modal
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => {
          handleSubmit(onSubmit)()
          return setModalOpen(false)
        }}
        onSecondarySubmit={() => setModalOpen(false)}
        modalHeading="Add a product"
        modalLabel="Inventory"
        primaryButtonText="Add product"
        secondaryButtonText="Cancel"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid className="inventory__modal__grid">
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <TextInput labelText="Product name" placeholder="e.g. Fanta Cocktail..." id="text-1" {...register("product")} />
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Unit price (GHS)" id="number-2" value={0} {...register("cost")} max={10000} min={0} step={1} />
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Quantity" value={0} id="number-1" {...register("quantity")} max={1000} min={0} step={10} />
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <TextInput labelText="SKU" placeholder="e.g. 12345678" id="text-2" {...register("sku")} />
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Volume (mL)" placeholder="e.g. 500" id="number-3" {...register("volume")} max={5000} min={0} step={100}/>
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <Select id="select-1" labelText="Category" defaultValue="placeholder-item" {...register("category")}>
                    <SelectItem disabled hidden value="placeholder-item" text="Choose a category" />
                    <SelectItem value="beer" text="Beer" />
                    <SelectItem value="bitters" text="Bitters" />
                    <SelectItem value="energy drink" text="Energy drink" />
                    <SelectItem value="water" text="Water" />
                  </Select>
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <Select id="select-1" labelText="Brand" defaultValue="placeholder-item" {...register("brand")}>
                    <SelectItem disabled hidden value="placeholder-item" text="Choose a brand" />
                    <SelectItem value="alomo silver" text="Alomo Silver" />
                    <SelectItem value="alomo black" text="Alomo Black" />
                    <SelectItem value="alomo gold" text="Alomo Gold" />
                  </Select>
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <TextArea placeholder="Write a description here..." labelText="Product description" id="textarea-1" rows={4} {...register("description")} />
            </Column>
          </Grid>
        </Form>
      </Modal>
      <EditProductModal
        row={rows.find((row) => row.id === editingRow)}
        dataSetter={(data) => setRows([...rows, data])}
        openEdit={editingModalOpen}
        setOpenEdit={setEditingModalOpen}
      />
    </Grid>
  )
}

const ActionList = ({ rowId, setterFunction, openEditModal }: { rowId: string, setterFunction: Dispatch<any>, openEditModal: Dispatch<any> }) => {
  return (
    <div style={{ display: "flex" }}>
      <Button kind="ghost" onClick={() => {
        setterFunction(rowId)
        openEditModal(true)
      }}>
        Edit</Button>
      <Button kind="danger--ghost">Delete</Button>
    </div>
  )
}
