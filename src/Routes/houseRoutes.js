import express from "express";
import { addHouse,getHouse,deleteHouse,updateHouse ,getOwnHouse} from "../Controllers/houseController.js";
const router=express.Router();

router.get('/getAllhouses',getHouse);
router.get('/getOwnhouses/:user_id',getOwnHouse);
router.post('/addHouse',addHouse)
router.delete('/deleteHouse/:house_id',deleteHouse);
router.put('/updateHouse/:house_id',updateHouse);

export default router;