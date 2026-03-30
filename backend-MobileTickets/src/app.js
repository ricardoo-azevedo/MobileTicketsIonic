const express = require('express');
const app = express();
app.use(express.json());


const guicheRoutes = require('./routes/guicheRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');

app.use('/guiches', guicheRoutes);
app.use('/tickets', ticketRoutes);
app.use('/atendimentos', atendimentoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
