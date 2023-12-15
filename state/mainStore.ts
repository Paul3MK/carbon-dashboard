import { Inputs } from "@/common";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MainState {
    products: Inputs.Products[],
    categories: Inputs.Categories[],
    addCategory: (newCategory: Inputs.Categories) => void,
    addProduct: (newProduct: Inputs.Products) => void,
    editProduct: (editedProduct: Inputs.Products) => void,
    deleteProduct: (id: string) => void,
    _hasHydrated: boolean,
    setHasHydrated: (arg: any) => void
}

interface AuthState{
    loggedIn: boolean,
    loggedOut: boolean,
    username: string,
    login: (user: Inputs.Login) => void,
    logout: (user: Inputs.Login) => void
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
        })
    }), {
    name: "manufacturers-storage",
    onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
    }
}))

const useAuthStore = create<AuthState>()(persist(
    (set, get) => ({
        loggedIn: false,
        loggedOut: true,
        username: "",
        login: (user) => set((state) => ({
            loggedIn: true,
            loggedOut: false,
            username: user.username
        })),
        logout: (user) => set((state) => ({
            loggedIn: false,
            loggedOut: true,
            username: user.username
        }))
    }),
    {
        name: "auth-storage",
        storage: createJSONStorage(()=> sessionStorage)
    }
))

export { useMainStore, useAuthStore }