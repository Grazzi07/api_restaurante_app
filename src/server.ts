import sequelize from './config/database';
import app from './app';
import restauranteRoutes from './routes/restauranteRoutes'; 
import itemPedidoRoutes from './routes/itemPedidoRoutes';
import categoriaProdutoRoutes from './routes/categoriaprodutoRoutes';
import produtoRoutes from './routes/produtoRoutes';
const PORT = process.env.PORT || 5000;



app.use('/restaurante', restauranteRoutes);
app.use('/itens-pedido', itemPedidoRoutes);
app.use('/categoria-produto', categoriaProdutoRoutes);
app.use('/produtos', produtoRoutes);
export default app;

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexão com o banco de dados estabelecida com sucesso 🚀.');

    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

function express() {
  throw new Error('Function not implemented.');
}
