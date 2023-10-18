const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn.js')
const Atividade = require('./models/Atividade.js')

const User = require('./models/User.js')

const hostname = 'localhost'
const port = 3000

let log = false

// ============== express =================
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// ============= handlebars ===============
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())
//=========================================

// ============= apagar ==================
app.post('/apagar', async (req,res)=>{
    const codigo = req.body.codigo
    const pesq = await Atividade.findOne({raw:true,where:{id:id}})

    if(pesq == null){
        res.render('home',{log})
        console.log(`ID NÃO encontrado`)
    }else if(pesq.id == id){
        res.render('home',{log})
        Atividade.destroy({where: {id:pesq.id}})
        console.log(`User apagado`)
    }else{
        res.render('home',{log})
    }
})
// ============= login ==================
app.post('/', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    const pesq = await User.findOne({raw : true, where : {email:email,senha:senha}})

    if(pesq == null){
        res.render('home',{log})
        console.log(`User NÃO encontrado`)
    }else if(pesq.email == email && pesq.senha == senha){
        log = true
        res.render('home',{log, nome:pesq.nome})
        console.log(`User encontrado`)
    }
    else if(pesq.email !== email && pesq.senha !== senha){
        res.render('home',{log})
        console.log(`User NÃO encontrado`)
    }else{
        res.render('home',{log , nome:pesq.nome})
    }
})
// ============= cadastrar ==================
app.post('/cadastrar', async (req,res)=>{
    const codigo = Number(req.body.codigo)
    const nome = req.body.nome
    if((typeof nome == 'string')&&(typeof codigo == 'number')){
        console.log(`Atividade CADASTRADA`)
        Atividade.create({codigo,nome})
        res.render('listar',{log})
    }else{
        res.render('home',{log})
    }
   
    res.render('listar',{log})
})
// ============= atualizar ==================
app.post('/atualizar', async (req,res)=>{
    const codigo = Number(req.body.codigo)
    const nome = req.body.nome
    const dado_nome = await Atividade.findOne({raw:true, where: {codigo:codigo}})
    
    if(dado_nome != null){
        const dados = {
            codigo : codigo,
            nome : nome
        }
        if((typeof codigo ==='number')&&(typeof nome ==='string')){
            await Atividade.update(dados, {where: {codigo:codigo}})
            console.log(`Atividade ATUALIZADA`)
            res.render('listar', {log})
        }else{
            console.log(`Atividade NÃO ATUALIZADA`)
            res.render('listar', {log})
        }
    }else{
        console.log(`Atividade NÃO ATUALIZADA`)
        res.render('atualiza', {log})
    }
    
})

app.get('/atualizar',(req,res)=>{
    res.render('atualizar',{log})
})
app.get('/cadastrar',(req,res)=>{
    res.render('cadastrar',{log})
})
app.get('/logout',(req,res)=>{
    log = false
    res.render('home',{log})
})
app.get('/listar', async (req,res)=>{
    const dados = await Atividade.findAll({raw:true})
    console.log(dados)
    res.render('listar',{log, dados:dados})
})
app.get('/sistema',(req,res)=>{
    res.render('sistema',{log})
})
app.get('/apagar',(req,res)=>{
    res.render('apagar',{log})
})
app.get('/',(req,res)=>{
    res.render('home',{log})
})
//=========================================
conn.sync().then(()=>{
    app.listen(port,hostname,()=>{
        console.log(`Servidor ${hostname} rodando em ${port}`)
    })
}).catch((err)=>{
    console.log(`Mão foi possível rodar o servido devido ao erro ${err}`)
})
