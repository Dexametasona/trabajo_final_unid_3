import {connect} from "mongoose";

(async() => {
    try {
        const db=await connect("mongodb://localhost:27017/TIENDA")
        console.log("BD, conexion exitosa")
    }
    catch(error){
        console.log("ocurrio un error", error);
    }
})();

