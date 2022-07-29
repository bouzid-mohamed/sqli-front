import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import ProductServices from "services/productServices/ProductServices";


class ProductData {

    async getData() {


        await ProductServices.getAllProductEntreprise(33, null, null, null, null).then((res) => {
            const listproducts = []
            res.data[0].filter((p) => {

                listproducts.push({
                    id: p.id, labels: "Trending", category: "fashion", img: '../../assets/img/electronics/product/1.jpg', hover_img: '../../assets/img/electronics/product/1.jpg',
                    title: "Green Dress For Woman",
                    price: 38,
                    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.`,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    color: [
                        {
                            color: "green",
                            img: '../../assets/img/electronics/product/1.jpg',
                            quantity: 1,
                        },
                        {
                            color: "red",
                            img: '../../assets/img/electronics/product/1.jpg',
                            quantity: 1,
                        },
                        {
                            color: "blue",
                            img: '../../assets/img/electronics/product/1.jpg',
                            quantity: 1,
                        },
                    ]
                })
            })
            console.log(typeof ((listproducts)))
            return listproducts

        })

    }
}
export default new ProductData;