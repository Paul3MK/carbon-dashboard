"use client"

import { Grid, Column, Tile, ClickableTile, Link, AspectRatio } from "@carbon/react"
import { SimpleBarChart, LineChart, GaugeChart, MeterChart } from "@carbon/charts-react"
import { ReactNode, useEffect, useState } from "react"
import '@carbon/charts-react/styles.css'
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons"

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
        <Grid>
          <SummaryCard label="Distributors" content="32" caption="in total" />
          <SummaryCard clickable href="/inventory/control/product" label="Products out of stock" content="4" caption="as of 20.11.23" />
          <SummaryCard label="Distribution orders" content="8" caption="in the last 24h" />
          <SummaryCard clickable href="/inventory/management" label="Transfer requests" content="2" caption="pending" />
        </Grid>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__charts-r1">
        <Grid>
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


const SummaryCard = ({ label, content, caption, clickable, href, ratio="2x1" }: { label: string, content: string, caption?: string, clickable?: boolean, href?: string, ratio?: any }) => {
  if (clickable) {
    return (
      <Column lg={4} md={2} sm={4}>
        <ClickableTile href={href} className="landing-page__card" renderIcon={ArrowRight}>
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
