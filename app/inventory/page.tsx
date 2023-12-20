"use client"

import { Grid, Column, Modal, Form, Button, TextInput, NumberInput, ButtonSet, TextArea, Pagination, Select, SelectItem, ClickableTile, AspectRatio } from "@carbon/react";
import { Add, ArrowUpRight } from "@carbon/react/icons"
import React, { Dispatch, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { LineChart } from "@carbon/charts-react";

import '@carbon/charts-react/styles.css'

import CustomTable from "@/components/CustomTable/CustomTable";
import EditModal from "@/components/Modals/EditProductModal";
import { useMainStore } from "@/state/mainStore";
import useStore from "@/state/useStore";
import CommonModal from "@/components/Modals/CommonModal";

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
  const [ lineChartData, setLineChartData ] = useState<any>([
    {
      group: "Dataset 1",
      date: new Date("1 November 2023"),
      value: 3,
    },
    {
      group: "Dataset 1",
      date: new Date("2 November 2023"),
      value: 5,
    },
    {
      group: "Dataset 1",
      date: new Date("3 November 2023"),
      value: 12,
    },
    {
      group: "Dataset 1",
      date: new Date("4 November 2023"),
      value: 6,
    },
    {
      group: "Dataset 1",
      date: new Date("5 November 2023"),
      value: 19,
    },
    {
      group: "Dataset 1",
      date: new Date("6 November 2023"),
      value: 0,
    },
    {
      group: "Dataset 1",
      date: new Date("7 November 2023"),
      value: 2,
    },
  ]);
  const [ lineChartOptions, setLineChartOptions ] = useState<any>({
    title: "Scrapped inventory per day",
    curve: "curveMonotoneX",
    axes: {
      bottom: {
        title: "November week 1",
        mapsTo: "date",
        scaleType: "time"
      },
      left:{
        mapsTo: "value",
        title: "Units scrapped",
        scaleType: "linear"
      }
    },
    height: "400px",
    theme: "g10"
  });

  const products = useStore(useMainStore, state=>state.products);
  const addProduct = useMainStore(state=>state.addProduct);
  const hasHydrated = useStore(useMainStore, state => state._hasHydrated);
  const deleteRecord = useMainStore(state=>state.deleteProduct)

  if(!hasHydrated || typeof products == "undefined"){
    return <>Loading...</>
  }else{
    return (
      <Grid>
        <Column className="inventory__banner" lg={16} md={8} sm={4}>
          <h1 className="page__heading">Inventory</h1>
          {/* <Button renderIcon={Add} iconDescription="Add product" onClick={()=>setModalOpen(true)} className="page__cta">Add product</Button> */}
        </Column>
        <Column className="inventory__section" lg={8} md={4} sm={4}>
          <ClickableTile href="/inventory/control">
            <AspectRatio ratio="1x1">
              <Grid>
                <Column lg={16} className="inventory__section__header">
                  <span className="inventory__subheading">Control</span>
                  <ArrowUpRight/>
                </Column>
                <Column lg={16} className="inventory__section__callout">
                  <Grid>
                    <Column lg={8}>
                      <p className="inventory__caption-text">Products</p>
                      <h2 className="inventory__display-text">23</h2>
                    </Column>
                    <Column lg={4}>
                      <p className="inventory__caption-text">Categories</p>
                      <h2 className="inventory__display-text">5</h2>
                    </Column>
                    <Column lg={4}>
                      <p className="inventory__caption-text">Total batches</p>
                      <h2 className="inventory__display-text">65</h2>
                    </Column>
                  </Grid>
                </Column>
                <Column lg={16}>
                  <h3 className="inventory__subheading">Latest batch</h3>
                  <p className="inventory__copy">Lorem ipsum sit dolor amet...</p>
                </Column>
              </Grid>
            </AspectRatio>
          </ClickableTile>
        </Column>
        <Column className="inventory__section" lg={8} md={4} sm={4}>
          <ClickableTile href="/inventory/management">
            <AspectRatio ratio="1x1">
              <Grid>
                <Column lg={16} className="inventory__section__header">
                  <span className="inventory__subheading">Management</span>
                  <ArrowUpRight/>
                </Column>
                <Column lg={16} className="inventory__section__callout">
                  <Grid>
                    <Column lg={8}>
                      <p className="inventory__caption-text">Product items about to expire</p>
                      <h2 className="inventory__display-text">2129</h2>
                    </Column>
                    <Column lg={4}>
                      <p className="inventory__caption-text">Scrap requests (24h)</p>
                      <h2 className="inventory__display-text">12</h2>
                    </Column>
                    <Column lg={4}>
                      <p className="inventory__caption-text">Transfer requests (24h)</p>
                      <h2 className="inventory__display-text">5</h2>
                    </Column>
                  </Grid>
                </Column>
                <Column lg={16}>
                  <LineChart options={lineChartOptions} data={lineChartData}/>
                </Column>
              </Grid>
            </AspectRatio>
          </ClickableTile>
        </Column>
        <Column className="inventory__table" lg={16} md={8} sm={4}>
          <CustomTable
            headers={headers}
            rows={products}
            openEditModal={setEditingModalOpen}
            setEditingRow={setEditingRow}
            actions={false}
          />
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
        <CommonModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          label="Inventory control"
          headingText="product"
          // storeUpdater={(data) => (setRows([...rows, data]))}
          storeUpdater={data=>addProduct(data)}
          setEditingRow={setEditingRow}
          openEditModal={setEditingModalOpen}
        >{register =>
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
                    <NumberInput label="Volume (mL)" placeholder="e.g. 500" id="number-3" {...register("volume")} max={5000} min={0} step={100} />
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
            </Grid>}
        </CommonModal>
        {/* <EditProductModal
          row={rows.find((row) => row.id === editingRow)}
          dataSetter={(data) => setRows([...rows, data])}
          openEdit={editingModalOpen}
          setOpenEdit={setEditingModalOpen}
          setEditingRow={setEditingRow}
        /> */}
      </Grid>
    )}
}

const ActionList = ({ rowId, setterFunction, openEditModal }: { rowId: string, setterFunction: Dispatch<any>, openEditModal: Dispatch<any>}) => {

  const deleteRecord = useMainStore(state => state.deleteProduct )

  return (
    <div style={{ display: "flex" }}>
      <Button kind="ghost" onClick={() => {
        setterFunction(rowId)
        openEditModal(true)
      }}>
        Edit</Button>
      <Button kind="danger--ghost" onClick={()=> deleteRecord(rowId)}>Delete</Button>
    </div>
  )
}

export { ActionList }