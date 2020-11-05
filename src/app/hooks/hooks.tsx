import Axios from "axios";
import { useEffect, useState } from "react";

type ProductsType = {
    items: {
        id: number,
        name: string,
        description: string,
        rating: number,
        image: string,
        active: boolean,
        promo: boolean,
    }[],
    links: {
        first: string,
        last: string,
        next: string,
        previous: string,
    },
    meta: {
        currentPage: number,
        totalPages: number
    },
};

export const useGetProducts = (search: string, pageIndex: number, active: boolean, promo: boolean, setStatus: Function) => {
    const [products, setProducts] = useState<ProductsType>();

    useEffect(() => {
        const fetchProducts = async () => {
            setStatus("loading")
            try {
                const products = await Axios.get('https://join-tsh-api-staging.herokuapp.com/product', {
                    params: {
                        search: search,
                        limit: 8,
                        page: pageIndex,
                        active: active ? active : null,
                        promo: promo ? promo : null,
                    }
                })
                    .then((response) => {
                        return response.data;
                    });
                setStatus("success");
                setProducts(products);
            } catch (error) {
                setStatus("error");
            }
        }
        fetchProducts();
    }, [pageIndex, active, promo, search, setStatus]);

    return products;
};
