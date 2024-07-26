import { useState, useEffect } from "react";
import "./Loginform.css";

function Loginform() {
  return (
    const Formlogin  = () =>{
        const [Name , setName] = useState();
        const [Password , setPassword] = useState();

        return(
            

            <form class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label for="email" class="">Your email</label>
                    <input type="email" id="email" class="" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="">Your password</label>
                    <input type="password" id="password" class="0" required />
                </div>
                <div class="">
                <div class="">
                    <input id="remember" type="checkbox" value="" class="" required />
                </div>
                    <label for="remember" class="">Remember me</label>
                </div>
                    <button type="submit" class="">Submit</button>
            </form>

        )
    }
  )
}

export default Loginform