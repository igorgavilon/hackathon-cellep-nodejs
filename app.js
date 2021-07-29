const express = require('express')
// const db = require('./dbConnection')

const sortes = require('./mockup');

const db = require('./dbConnection');

const app = express()

// Configurações do Express
// ---------------------------------------------
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

// Rotas
// ---------------------------------------------
app.get('/', async (req, res) => {

  var result = await db.query('select * from sortes');
  
  const max = result.rows.length;
  const min = 0;

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const indice = getRandomArbitrary(min, max);
  
  const {texto} = result.rows[indice];
  

  res.render('index', {texto: texto})

});

app.get('/admin', (req, res) => {
  res.render('admin')
})

app.post('/admin/salvar-texto', async (req, res) => {

  let {texto} = req.body;
  
  await db.query('INSERT INTO sortes (texto) VALUES ($1)', [texto],
  (err, result) => {
      res.redirect('/')
  });

})

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando com express')
  console.log('Pressione CTRL+C para encerrar')
});