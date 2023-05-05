import fs from 'fs'

export default class ProductManager {
    constructor() {
        this.path = "./src/products.js";
        this.productTemp = [];
        this.otroTemp = [];
    }

    async idGenerator() {
        let productos = await this.readProducts();
        let resultado = this.productTemp.length + productos.length + 1;
        return resultado
    }

    async readProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, "export const products = []");
            }
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let match = fileContent.match(/export\s+const\s+products\s+=\s+(\[.*\])/);
            if (match) {
                let productos = match[1];
                return JSON.parse(productos);
            } else {
                throw new Error("No se pudo leer el contenido del archivo products.js");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            let productos = await this.readProducts()
            return console.log(productos);
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id) {
        let productos = await this.readProducts();
        let existe = productos.find(prod => prod.id == id);
        if (existe) {
            return console.log(existe);
        } else {
            return 'Not Found';
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        let productos = await this.readProducts();
        for (let arg of arguments) {
            if (arg === undefined) {
                return console.log("Su producto no fue creado, porque olvidó completar uno de sus campos");
            }
        }
        let nuevoProducto = {
            id: await this.idGenerator(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.productTemp.push(nuevoProducto);
        const existe = productos.some(prod => prod.code == nuevoProducto.code);
        const existeEnTemporal = this.otroTemp.some(prod => prod.code == nuevoProducto.code);
        if (existe || existeEnTemporal) {
            console.log(`Su codigo de producto ${nuevoProducto.code} ya existe en la base y no será agregado`);
            this.productTemp = []
        } else {
            this.otroTemp.push(nuevoProducto);
            productos.push(...this.otroTemp);
            await fs.promises.writeFile(this.path, `export const products = ${JSON.stringify(productos)}`);
        }
    }

    async updateProduct(id, campos) {
        let productos = await this.readProducts();
        let indice = productos.findIndex(prod => prod.id === id);

        if (indice === -1) {
            return console.log(`El producto con su id ${id}, no existe`);
        }

        productos[indice] = {
            ...productos[indice],
            ...campos
        }
        
        console.log(productos[indice]);
        
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }

    async deleteProduct(id) {
        let productos = await this.readProducts();
        let index = productos.findIndex(prod => prod.id === id);
        
        if (index !== -1) {
            productos.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
        } else {
            console.log(`El producto con su id ${id}, no existe`);
        }
    }
}





