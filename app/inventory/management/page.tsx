"use client"
import React from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio } from "@carbon/react";
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons";

export default function InventoryManagement() {
    return (
        <Grid>
            <Column lg={16} className="inventory-management__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/inventory">Inventory</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="inventory-management__heading">Management</h1>
            </Column>
            <Column lg={16}>
                <Grid condensed>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="inventory-management__tile">
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-management__subheading">Scrap</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="inventory-management__tile">
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-management__subheading">Transfers</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={8}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="2x1">
                                <h2 className="inventory-management__subheading">Expiry management</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    )
}