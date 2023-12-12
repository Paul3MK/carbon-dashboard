"use client"

import { Grid, Column, Modal, Form, Button, TextInput, NumberInput, ButtonSet, TextArea, Pagination, Select, SelectItem, ClickableTile, AspectRatio, DatePicker, DatePickerInput } from "@carbon/react";
import { Add, ArrowUpRight } from "@carbon/react/icons"
import React, { Dispatch, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { LineChart } from "@carbon/charts-react";

import '@carbon/charts-react/styles.css'
import CustomTable from "@/components/CustomTable/CustomTable";
import { SummaryCard } from "../home/page";

export default function Transactions() {

  const headers = [
    {
        key: "id",
        header: "ID"
    },
    {
      key: "date",
      header: "Transaction date"
    },
    {
      key: "amount",
      header: "Amount"
    },
    {
      key: "source",
      header: "Source"
    },
  ]

  const initialRows = [
    {
      id: "8298",
      date: (new Date("23 October 2023")).toString(),
      amount: 129923,
      source: "Kofi Bros. Ltd.",
    }
  ]

  function dateFilterRows(_rows:any[], start: number, end:number){
    console.log([_rows, start, end])
    const newRows = _rows?.filter((_row)=>(
      Date.parse(_row.date) > start && Date.parse(_row.date) < end 
    ))
    console.log(newRows)
    setFilteredRows(newRows)
  }

  const [rows, setRows] = useState<any[]>(initialRows);
  const [filteredRows, setFilteredRows] = useState<any[]>();
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const [editingRow, setEditingRow] = useState<any>();
  const [editingModalOpen, setEditingModalOpen] = useState<boolean>(false);
  const [ startDate, setStartDate ] = useState<any>();
  const [ endDate, setEndDate ] = useState<any>();
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
    title: "Scrapped transactions per day",
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
    theme: "g100"
  });

  useEffect(()=>{
    dateFilterRows(rows, Date.parse(startDate), Date.parse(endDate))
  }, [startDate, endDate])

  useEffect(()=>{
    setFilteredRows(rows)
  }, [])

  if(filteredRows){
    return (
      <Grid>
        <Column className="transactions__banner" lg={16} md={8} sm={4}>
          <h1 className="page__heading">Transactions</h1>
        </Column>
        <Column>
          {/* <SummaryCard label="Transaction total"/> */}
          <DatePicker datePickerType="range" onChange={(selectedDates)=>{
            setStartDate(selectedDates[0])
            setEndDate(selectedDates[1])
          }}>
            <DatePickerInput labelText="Start date" id="start-date"/>
            <DatePickerInput labelText="End date" id="end-date"/>
          </DatePicker>
        </Column>
        <Column className="transactions__table" lg={16} md={8} sm={4}>
          <CustomTable headers={headers} rows={filteredRows}/>
          <Pagination
            totalItems={filteredRows.length}
            pageSize={currentPageSize}
            pageSizes={[10, 20, 50]}
            itemsPerPageText="Transactions per page"
            onChange={({ page, pageSize }) => {
              if (pageSize != currentPageSize) {
                setCurrentPageSize(pageSize)
              }
              setFirstRowIndex(pageSize * (page - 1))
            }}
          />
        </Column>
      </Grid>
    )
  }else{
    return <></>
  }
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
