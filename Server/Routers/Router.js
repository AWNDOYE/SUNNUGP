const express = require("express")
const router = express.Router()
const auth = require("../Controllers/Auth")
console.log("Route ok");

//Définition des routes pour l'inscription et l'authentification
router.post('/signUP', auth.signUP)
router.post('/signIn', auth.signIn)

module.exports=router;