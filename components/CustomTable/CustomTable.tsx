"use client"
import React, { Dispatch, ReactNode } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from '@carbon/react';
import { ActionList } from '@/app/inventory/page';

export default function CustomTable({ rows, headers, button, search }: { rows: any[], headers: any[], button?: ReactNode, search?: boolean}) {

  const getRowDescription = (rowid: string) => {
    const row = rows.find(({ id }) => id === rowid)
    return row ? (
      <div>
        <p>Description</p>
        <p>{row.description}</p>
      </div>
    ) : ""
  }
  return (
    <DataTable
      rows={rows}
      headers={headers  }
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        onInputChange
      }) => (
        <TableContainer>
          { search==true || button ? <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange}/>
              {button}
            </TableToolbarContent>
          </TableToolbar> : <></>}
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    {getRowDescription(row.id)}
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} />
  )
}
