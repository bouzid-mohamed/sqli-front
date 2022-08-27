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
        categories: [],
        favorites: [],
        compare: [],
        entreprise: null,
        numberPages: 1,
        single: null,
        loading: true,
        loadingCategorie: true,
        loadingSingle: true,
        loadingEntreprise: true,
        errorPage: 0,

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
        addEntreprise: (state, action) => {
            state.entreprise = action.payload
            state.loadingEntreprise = false

        },
        addCategories: (state, action) => {

            Object.assign(state.categories, { ...action.payload });
            state.loadingCategorie = false

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
        addError: (state, action) => {
            state.errorPage = 1
            state.loading = false
        },
        initCompare: (state, action) => {
            Object.assign(state.compare, { ...action.payload });
        },

        // Add to Cart
        addToCart: (state, action) => {
            let a = []
            Object.assign(a, { ...action.payload });
            let id = a[0];
            let copieIdie = { ...id }
            let stock = a[1];
            copieIdie.quantity = parseInt(a[2])
            copieIdie.stokChoisit = stock
            let item = state.carts.find(i => i.stokChoisit.id === parseInt(stock.id))
            if (item === undefined) {
                state.carts.push(copieIdie)
                localStorage.setItem('cart' + id.entreprise.id, JSON.stringify(state.carts));
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
                    title: 'Echec!',
                    text: 'La liste de comparaison est pleine',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2500,
                })
                return;
            }

            let { id } = action.payload;

            // Check existance
            let item = state.compare.find(i => i.id === parseInt(id.id))
            if (item === undefined) {
                state.compare.push(id)
                localStorage.setItem('compare' + id.entreprise.id, JSON.stringify(state.compare));
                Swal.fire({
                    title: 'Succès!',
                    text: 'Ajouté avec succès à la liste de comparaison',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                })
            } else {
                Swal.fire({
                    title: 'Echec!',
                    text: 'Déjà ajouté dans la liste de comparaison',
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
            let arr = state.carts.filter(item => item.stokChoisit.id !== parseInt(id.stokChoisit.id))
            state.carts = arr
            //storage
            localStorage.setItem('cart' + id.entreprise.id, JSON.stringify(state.carts));


        },
        // Delete from Compare
        delCompare: (state, action) => {
            let { id } = action.payload;
            let arr = state.compare.filter(item => item.id !== id.id)
            state.compare = arr
            localStorage.setItem('compare' + id.entreprise.id, JSON.stringify(state.compare));
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
            let item = state.favorites.find(i => i.id === parseInt(id.id))
            //   let item2 = state.products.find(i => i.id === parseInt(id.id))
            if (item === undefined) {
                // Get Product
                //   let arr = state.products.find(item => item.id === parseInt(id))
                //  arr.quantity = 1
                state.favorites.push(id)
                localStorage.setItem('favorites' + id.entreprise.id, JSON.stringify(state.favorites));

                Swal.fire('Succès', "Ajouté à la liste de souhaits", 'success')
            } else {
                Swal.fire('Echec', "Déjà ajouté à la liste de souhaits", 'warning')
            }
        },
        // Remove from Favorite / Wishlist
        removeFav: (state, action) => {
            let { id } = action.payload;
            let arr = state.favorites.filter(item => item.id !== id.id)
            state.favorites = arr
            localStorage.setItem('favorites' + id.entreprise.id, JSON.stringify(state.favorites));

        },
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer
