import express from "express";
import ProductManager from "./index.js";


const app = express();
app.use(express.json())
const port = 8080;
const manager = new ProductManager()




app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  let products = await manager.readProducts();
 let response = limit ? products.slice(0, limit) : products
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  let products = await manager.readProducts();
  const { pid } = req.params;
  const product = products.find(p => p.id == pid);
  console.log(product)
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let producto = new ProductManager();

//producto.addProducts('PelucheDeBatman', 'Es un peluche de Batman con luces LED y sonidos.', 29.99, './img/PelucheDeBatman.jpg', 'E1F2G3', 8);
//producto.addProducts('BicicletaBMX', 'Es una bicicleta BMX con marco de acero resistente y frenos de disco.', 399.99, './img/BicicletaBMX.jpg', 'F3G4H5', 5);
//producto.addProducts('RelojDeportivo', 'Es un reloj deportivo con pantalla táctil y monitor de ritmo cardíaco.', 149.99, './img/RelojDeportivo.jpg', 'G5H6I7', 20);
//producto.addProducts('PlanchaDeCabello', 'Es una plancha de cabello con tecnología de cerámica y turmalina.', 39.99, './img/PlanchaDeCabello.jpg', 'H7I8J9', 15);
//producto.addProducts('AudífonosInalámbricos', 'Son audífonos inalámbricos con cancelación de ruido y micrófono incorporado.', 79.99, './img/AudifonosInalambricos.jpg', 'I9J1K2', 10);
//producto.addProducts('SmartTV', 'Es un televisor inteligente de 50 pulgadas con resolución 4K Ultra HD.', 799.99, './img/SmartTV.jpg', 'J1K3L4', 3);
//producto.addProducts('LaptopGamer', 'Es una laptop para gamers con procesador Intel Core i7 y tarjeta gráfica NVIDIA.', 1299.99, './img/LaptopGamer.jpg', 'K3L5M6', 2);
//producto.addProducts('CafeteraAutomática', 'Es una cafetera automática con molinillo de café integrado y leche vaporizada.', 249.99, './img/CafeteraAutomatica.jpg', 'L5M7N8', 7);
//producto.addProducts('AspiradoraRobot', 'Es una aspiradora robot con función de mapeo y limpieza programable.', 349.99, './img/AspiradoraRobot.jpg', 'M7N9O1', 4);
//producto.addProducts('SillaErgonómica', 'Es una silla ergonómica de oficina con respaldo ajustable y soporte lumbar.', 199.99, './img/SillaErgonomica.jpg', 'N9O2P3', 6);
//producto.addProducts('MicroondasConvección', 'Es un microondas con función de convección y grill.', 179.99, './img/MicroondasConveccion.jpg', 'O2P4Q5', 9);
//producto.addProducts('HornoEléctrico', 'Es un horno eléctrico de 6 litros con función de tostado y asado.', 59.99, './img/HornoElectrico.jpg', 'P4Q6R7', 12);

