"use client"
import React from "react";
import { Grid, Column, Breadcrumb, BreadcrumbItem, Tile, ClickableTile, AspectRatio, Form, TextInput, NumberInput } from "@carbon/react";
import { ArrowRight, ArrowUpRight } from "@carbon/react/icons";
import { useForm, SubmitHandler } from "react-hook-form";

export default function CreateProduct() {

    return (
        <Grid>
            <Column lg={16} className="inventory-control__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/inventory">Inventory</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="/inventory/control">Control</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="inventory-control__heading">Create product</h1>
            </Column>
            <Column lg={16}>
                <Form>
                    <Grid>
                        <Column lg={16}>

                        </Column>
                    </Grid>
                </Form>
            </Column>
        </Grid>
    )
}