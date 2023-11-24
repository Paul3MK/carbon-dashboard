"use client"

import React from "react";
import { Grid, Column, Tabs, Tab, TabList, TabPanels, TabPanel, Breadcrumb, BreadcrumbItem, Tile, AspectRatio } from "@carbon/react";
import { HistogramChart, LineChart, PieChart } from "@carbon/charts-react";
import { SummaryCard } from "@/app/home/page";
import { CategoryForScrapOptions, CategoryForScrapData, ProductForScrapData, ProductForScrapOptions, LineChartData, LineChartOptions } from "./Charts";

export default function InventoryReports() {
    return (
        <Grid>
            <Column lg={16} className="inventory-reports__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/reports">Reports</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1>Inventory</h1>
            </Column>
            <Column lg={16}>
                <Tabs>
                    <TabList aria-label="Tab navigation">
                        <Tab>Scrap</Tab>
                        <Tab>Transfers</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid>
                                <Column lg={16}>
                                    <Grid>
                                        <SummaryCard label="Top scrap requester" content="A. Boateng" caption="" ratio="1x1" />
                                        <SummaryCard label="Scrapped inventory" content="491" caption="last 30 days" ratio="1x1" />
                                        <SummaryCard label="Most scrapped product" content="Alomo Silver 500mL" caption="SKU #19920192" ratio="1x1" />
                                        <SummaryCard label="Loss due to scrap" content="19,640" caption="GHS, last 30 days" ratio="1x1" />
                                    </Grid>
                                </Column>
                                <Column lg={16}>
                                    <Grid>
                                        <Column lg={4}>
                                            <PieChart data={ProductForScrapData} options={ProductForScrapOptions}/>
                                        </Column>
                                        <Column lg={4}>
                                            <PieChart data={CategoryForScrapData} options={CategoryForScrapOptions}/>
                                        </Column>
                                        <Column lg={8}>
                                            <LineChart data={LineChartData} options={LineChartOptions}/>
                                        </Column>
                                        <Column>
                                            {/* <HistogramChart/> */}
                                        </Column>
                                    </Grid>
                                </Column>
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                        <Grid>
                                <Column lg={16}>
                                    <Grid>
                                        <SummaryCard label="Top transfer recipient" content="C. Frimpong" caption="" ratio="1x1" />
                                        <SummaryCard label="Most transferred product" content="Awake Water 1L" caption="SKU #91129813" ratio="1x1" />
                                        <SummaryCard label="Product units transferred" content="2,912" caption="last 30 days" ratio="1x1" />
                                        {/* <SummaryCard label="Loss due to scrap" content="19,640" caption="GHS, last 30 days" ratio="1x1" /> */}
                                    </Grid>
                                </Column>
                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Column>
        </Grid>
    )
}