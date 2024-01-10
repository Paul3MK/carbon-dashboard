'use client'
import React from "react"
import { Grid, Column, Breadcrumb, BreadcrumbItem, Form, TextInput, Button, Dropdown } from "@carbon/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Inputs } from "@/common"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export default function AddUser(){


    interface Users extends Inputs.Users{
        password: string,
        confirmPassword: string
    }

    const schema = yup.object({
        firstName: yup.string().min(2, "Must be longer than two characters").required(),
        lastName: yup.string().min(2, "Must be longer than two characters").required(),
        email: yup.string().email("Check this email is valid").required(),
        phoneNumber: yup.string().length(10, "Check the number length").matches(/0(5|2)[0-9][0-9]{7}/gm, "Ensure this number is valid").required(),
        password: yup.string().min(8, "Password should be at least 8 chars long").required(),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords should match").required(),
        role: yup.string().notOneOf([""], "Assign a user role").required()        
    })

    const { register, handleSubmit, formState: {errors}, setValue } = useForm({resolver: yupResolver(schema)})
    const onSubmit = (data) => console.log(data)
    const userRoles = [
        // {
        //     id: "",
        //     text: "Choose a role"
        // },
        {
            id: "admin",
            text: "Administrator"
        },
        {
            id: "support",
            text: "System support"
        },
        {
            id: "salesperson",
            text: "Salesperson"
        }
    ]

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className="page__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/users">Users</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page__heading">Add user</h1>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid>
                        <Column lg={8} className="grid__column">
                            <TextInput id="firstName" labelText="First name" {...register("firstName")}/>
                            <p className="text--error">{errors?.firstName?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="lastName" labelText="Last name" {...register("lastName")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput id="email" labelText="Email" {...register("email")}/>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput maxCount={10} enableCounter type='phone' id="phoneNumber" labelText="Phone number" {...register("phoneNumber")}/>
                            <p className="text--error">{errors.phoneNumber?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput.PasswordInput id="password" labelText="Password" {...register("password")}/>
                            <p className="text--error">{errors.password?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <TextInput.PasswordInput id="confirmPassword" labelText="Confirm password" {...register("confirmPassword")}/>
                            <p className="text--error">{errors.confirmPassword?.message}</p>
                        </Column>
                        <Column lg={8} className="grid__column">
                            <Dropdown id="userRoles" titleText="Assign a role" defaultValue="" label="Choose a user role" items={userRoles} itemToString={item => item ? item.text : ""} onChange={(e)=>setValue("role", e?.selectedItem?.text)}/>
                        </Column>
                        <Column lg={16} md={8} sm={4} className="submit-button__wrapper">
                            <Button kind="primary" type="submit">Submit</Button>
                        </Column>
                    </Grid>
                </Form>
            </Column>
        </Grid>
    )
}


//react-hook-form
//storyblock for React Carbon
//yup for schema validation