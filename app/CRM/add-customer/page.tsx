'use client'
import React from "react"
import { Grid, Column, Breadcrumb, BreadcrumbItem, Form, TextInput, Button, Dropdown } from "@carbon/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Inputs } from "@/common"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export default function AddCustomer(){
    const clicking = function write(){
        console.log("Submitted to your email");
    }


    interface Users extends Inputs.Users{
        password: string,
        confirmPassword: string
    }

    const schema = yup.object({
        customerCode: yup.string().min(2, "Must be longer than two characters").required(),
        customerName: yup.string().min(2, "Must be longer than two characters").required(),
        email: yup.string().email("Check this email is valid").required(),
        phoneNumber: yup.string().length(10, "Check the number length").matches(/0(5|2)[0-9][0-9]{7}/gm, "Ensure this number is valid").required(),
        customerAddress: yup.string().min(2, "Must be longer than two characters").required(),
        country: yup.string().notOneOf([""], "Select Customer Country").required(),
        staRegion: yup.string().notOneOf([""], "Select Customer/Region").required(),  
        cityTown: yup.string().min(2, "Must be longer than two characters").required(), 
        cpfirstName: yup.string().min(2, "Must be longer than two characters").required(), 
        cplastName: yup.string().min(2, "Must be longer than two characters").required(),
        cpphoneNumber: yup.string().length(10, "Check the length entered").matches(/0(5|2)[0-9][0-9]{7}/gm, "Ensure this number is valid").required(), 
        cpEmail: yup.string().email("Check this email is valid").required(),   
    })

    const { register, handleSubmit, formState: {errors}, setValue } = useForm({resolver: yupResolver(schema)})
    const onSubmit = (data) => console.log(data)
    const customerCountry = [
        {
            id: "afghan",
            text: "Afghanistan"
        },
        {
            id: "Gh",
            text: "Ghana"
        },
        {
            id: "TG",
            text: "Togo"
        }
    ];
    const cusRegion = [
        {
            id: "accra",
            text: "Accra"
        },
        {
            id: "lome",
            text: "Lome"
        },
        {
            id: "TG",
            text: "Kabul"
        }
    ]

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className="page__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/users">Customers</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page__heading">ADD A NEW CUSTOMER</h1>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid>
                        <Column lg={8} className="grid__column">
                            <TextInput id="customerCode" labelText="Customer Code*" {...register("customerCode")}/>
                            <p className="text--error">{errors?.customerCode?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="lastName" labelText="Customer Name*" {...register("customerName")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="email" labelText="Customer Email*" {...register("email")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput maxCount={10} enableCounter type='phone' id="phoneNumber" labelText="Customer Phone Number*" {...register("phoneNumber")}/>
                            <p className="text--error">{errors.phoneNumber?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="customerAddress" labelText="Customer Address (Street/GeoCode)" {...register("customerAddress")}/>
                            <p className="text--error">{errors?.customerAddress?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <Dropdown id="customerCountries" titleText="Select Customer Country*" defaultValue="" label="" items={customerCountry} itemToString={item => item ? item.text : ""} onChange={(e)=>setValue("country", e?.selectedItem?.text)}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <Dropdown id="cusRegion" titleText="State/Region" defaultValue="" label="Select Customer State/Region" items={cusRegion} itemToString={item => item ? item.text : ""} onChange={(e)=>setValue("staRegion", e?.selectedItem?.text)}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="cityTown" labelText="City/Town*" {...register("cityTown")}/>
                        </Column>
                        <Column lg={16} className="grid__column">
                          <h2 className="pagebuttom__heading">CONTACT PERSON-</h2><p>IF CUSTOMER IS AN INSTITUTION.</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="cpfirstName" labelText="Contact Person First Name*" {...register("cpfirstName")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="cplastName" labelText="Cntact Person Last Name*" {...register("cplastName")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput maxCount={10} enableCounter type='phone' id="cpphoneNumber" labelText="Contact Person Phone Number*" {...register("cpphoneNumber")}/>
                            <p className="text--error">{errors.phoneNumber?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="email" labelText="Contact Person Email*" {...register("cpEmail")}/>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="submit-button__wrapper">
                            <Button kind="primary" type="submit" onClick={clicking}>Submit</Button>
                        </Column>
                    </Grid>
                </Form>
            </Column>
        </Grid>
    )
}