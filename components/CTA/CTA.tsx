import { Button } from "@carbon/react";
import { Add } from "@carbon/react/icons";
import React, { Dispatch } from "react";

export default function CTA({modalOpener, label}: {modalOpener: Dispatch<any>, label: string}){
    return(
        <Button renderIcon={Add} iconDescription="Add product" onClick={() => modalOpener(true)} className="page__cta">{label}</Button>
    )
}