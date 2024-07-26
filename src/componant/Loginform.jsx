
import { useState } from "react";
import "./Loginform.css";
import SUlogo from './SU_logo.png';


function Loginform() {
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name || !Password) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    console.log("Form data submitted:", { Name, Password });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <img src= {SUlogo} className="LogoSu" />
      <h1 className="Textcenter">Login Silpakorn</h1>
      <div className="">
        <label htmlFor="email" className="form-rowlogin">Your Name</label>
        <input
          type="text"
          id="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="password" className="form-rowPassword">Your password</label>
        <input
          type="password"
          id="Password"
          className=""
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default Loginform;

