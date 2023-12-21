import { Inputs } from "@/common";
import { Input } from "postcss";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MainState {
    products: Inputs.Products[],
    categories: Inputs.Categories[],
    users: Inputs.Users[],
    addCategory: (newCategory: Inputs.Categories) => void,
    addProduct: (newProduct: Inputs.Products) => void,
    editProduct: (editedProduct: Inputs.Products) => void,
    deleteProduct: (id: string) => void,
    addUser: (newUser: Inputs.Users) => void,
    editUser: (editedUser: Inputs.Users) => void,
    _hasHydrated: boolean,
    setHasHydrated: (arg: any) => void
}

interface AuthState{
    loggedIn: boolean,
    loggedOut: boolean,
    username: string,
    password: string,
    login: (user: Inputs.Login) => void,
    logout: (user: Inputs.Login) => void,
    setPassword: (password: string) => void
    setUsername: (username: string) => void
}

const useMainStore = create<MainState>()(persist(
    (set, get) => ({
        _hasHydrated: false,
        setHasHydrated: (state) => {
            set({
                _hasHydrated: state
            });
        },
        products: [
            {
                id: "1A",
                product: "Alomo Silver 330mL",
                cost: 18,
                quantity: 2800,
                description: "Lorem ipsum sit dolor amet",
                sku: "91823991",
                category: "Bitters",
                brand: "Alomo Silver",
                volume: 330
            }
        ],
        categories: [
            {
                id: "12N",
                category: "Bitters",
                dateCreated: new Date("11 November 2023")
            }
        ],
        users: [
            {
                id: "832j01ik",
                firstName: "Adam",
                lastName: "Boateng",
                email: "adam.boat@gmail.com",
                phoneNumber: "0509912121",
                role: "Salesperson",
                dateCreated: new Date(Date.now()).toDateString(),
                status: "Deactivated"
            }
        ],
        addProduct: (newProduct) => set((state) => {
            if(newProduct){
                return {products: get().products.concat(newProduct)}        
            }else{
                return {products: get().products}
            }
        }),
        editProduct: ((editedProduct: Inputs.Products) => set((state) => {
            let _products = get().products
            let index = get().products.findIndex((product) => product.id === editedProduct.id)
            _products[index] = editedProduct
            return { products: _products }
        })),
        deleteProduct: ((id: string) => set((state) => {
            let _products = get().products
            let index: number = get().products.findIndex((product) => product.id === id)
            _products.splice(index, 1)
            return { products: _products }
        })),
        addCategory: (newCategory) => set((state) => {
            if(newCategory){
                return { categories: get().categories.concat(newCategory)}
            }else{
                return { categories: get().categories}
            }
        }),
        addUser: (newUser) => set((state) => {
            if(newUser){
                return { users: get().users.concat(newUser)}
            }else{
                return { users: get().users}
            }
        }),
        editUser: (editedUser: Inputs.Users) => set((state)=> {
            let _users = get().users
            let index: number = get().users.findIndex((user) => user.id == editedUser.id)
            _users[index] = editedUser
            return { users: _users}
        })
    }), {
    name: "manufacturers-storage",
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
    }
}))

const useAuthStore = create<AuthState>()(persist(
    (set, get) => ({
        loggedIn: false,
        loggedOut: true,
        username: "paulmkouadio@gmail.com",
        password: "testing",
        login: (user) => set((state) => ({
            loggedIn: true,
            loggedOut: false,
        })),
        logout: (user) => set((state) => ({
            loggedIn: false,
            loggedOut: true
        })),
        setPassword: (newPassword) => set((state) => ((
            {password: newPassword}
        ))),
        setUsername: (newUsername) => set((state) => ((
            {username: newUsername}
        ))),
    }),
    {
        name: "auth-storage",
        storage: createJSONStorage(()=> sessionStorage)
    }
))

export { useMainStore, useAuthStore }