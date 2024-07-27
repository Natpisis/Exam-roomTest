import { useState, useEffect } from "react";
import "./Loginform.css";
import SUlogo from "./SU_logo.png";
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom';

function Loginform() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name || !Password) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    console.log("Form data submitted:", { Name, Password });
  };
  const [data, setData] = useState(null);
  async function getData() {
    const response = await fetch(
      "https://a3df-2405-9800-b520-3a6f-d14e-36b1-8676-c43c.ngrok-free.app/checkpassword/"+Name+"/"+CryptoJS.MD5(Password).toString()
    );
    const result = await response.json();
    setData(result);
    if (result) {
      console.log(result);
      console.log("IF");
      navigate('/Pageform');
    } else {
      alert("Name Or Password is Incorrect Pls Tyr Again");
      console.log("Not found");
      console.log("ELSE");
    }
  }
  function Login() {

    getData();
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <img src={SUlogo} className="LogoSu" />
      <h1 className="Textcenter">Login Silpakorn</h1>
      <div className="">
        <label htmlFor="email" className="form-rowlogin">
          Your Name
        </label>
        <input
          type="text"
          id="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="password" className="form-rowPassword">
          Your password
        </label>
        <input
          type="password"
          id="Password"
          className=""
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={Login} type="submit">Submit</button>
    </form>
  );
}

export default Loginform;
