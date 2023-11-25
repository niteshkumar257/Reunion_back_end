import express from "express";
import { addHouse,getHouse,deleteHouse,updateHouse ,getOwnHouse} from "../Controllers/houseController.js";
import userVerification from "../middleware/userAuth.middleware.js";
const router=express.Router();

router.get('/getAllhouses',getHouse);
router.get('/getOwnhouses/:user_id',userVerification,getOwnHouse);
router.post('/addHouse',userVerification,addHouse)
router.delete('/deleteHouse/:house_id',userVerification,deleteHouse);
router.patch('/updateHouse/:house_id',userVerification,updateHouse);

// image upload router extra route
router.patch('/updateImage/:house_id',)

export default router;