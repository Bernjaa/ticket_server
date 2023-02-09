const {Router} = require('express'); 

const router = new Router();

router.get("/", (req, res)=>{
    
    return res.status(200).json({
        "nombre":"Benjamin Lopez"
    })

})

module.exports = router;