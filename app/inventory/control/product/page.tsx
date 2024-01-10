"use client"
import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import {
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  Tile,
  ClickableTile,
  AspectRatio,
  Form,
  TextInput,
  NumberInput,
  Button,
  Modal,
  Select,
  SelectItem,
  TextArea,
  OverflowMenuItem,
  OverflowMenu
} from "@carbon/react";
import { Add, ArrowRight, ArrowUpRight, Edit } from "@carbon/react/icons";
import { useForm, SubmitHandler } from "react-hook-form";


import CustomTable from "@/components/CustomTable/CustomTable";
import Overflow from "@/components/OverflowMenus/Overflow";
import EditModal from "@/components/Modals/EditModal";
import AddModal from "@/components/Modals/AddModal";
import { useMainStore } from "@/state/mainStore";
import useStore from "@/state/useStore";

const headers = [
  {
    key: "name",
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
    key: "store_price",
    header: "Store price (GHS)"
  },
  {
    key: "vol",
    header: "Volume (m^3)"
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

export default function CreateProduct() {

  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<any>(0);
  const [editingRow, setEditingRow] = useState(0);
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);
  const [_products, setProducts] = useState<any[]>([])

  async function getProducts() {
    const request = await fetch("http://3.128.25.124:2002/api/v1/inventory/products/")
    const response = await request.json()

    if (response) {
      setProducts(response)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // const products = useStore(useMainStore, state=>state.products);
  const addProduct = useMainStore(state => state.addProduct);
  const hasHydrated = useStore(useMainStore, state => state._hasHydrated);
  const deleteRecord = useMainStore(state => state.deleteProduct)
  // ALTERNATIVELY: const addProduct = useStore(state => state.addProduct)

  const products = _products?.map((_product) => {
    const product = { ..._product }
    Object.defineProperty(product, "vol", { value: _product.volume.value })
    Object.defineProperty(product, "mass", { value: _product.weight.value })
    Object.defineProperty(product, "actions", {
      value: <Overflow editAction={setEditingModalOpen} setRowToEdit={setEditingRow} rowId={product.id} rowSubject="product"/>
    })
    return product
  })

  console.log(products)

  if (!hasHydrated || typeof products == "undefined") {
    return <>Loading...</>
  } else {
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
                  <Button renderIcon={Add} iconDescription="Add product" href="/inventory/control/product/add" className="page__cta">Add product</Button>
                }
              />
            </Column>
          </Grid>
        </Column>
        <AddModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          label="Inventory control"
          headingText="product"
          // storeUpdater={(data) => (setRows([...rows, data]))}
          storeUpdater={data => addProduct(data)}
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
        </AddModal>
        <EditModal
          row={products.find((row) => row.id === editingRow)}
          isOpen={editingModalOpen}
          setOpen={setEditingModalOpen}
          label="Inventory control"
          headingText="product"
        >
          {(row, register) =>
            <Grid className="inventory__modal__grid">
              <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                <TextInput labelText="Product name" placeholder="e.g. Fanta Cocktail..." defaultValue={row?.name} id="text-1" {...register("name")} />
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
        </EditModal>
      </Grid>
    )
  }
}