const express = require('express');
const app = express();
app.use(express.json());


const guicheRoutes = require('./routes/guicheRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/guiches', guicheRoutes);
app.use('/tickets', ticketRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
