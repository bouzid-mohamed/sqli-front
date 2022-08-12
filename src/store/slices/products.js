import { createSlice } from "@reduxjs/toolkit";
// Demo Data
import ProductData from '../data/prodsData'
// Alert
import Swal from "sweetalert2";

// Product Slice

ProductData.getData();

const productsSlice = createSlice({

    name: 'products',
    initialState: {
        products: [],
        carts: [],
        favorites: [],
        compare: [],
        numberPages: 1,
        single: null,
        loading: true,
        loadingSingle: true,

    },
    reducers: {
        // Get Single Product
        getProductById: (state, action) => {
            let { id } = action.payload;
            let arr = state.products.find(item => item.id === parseInt(id))
            state.single = arr
            state.loadingSingle = false

        },
        getSingleProduct: (state, action) => {
            //let { id } = action.payload;
            // let arr = state.products.find(item => item.id === parseInt(id))
            state.single = action.payload
            state.loadingSingle = false

        },
        addProducts: (state, action) => {
            Object.assign(state.products, { ...action.payload });
            state.loading = false

        },
        setNumberPages: (state, action) => {
            state.numberPages = action.payload
        },
        initCart: (state, action) => {
            Object.assign(state.carts, { ...action.payload });

        },
        initFav: (state, action) => {
            Object.assign(state.favorites, { ...action.payload });
        },

        // Add to Cart
        addToCart: (state, action) => {

            let { id } = action.payload;
            // Check existance
            let item = state.carts.find(i => i.id === parseInt(id))
            let item2 = state.products.find(i => i.id === parseInt(id))
            if (item === undefined) {
                // Get Product
                let arr = state.products.find(item => item.id === parseInt(id))
                arr.quantity = 1
                state.carts.push(arr)
                //to locale storage 
                localStorage.setItem('cart' + item2.entreprise.id, JSON.stringify(state.carts));
                Swal.fire({
                    title: 'Succès!',
                    text: 'Ajouté avec succès à votre panier',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                })

            } else {
                Swal.fire({
                    title: 'Echec!',
                    text: 'Ce produit est déjà ajouté dans votre panier',
                    imageUrl: item.img,
                    imageWidth: 200,
                    imageAlt: item.title,
                    showConfirmButton: false,
                    timer: 5000
                })
            }
        },
        // Add to Compare
        addToComp: (state, action) => {
            if (state.compare.length >= 3) {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Compare List is Full',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2500,
                })
                return;
            }

            let { id } = action.payload;

            // Check existance
            let item = state.compare.find(i => i.id === parseInt(id))
            if (item === undefined) {
                // Get Product
                let arr = state.products.find(item => item.id === parseInt(id))
                state.compare.push(arr)
                Swal.fire({
                    title: 'Succès!',
                    text: 'Successfully added to Compare List',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                })
            } else {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Already Added in Compare List',
                    imageUrl: item.img,
                    imageWidth: 200,
                    imageAlt: item.title,
                    showConfirmButton: false,
                    timer: 5000,
                })
            }
        },
        // Update Cart
        updateCart: (state, action) => {
            let { val, id } = action.payload;
            state.carts.forEach(item => {
                if (item.id === parseInt(id)) {
                    item.quantity = val
                }
            })
            //storage
            let item2 = state.products.find(i => i.id === parseInt(id))
            localStorage.setItem('cart' + item2.entreprise.id, JSON.stringify(state.carts));

        },
        // Remove Cart
        removeCart: (state, action) => {
            let { id } = action.payload;
            let arr = state.carts.filter(item => item.id !== parseInt(id))
            let item2 = state.products.find(i => i.id === parseInt(id))
            state.carts = arr
            //storage
            localStorage.setItem('cart' + item2.entreprise.id, JSON.stringify(state.carts));


        },
        // Delete from Compare
        delCompare: (state, action) => {
            let { id } = action.payload;
            let arr = state.compare.filter(item => item.id !== parseInt(id))
            state.compare = arr

        },
        // Clear Cart
        clearCart: (state) => {
            state.carts = []
            let item2 = state.products[0]
            localStorage.setItem('cart' + item2.entreprise.id, JSON.stringify(state.carts));

        },
        // Add to Favorite / Wishlist
        addToFav: (state, action) => {
            let { id } = action.payload;

            // Check existance
            let item = state.favorites.find(i => i.id === parseInt(id))
            let item2 = state.products.find(i => i.id === parseInt(id))
            if (item === undefined) {
                // Get Product
                let arr = state.products.find(item => item.id === parseInt(id))
                arr.quantity = 1
                state.favorites.push(arr)
                localStorage.setItem('favorites' + item2.entreprise.id, JSON.stringify(state.favorites));

                Swal.fire('Succès', "AAjouté à la liste de souhaits", 'success')
            } else {
                Swal.fire('Echec', "Déjà ajouté à la liste de souhaits", 'warning')
            }
        },
        // Remove from Favorite / Wishlist
        removeFav: (state, action) => {
            let { id } = action.payload;
            let item2 = state.products.find(i => i.id === parseInt(id))
            let arr = state.favorites.filter(item => item.id !== id)
            state.favorites = arr
            localStorage.setItem('favorites' + item2.entreprise.id, JSON.stringify(state.favorites));


        },
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer
