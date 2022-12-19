import { Router } from "express";
import pedido from "../modelo/pedido"
import { mod_prod } from "../modelo/pedido";
import { mod_sale } from "../modelo/pedido";
import { registro } from "../modelo/pedido";

const router=Router();

//ruta home---------------------------------------------------
router.get('/',(req,res)=>{
    res.render("home")
});
//ruta de tienda----------------------------------------------
router.get('/tienda',async(req,res)=>{
    const tienda= await mod_prod.find().lean()
    res.render('tienda',{tienda})
})
//ruta formulario tienda--------------------------------------
router.post('/pedido/add', async (req,res)=>{
    try {
        const almacen= pedido(req.body);
        await almacen.save()
        res.redirect('/tienda')
    } catch (error) {
        console.log('ERROR DE GUARDADO '+error)
    }
})
//ruta de carro de compras-----------------------------------------
router.get('/carro', async(req,res)=>{
    const pedidos=await pedido.find().lean()
    res.render('carro',{pedidos})
})
//ruta del boton delete--------------------------------------------
router.get('/delete/:id', async(req,res)=>{
    const {id}=req.params;
    await pedido.findByIdAndDelete(id)
    res.redirect('/carro')
})
//ruta pasarela de pago------------------------------------
router.get('/pasarela', async(req,res)=>{
    const pedido_final=await pedido.find().lean()
    const compras= await mod_sale.find().lean()
    const final=[pedido_final,compras]
    res.render('pasarela',{final})
})
router.post('/pasarela/add', async (req,res)=>{
    try {
        const comprar= mod_sale(req.body);
        await comprar.save()
        res.redirect('/pasarela')
    } catch (error) {
        console.log('ERROR DE GUARDADO '+error)
    }
})
//Limpieza de datos-----------------------------------------------
router.post('/borrar_pasarela', async(req,res)=>{
    const regist= registro(req.body)
    await regist.save()
    await mod_sale.collection.drop()
    await pedido.collection.drop()
    res.redirect('/')
})


export default router