"use client"

import React, { useState, useEffect } from "react"
import { Accordion, Grid, Column, Pagination, DataTableSkeleton, SkeletonText, Tag, Button } from "@carbon/react"
import RequestsTable from "./RequestsTable"
import { Close, Checkmark } from "@carbon/react/icons"

const headers = [
  {
    key: "type",
    header: "Request type"
  },
  {
    key: "source",
    header: "Source"
  },
  {
    key: "product",
    header: "Product code"
  },
  {
    key: "quantity",
    header: "Quantity requested"
  },
  {
    key: "status",
    header: "Status"
  },
  {
    key: "action",
    header: ""
  }
]

const InventoryRequests = () => {
  const [ rows, setRows ] = useState<any>();
  const [ loading, setLoading ] = useState<boolean>();

  useEffect(()=>(
    setRows([
      {
        type: "Scrap",
        source: "Adama T.",
        product: "Alomo Silver #12B1",
        quantity: 11,
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis vitae lacus nec efficitur. Suspendisse ut mi odio. Nam hendrerit nibh nulla, et feugiat purus finibus eu. Curabitur placerat nunc placerat lorem mollis, ac commodo ante tempor. Suspendisse dapibus lectus in nisi ultrices, eu venenatis ligula ornare. Curabitur mi justo, eleifend eget risus a, semper luctus justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        status: <Tag type="gray">{"Pending"}</Tag>,
        action: <div style={{display: "flex"}}><Button kind="ghost" renderIcon={Checkmark} hasIconOnly iconDescription="Approve request"></Button><Button kind="ghost" renderIcon={Close} hasIconOnly iconDescription="Decline request"></Button></div>
      }
    ])
  ), [])

  if(rows){
    return (
      <Grid>
        <Column className="requests__banner" lg={16} md={8} sm={4}>
          <h1 className="requests__heading">Requests</h1>
        </Column>
        <Column lg={16} md={8} sm={4}>
          <RequestsTable rows={rows} headers={headers}/>
          {/* <Pagination/> */}
        </Column>
      </Grid>
    )
  } else {
    return (
      <Grid>
        <Column className="requests__banner" lg={16} md={8} sm={4}>
          <SkeletonText></SkeletonText>
        </Column>
        <Column lg={16} md={8} sm={4}>
          <DataTableSkeleton/>
        </Column>
      </Grid>
    )
  }
}

export default InventoryRequests
