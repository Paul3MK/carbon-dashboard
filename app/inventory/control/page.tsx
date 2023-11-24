"use client"
import React from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio } from "@carbon/react";
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons";

export default function InventoryControl() {
    return (
        <Grid>
            <Column lg={16} className="inventory-control__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/inventory">Inventory</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="inventory-control__heading">Control</h1>
            </Column>
            <Column lg={16}>
                <Grid condensed>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Create product</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Create category</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Create subcategory</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Create inventory item(s)</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={8}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="2x1">
                                <h2 className="inventory-control__subheading">Batch management</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    )
}