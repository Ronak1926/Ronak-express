import {Router} from "express"

const router = Router();
router.get("/api/products", (request, response) => {
    
    // console.log(request.headers.cookie);
    console.log(request.signedCookies);
    // console.log(request.signedCookies); // to get the signed cookies

    if (request.cookies.hello && request.cookies.hello === "world") {
        response.send([{ id: 123, name: "myProduct", price: 340.88 }]);
    }
   return response.status(403).send({msg : "sorry you need cookie"})
})

export default router;
