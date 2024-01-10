"use client"

import { Grid, Column, Tile, ClickableTile, Link, AspectRatio, Theme } from "@carbon/react"
import { SimpleBarChart, LineChart, GaugeChart, MeterChart } from "@carbon/charts-react"
import { ReactNode, useEffect, useState } from "react"
import '@carbon/charts-react/styles.css'
import { ArrowRight, ArrowUpRight, Warning, ShoppingCart, CostTotal, Money, InventoryManagement, UserFavorite, ArrowDown, ArrowUp } from "@carbon/react/icons"

export default function LandingPage() {

  const [barChartData, setBarChartData] = useState<any>([
    {
      group: "Bitters",
      units: 3420
    },
    {
      group: "Energy drinks",
      units: 211
    },
    {
      group: "Beer",
      units: 1402
    },
    {
      group: "Water",
      units: 542
    }
  ]);
  const [barChartOptions, setBarChartOptions] = useState<any>({
    title: "Scrap requests per category",
    axes: {
      bottom: {
        mapsTo: "group",
        scaleType: "labels"
      },
      left: {
        mapsTo: "units"
      }
    },
    height: "400px",
    theme: "g10"
  });

  const [lineChartData, setLineChartData] = useState<any>([
    {
      group: "Monthly sales",
      date: new Date("1 January 2022"),
      value: 2199122
    },
    {
      group: "Monthly sales",
      date: new Date("1 February 2022"),
      value: 1234812
    },
    {
      group: "Monthly sales",
      date: new Date("1 March 2022"),
      value: 3156851
    },
    {
      group: "Monthly sales",
      date: new Date("1 April 2022"),
      value: 4315531
    },
    {
      group: "Monthly sales",
      date: new Date("1 May 2022"),
      value: 1649118
    },
    {
      group: "Monthly sales",
      date: new Date("1 June 2022"),
      value: 3861385
    }
  ])
  const [lineChartOptions, setLineChartOptions] = useState<any>({
    title: "Sales volume for 22H1",
    axes: {
      bottom: {
        title: "January 2022 - June 2022",
        mapsTo: "date",
        scaleType: "time"
      },
      left: {
        mapsTo: "value",
        title: "Sales volume (in GHS)",
        scaleType: "linear"
      }
    },
    curve: "curveMonotoneX",
    height: "400px",
    theme: "g10"
  })

  const [gaugeChartData, setGaugeChartData] = useState<any>([
    {
      group: "value",
      value: 19
    },
    {
      group: "delta",
      value: -80
    }
  ])

  const [gaugeChartOptions, setGaugeChartOptions] = useState<any>({
    title: "Inventory tolerance",
    resizable: true,
    height: "250px",
    width: "100%",
    gauge: {
      type: "semi",
      status: "success"
    },
    theme: "g10"
  })

  const [meterChartData, setMeterChartData] = useState<any>([
    {
      group: "Bitters",
      value: 18260
    },
    {
      group: "Beer",
      value: 12340
    },
    {
      group: "Energy drinks",
      value: 4280
    },
    {
      group: "Water",
      value: 8960
    }
  ])
  const [meterChartOptions, setMeterChartOptions] = useState<any>({
    title: "Current inventory composition",
    height: "120px",
    meter: {
      proportional: {
        total: meterChartData?.reduce((acc, val) => acc + val.value, 0),
        unit: "bottles",
        totalFormatter: _ => `${_} bottles`,
        breakdownFormatter: () => ``
      }
    },
    color: {
      pairing: {
        option: 1
      }
    },
    theme: "g10"
  })

  return (
    <Grid className="landing-page">
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <h1 className="landing-page__heading">Overview</h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__summaries">
        <Grid className="landing-page__summaries__subgrid" condensed>
          <SummaryCard clickable label="Reorder limit" content="200" caption="in total" renderIcon={Warning} />
          <SummaryCard clickable href="/inventory/control/product" label="Total orders from VSPs" content="487" caption="as of 20.11.23" renderIcon={ShoppingCart}/>
          <SummaryCard clickable href="/transactions" label="Transaction value" content="GHS 41,291,291" caption="in total" renderIcon={CostTotal}/>
          <SummaryCard clickable href="/inventory/management" label="Total inventory value" content="GHS 312,301,121" caption="pending" renderIcon={Money}/>
        </Grid>
        <Grid className="landing-page__summaries__subgrid" condensed>
          <SummaryCard clickable href="/inventory/management" label="Expiring inventory" content="32" caption="in total" renderIcon={InventoryManagement}/>
          <SummaryCard clickable href="#" label="Total VSPs" content="192" caption="as of 20.11.23" renderIcon={UserFavorite}/>
          <SummaryCard clickable href="#" label="Value of lost leads" content="GHS 21,299,192" caption="in total" renderIcon={ArrowDown} />
          <SummaryCard clickable href="#" label="Value of won leads" content="GHS 67,922,291" caption="in total" renderIcon={ArrowUp} />
        </Grid>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__charts-r1">
        <Grid narrow>
          <Column lg={8} md={4} sm={4}>
            <Tile>
              <SimpleBarChart options={barChartOptions} data={barChartData} />
            </Tile>
            <div className="spacing-06"></div>
            <Tile>
              <LineChart options={lineChartOptions} data={lineChartData} />
            </Tile>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <ClickableTile renderIcon={ArrowUpRight} href="/inventory">
              {/* <GaugeChart options={gaugeChartOptions} data={gaugeChartData}/> */}
              <MeterChart options={meterChartOptions} data={meterChartData} />
            </ClickableTile>
          </Column>
        </Grid>
      </Column>
    </Grid>
  )
}


const SummaryCard = ({ label, content, caption, clickable, href, ratio="2x1", ...props }: { label: string, content: string, caption?: string, clickable?: boolean, href?: string, ratio?: any, renderIcon?:any }) => {
  if (clickable) {
    return (
      <Column lg={4} md={2} sm={4}>
        <ClickableTile href={href} className="landing-page__card" renderIcon={props.renderIcon}>
          <AspectRatio ratio={ratio}>
            <h2 className="landing-page__subheading">{label}</h2>
            <div className="card__content">
              <p className="landing-page__display-text">{content}</p>
              <p className="landing-page__caption">{caption}</p>
            </div>
          </AspectRatio>
        </ClickableTile>
      </Column>
    )
  } else {
    return (
      <Column lg={4} md={2} sm={4}>
          <Tile className="landing-page__card">
            <AspectRatio ratio={ratio}>
              <h2 className="landing-page__subheading">{label}</h2>
              <div className="card__content">
                <p className="landing-page__display-text">{content}</p>
                <p className="landing-page__caption">{caption}</p>
              </div>
            </AspectRatio>
          </Tile>
        </Column>
    )
  }
}

export { SummaryCard }
