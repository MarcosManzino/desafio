class ProductManager {
    constructor() {
        this.products = []
    }


    generateID = () => {
        if (this.products.length === 0) return 1
        return this.products[this.products.length - 1].id + 1
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        //generar id
        const id = this.generateID()
        //
        const product = { id, title, description, price, thumbnail, code, stock }


        //validar que sean obligatorias las propiedades 
        if (!title || !description || !price || !thumbnail || !code || !stock) { return console.log("no se completaron todos los campos") }


        // Comprobar si el código ya está en uso
        if (this.products.some(product => product.code === code)) {
            return console.log(`El código ${code} ya está en uso`);
        }
      

        //push
        this.products.push(product)



    }
    getProductById = (id) => {
        const product = this.products.find(product => product.code === id);
        if (!product) {
            console.log("Producto no encontrado");
        }
        return product
    }

    getProducts = () => {
        return this.products;
    }

   
}
const manager = new ProductManager()
manager.addProduct("Manga One piece tomo n°1", "Manga de 34paginas..", 1200, "../img/onepiece01.jpg", 1234, 5);
manager.addProduct("Manga Naruto tomo n°1", "Manga de 42 páginas..", 1000, "../img/naruto01.jpg", 5678, 3);

// Obtener todos los productos
const products = manager.getProducts();
console.log(products);

// Obtener un producto por su código
const product = manager.getProductById(1234);
console.log(product);

// Obtener un producto que no existe
const productNotFound = manager.getProductById(9999);
console.log(productNotFound);