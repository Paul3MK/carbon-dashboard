"use client"

import { Grid, Column, Breadcrumb, BreadcrumbItem, TextInput, Form, Button } from "@carbon/react";
import React from "react";
import * as yup from "yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/state/mainStore";

export default function UserProfile() {


    const validationSchema = yup.object({
        username: yup.string().email().min(2, "Must have 2 characters minimum.").required(),
        password: yup.string().min(2, "Must have 2 characters minimum.").required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const username = useAuthStore(state => state.username);
    const password = useAuthStore(state => state.password);

    const setUsername = useAuthStore(state => state.setUsername)
    const setPassword = useAuthStore(state => state.setPassword)

    const onSubmit = (data) => {
        setUsername(data.username)
        setPassword(data.password)
    }

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className="page__banner">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/users">Users</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page__heading">My profile</h1>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid>
                        <Column lg={8} md={4} sm={4}>
                            <TextInput id="email" labelText="Email" defaultValue={username} {...register("username")} />
                        </Column>
                        <Column lg={8} md={4} sm={4}>
                            <TextInput.PasswordInput defaultValue={password} labelText="Password" id="password" {...register("password")} />
                        </Column>
                        <Column>
                            <Button kind="primary" type="submit">Submit</Button>
                        </Column>
                    </Grid>
                </Form>
            </Column>
        </Grid>
    )
}