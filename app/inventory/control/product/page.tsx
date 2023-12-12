"use client"
import React, { useState } from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio, Form, TextInput, NumberInput, Button, Modal, Select, SelectItem, TextArea } from "@carbon/react";
import { Add, ArrowRight, ArrowUpRight, Edit } from "@carbon/react/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomTable from "@/components/CustomTable/CustomTable";
import { ActionList } from "../../page";
import EditProductModal from "@/components/Modals/EditProductModal";
import CommonModal from "@/components/Modals/CommonModal";
import { useMainStore } from "@/state/mainStore";
import useStore from "@/state/useStore";

export default function CreateProduct() {

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
      header: "Volume (mL)"
    },
    {
      key: "category",
      header: "Category"
    },
    {
      key: "actions",
      header: ""
    },
  ]

  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<any>(0);
  const [editingRow, setEditingRow] = useState();
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);

  const products = useStore(useMainStore, state=>state.products);
  const addProduct = useMainStore(state=>state.addProduct);
  const hasHydrated = useStore(useMainStore, state => state._hasHydrated);
  const deleteRecord = useMainStore(state=>state.deleteProduct)
  // ALTERNATIVELY: const addProduct = useStore(state => state.addProduct)
  console.log(products)

  if(!hasHydrated || typeof products == "undefined"){
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
        <h1 className="inventory-control__heading">Products</h1>
      </Column>
      <Column lg={16}>
        <Grid>
          <Column lg={16}>
            <CustomTable
              rows={products}
              headers={headers}
              button={
                <Button renderIcon={Add} iconDescription="Add product" onClick={() => setModalOpen(true)} className="page__cta">Add product</Button>
              }
              openEditModal={setEditingModalOpen}
              setEditingRow={setEditingRow}
            />
          </Column>
        </Grid>
      </Column>
      <CommonModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        label="Inventory control"
        headingText="product"
        // storeUpdater={(data) => (setRows([...rows, data]))}
        storeUpdater={data=>addProduct(data)}
        setEditingRow={setEditingRow}
        openEditModal={setEditingModalOpen}
      >
        {register => <Grid className="inventory__modal__grid">
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
                <NumberInput label="Volume (mL)" placeholder="e.g. 500" id="number-3" {...register("volume")} max={5000} min={0} step={100} />
              </Column>
            </Grid>
          </Column>
          <Column lg={16} md={8} sm={4} className="inventory__modal__column">
            <Grid>
              <Column lg={8} md={4} sm={4}>
                <Select id="select-1" labelText="Category" defaultValue="placeholder-item" {...register("category")}>
                  <SelectItem disabled hidden value="placeholder-item" text="Choose a category" />
                  <SelectItem value="Beer" text="Beer" />
                  <SelectItem value="Bitters" text="Bitters" />
                  <SelectItem value="Energy drink" text="Energy drink" />
                  <SelectItem value="Water" text="Water" />
                </Select>
              </Column>
              <Column lg={8} md={4} sm={4}>
                <Select id="select-1" labelText="Brand" defaultValue="placeholder-item" {...register("brand")}>
                  <SelectItem disabled hidden value="placeholder-item" text="Choose a brand" />
                  <SelectItem value="Alomo Silver" text="Alomo Silver" />
                  <SelectItem value="Alomo Black" text="Alomo Black" />
                  <SelectItem value="Alomo Gold" text="Alomo Gold" />
                </Select>
              </Column>
            </Grid>
          </Column>
          <Column lg={16} md={8} sm={4} className="inventory__modal__column">
            <TextArea placeholder="Write a description here..." labelText="Product description" id="textarea-1" rows={4} {...register("description")} />
          </Column>
        </Grid>}
      </CommonModal>
      <EditProductModal
        row={rows.find((row) => row.id === editingRow)}
        dataSetter={(data) => {
          const editedRows = [...rows]
          editedRows[editedRows.findIndex((row) => row.id === data.id)] = data
          console.log(editedRows)
          return setRows(editedRows)
        }}
        openEdit={editingModalOpen}
        setOpenEdit={setEditingModalOpen}
        setEditingRow={setEditingRow}
        label="Inventory control"
        headingText="product"
      >
        {(row, register) =>
          <Grid className="inventory__modal__grid">
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <TextInput labelText="Product name" placeholder="e.g. Fanta Cocktail..." id="text-1" {...register("product")} />
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Unit price (GHS)" id="number-2" {...register("cost")} max={10000} min={0} step={1} />
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Quantity" id="number-1" {...register("quantity")} max={1000} min={0} step={10} />
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <TextInput labelText="SKU" placeholder="e.g. 12345678" id="text-2" {...register("sku")} />
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <NumberInput label="Volume (mL)" placeholder="e.g. 500" id="number-3" {...register("volume")} max={5000} min={0} step={100} />
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <Select id="select-1" labelText="Category" {...register("category")}>
                    <SelectItem disabled hidden value="placeholder-item" text="Choose a category" />
                    <SelectItem value="Beer" text="Beer" />
                    <SelectItem value="Bitters" text="Bitters" />
                    <SelectItem value="Energy drink" text="Energy drink" />
                    <SelectItem value="Water" text="Water" />
                  </Select>
                </Column>
                <Column lg={8} md={4} sm={4}>
                  <Select id="select-1" labelText="Brand" {...register("brand")}>
                    <SelectItem disabled hidden value="placeholder-item" text="Choose a brand" />
                    <SelectItem value="Alomo Silver" text="Alomo Silver" />
                    <SelectItem value="Alomo Black" text="Alomo Black" />
                    <SelectItem value="Alomo Gold" text="Alomo Gold" />
                  </Select>
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="inventory__modal__column">
              <TextArea placeholder="Write a description here..." labelText="Product description" id="textarea-1" rows={4} {...register("description")} />
            </Column>
          </Grid>}
      </EditProductModal>
    </Grid>
  )}
}