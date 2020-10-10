import { Product } from "./product.model"

// const p1 = new Product('A Book', 12.99)

const products = [
    { title: 'A Book', price: 12.99 }, 
    { title: 'A Couch', price: 129.99 }
]

const loadedProducts = products.map(prod => {
    return new Product(prod.title, prod.price)
})

for (const prod of loadedProducts) {
    console.log(prod.getInformation())
}

