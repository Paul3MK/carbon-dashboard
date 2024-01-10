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
                        <ClickableTile renderIcon={ArrowRight} href="/inventory/control/product">
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Products</h2>
                                <p className="inventory-control__copy">Create, modify and delete products in the inventory.</p>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} href="/inventory/control/category">
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Categories</h2>
                                <p className="inventory-control__copy">Create and modify categories, to organise the inventory.</p>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} href="/inventory/control/subcategory">
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Subcategories</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight}>
                            <AspectRatio ratio="1x1">
                                <h2 className="inventory-control__subheading">Brands</h2>
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