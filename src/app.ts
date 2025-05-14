import express from 'express';
import bodyParser from 'body-parser';


import itemPedidoRoutes from './routes/itemPedidoRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import restauranteRoutes from './routes/restauranteRoutes';
import produtoRoutes from './routes/produtoRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import entregasRoutes from './routes/entregasRoutes';
import entregadorRoutes from './routes/entregadorRoutes';
import avaliacaoRoutes from './routes/avaliacaoRoutes';
import categoriaprodutoRoutes from './routes/categoriaprodutoRoutes';
import enderecoRoutes from './routes/enderecoRoutes';
const app = express();

app.use(express.json()); 
app.use(bodyParser.json());
app.use('/usuarios', usuarioRoutes); 
app.use('/restaurantes', restauranteRoutes); 
app.use('/produtos', produtoRoutes); 
app.use('/pedido', pedidoRoutes); 
app.use('/entregas', entregasRoutes);
app.use('/entregadores', entregadorRoutes); 
app.use('/avaliacoes', avaliacaoRoutes); 
app.use('/categorias', categoriaprodutoRoutes);
app.use('/itemPedido', itemPedidoRoutes);
app.use('/enderecos', enderecoRoutes);
export default app;