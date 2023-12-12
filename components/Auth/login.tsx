"use client"

import React from "react"
import { Grid, Column, Form, TextInput, NumberInput, Checkbox, ButtonSet, Button } from "@carbon/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthStore } from "@/state/mainStore"
import { Inputs } from "@/common"
import { redirect } from "next/navigation"

export default function Login() {

    const loggedIn = useAuthStore(state => state.loggedIn)
    const login = useAuthStore(state => state.login)

    const { register, handleSubmit, formState: {errors}} = useForm<Inputs.Login>()
    const onSubmit: SubmitHandler<Inputs.Login> = (data) => {
        if(data.password == "testing"){
            login(data)
            redirect("/")
        }
    }

    return (
        <div className="login__page">
            <Grid className="login__wrapper" condensed>
                <Column lg={16} className="login__heading--wrapper">
                    <h1 className="login__heading">Login</h1>
                </Column>
                <Column lg={16}>
                    <Form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid condensed>
                            <Column lg={16} className="login__field">
                                <TextInput id="username" labelText="Username" {...register("username")}/>
                            </Column>
                            <Column lg={16} className="login__field">
                                <TextInput.PasswordInput id="username" labelText="Password" autocomplete="true" {...register("password")} />
                            </Column>
                            <Column lg={16} className="login__field"    >
                                <Checkbox id="remember" labelText="Remember me" />
                            </Column>
                            <Column lg={16} className="login__buttons">
                                <div className="login__button--wrapper">
                                <Button kind="primary" className="login__button" type="submit">Login</Button>
                                </div>
                            </Column>
                        </Grid>
                    </Form>
                </Column>
            </Grid>
        </div>
    )
}