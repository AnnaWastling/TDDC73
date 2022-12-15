const PRODUCTS = [
    {
        id: 1,
        title: "first image",
        img: require('./img1.jpg'),
        description: "cheap",
        price: "20kr"
    },
    {
        id: 2,
        title: "second image",
        img:  require('./img2.jpg'),
        description: "fancy",
        price: "200kr"
    },    
    {
        id: 3,
        title: "third image",
        img: require('./img3.jpg'),
        description: "more fancy",
        price: "1500kr"
    },
    {
        id: 4,
        title: "first image",
        img: require('./img1.jpg'),
        description: "cheap",
        price: "20kr"
    },
    {
        id: 5,
        title: "second image",
        img:  require('./img2.jpg'),
        description: "fancy",
        price: "200kr"
    },    
    {
        id: 6,
        title: "third image",
        img: require('./img3.jpg'),
        description: "more fancy",
        price: "1500kr"
    }
];
export function getProducts() {
    return PRODUCTS;
}
export function getProduct(id) {
    return PRODUCTS.find((product) => (product.id == id));
}