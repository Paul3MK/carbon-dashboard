"use client"

import {
    Grid,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    TextInput,
    NumberInput,
    Select,
    SelectItem,
    TextArea,
    Button,
    MultiSelect,
    ToastNotification
} from "@carbon/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "@/common";
import endpointsConfig from "@/endpoints.config";

async function getCategories(updateState: Dispatch<SetStateAction<[]>>) {
    const request = await fetch(`${endpointsConfig.BaseUrl}/inventory/category/`)
    const response = await request.json()

    if (request.ok) {
        updateState(response)
    }
}

export default function AddProduct() {

    const [categories, setCategories] = useState<[]>([])
    const [ isSuccessful, setIsSuccessful ] = useState<boolean>(false)

    const validationSchema = yup.object({
        name: yup.string().required(),
        description: yup.string(),
        sku: yup.string().required(),
        brand: yup.string().required(),
        categories: yup.array(),
        volume:yup.number(),
        quantity: yup.number(),
        store_price: yup.number(),
        retail_price: yup.number(),
        weight: yup.number()
    })

    const { register, handleSubmit, setValue,  formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) })
    const onSubmit = async (data) => {
        data.weight = {
            value: data.weight / 1000,
            unit: "kg"
        }

        data.volume = {
            value: data.volume / 1000,
            unit: "L"
        }
        const request = await fetch(`${endpointsConfig.BaseUrl}/inventory/create-product/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = request.json()
        if(request.status == 201){
            return setIsSuccessful(true)

        }

    }

    useEffect(() => {
        getCategories(setCategories)
    }, [])

    return (
        <Grid>
            <div className="notification__area">
            {isSuccessful && <ToastNotification role="status" title="Product added successfully" timeout={5000} kind="success"/>}
            </div>
            <Column lg={16} className="page__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/inventory">Inventory</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="/inventory/control">Control</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="/inventory/control/product">Products</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page__heading">Add product</h1>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid className="inventory__modal__grid">
                        <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                            <TextInput labelText="Product name" placeholder="e.g. Fanta Cocktail..." id="text-1" {...register("name")}/>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                            <Grid>
                                <Column lg={4} md={2} sm={4}>
                                    <NumberInput label="Store price (GHS)" id="number-2" value={0} max={10000} min={0} step={1} {...register("store_price")}/>
                                </Column>
                                <Column lg={4} md={2} sm={4}>
                                    <NumberInput label="Retail price (GHS)" id="number-5" value={0} max={10000} min={0} step={1} {...register("retail_price")}/>
                                </Column>
                                <Column lg={8} md={4} sm={4}>
                                    <NumberInput label="Quantity" value={0} id="number-1" max={1000} min={0} step={10} {...register("quantity")} />
                                </Column>
                            </Grid>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                            <Grid>
                                <Column lg={8} md={4} sm={4}>
                                    <TextInput labelText="SKU" placeholder="e.g. 12345678" id="text-2" {...register("sku")} />
                                </Column>
                                <Column lg={4} md={2} sm={4}>
                                    <NumberInput label="Volume (mL)" placeholder="e.g. 500" id="number-3" max={5000} min={0} step={10} {...register("volume")} />
                                </Column>
                                <Column lg={4} md={2} sm={4}>
                                    <NumberInput label="Weight (g)" placeholder="e.g. 500" id="number-4" max={5000} min={0} step={10} {...register("weight")} />
                                </Column>
                            </Grid>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                            <Grid>
                                <Column lg={8} md={4} sm={4}>
                                    <MultiSelect label="Select categories" id="categories" items={["beer", "alcohol"]} titleText="Categories" onChange={(e)=>setValue("categories",e.selectedItems)}/>
                                </Column>
                                <Column lg={8} md={4} sm={4}>
                                    <Select id="select-1" labelText="Brand" defaultValue="placeholder-item" {...register("brand")}>
                                        <SelectItem disabled hidden value="placeholder-item" text="Choose a brand" />
                                        <SelectItem value="Alomo Silver" text="Alomo Silver" />
                                        <SelectItem value="Alomo Black" text="Alomo Black" />
                                        <SelectItem value="Alomo Gold" text="Alomo Gold" />
                                    </Select>
                                </Column>
                            </Grid>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="inventory__modal__column">
                            <TextArea placeholder="Write a description here..." labelText="Product description" id="textarea-1" rows={4} {...register("description")} />
                        </Column>
                        <Column lg={16} md={8} sm={4} className="submit-button__wrapper">
                            <Button type="submit" kind="primary">Add product</Button>
                        </Column>
                    </Grid>
                </Form>
            </Column>
        </Grid>
    )
}