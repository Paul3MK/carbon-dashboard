import { Button } from "@carbon/react";
import { Add } from "@carbon/react/icons";
import React, { Dispatch } from "react";

export default function CTA({modalOpener, label, link}: {modalOpener?: Dispatch<any>, label: string, link?: string}){
    return(
        <Button renderIcon={Add} iconDescription="Add product" onClick={() => modalOpener && modalOpener(true)} className="page__cta" href={link}>{label}</Button>
    )
}