import { ReactNode } from "react"

declare namespace Inputs {
  type Products = {
    id?: string,
    product: string,
    quantity: number,
    cost: number,
    description: string,
    sku: string,
    category: string,
    brand: string,
    volume: number
  }

  type Zones = {
    id?:string,
    zoneCode: string,
    zoneName: string,
    gps: string,
    actions?: React.JSX.Element
  }

  type Categories = {
    id?: string,
    category: string,
    dateCreated: string | Date,
    actions?: ReactNode
  }

  type Subcategories = {
    id?: string,
    subcategory: string,
    dateCreated: string,
    actions?: ReactNode
  }

  type Login = {
    username: string,
    password: string
  }
}
