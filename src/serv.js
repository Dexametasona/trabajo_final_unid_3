import express from "express";
import index_router from "./rutas/index_routes";
import {create} from "express-handlebars";
import path from "path"
import morgan from "morgan"

const app =express()

//configuracion del handlebars--------------------------------
app.set('views',path.join(__dirname,'/views'))
app.engine('.hbs',create({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayouts:'main',
    extname:".hbs"
}).engine);
app.set("view engine", ".hbs")

//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//conexion a las rutas
app.use(index_router)

export default app