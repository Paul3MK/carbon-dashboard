import { OverflowMenu, OverflowMenuItem} from "@carbon/react"
import React, {ReactNode, Dispatch} from "react"

export default function Overflow({
    rowToEdit,
    rowId,
    rowSubject,
    editAction,
    setRowToEdit,
  }: {
    rowToEdit?: ReactNode,
    rowId: string,
    rowSubject: string,
    editAction: Dispatch<any>,
    setRowToEdit: Dispatch<any>
  }){
    return (
      <OverflowMenu>
        <OverflowMenuItem itemText={`Edit ${rowSubject}`} onClick={() => {
          editAction(true)
          setRowToEdit(rowId)
        }} />
        <OverflowMenuItem hasDivider itemText={`Delete ${rowSubject}`} />
      </OverflowMenu>
    )
  }