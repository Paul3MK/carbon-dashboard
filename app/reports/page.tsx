"use client"
import React from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio } from "@carbon/react";
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons";

export default function Reports() {
    return (
        <Grid>
            <Column lg={16} className="reports__banner">
                <h1 className="reports__heading">Reports</h1>
            </Column>
            <Column lg={16}>
                <Grid condensed>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} href="/reports/inventory">
                            <AspectRatio ratio="1x1">
                                <h2 className="reports__subheading">Inventory</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="reports__subheading">Users</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="reports__subheading">Transactions</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    )
}