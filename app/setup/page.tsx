"use client"
import React from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio } from "@carbon/react";
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons";

export default function Setup() {
    return (
        <Grid>
            <Column lg={16} className="setup__banner">
                <h1 className="setup__heading">Setup</h1>
            </Column>
            <Column lg={16}>
                <Grid condensed>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="setup__tile" href="/setup/zones">
                            <AspectRatio ratio="1x1">
                                <h2 className="setup__subheading">Zones</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="setup__tile">
                            <AspectRatio ratio="1x1">
                                <h2 className="setup__subheading">Salespeople + Vans</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="setup__tile">
                            <AspectRatio ratio="1x1">
                                <h2 className="setup__subheading">Expiry date alerts</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                    <Column lg={4}>
                        <ClickableTile renderIcon={ArrowRight} className="setup__tile">
                            <AspectRatio ratio="1x1">
                                <h2 className="setup__subheading">Reorder level limits</h2>
                            </AspectRatio>
                        </ClickableTile>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    )
}