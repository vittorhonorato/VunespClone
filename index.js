const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Candidatos = require('./database/Cadastro');


connection.authenticate()
    .then(() => {
        console.log('Banco de dados conectado com sucesso');
    })
    .catch((erro) => {
        console.log(erro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/candidato', (req, res) => {
    res.render('candidatos')
})

app.post('/candidato', (req, res) => {
    

    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const rg = (req.body.rg);
    const telefone = parseInt(req.body.telefone);
    const idade = parseInt(req.body.idade);
    let cep = req.body.cep;
    const sexo = req.body.sexo;
    const endereco = req.body.endereco;
    const numero = parseInt(req.body.numero);
    const cidade = req.body.cidade;
    const estado = req.body.estado;

    cep = String(cep).padStart(8, '0');

    Candidatos.create({
        nome,
        email,
        cpf,
        rg,
        telefone,
        idade,
        cep,
        sexo,
        endereco,
        numero,
        cidade,
        estado,
    }).then(() => {
        Candidatos.findAll({ raw: true }).then(candidatos => {
            res.render('candidatos', {
                candidatos,
            })
        })
    }).catch(error => {
        console.error('Erro ao criar candidato:', error);
        res.status(500).send('Ocorreu um erro ao processar a sua solicitação.');
    });
});



app.listen(8081, () => {
    console.log('Servidor rodando');
});