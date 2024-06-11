import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import * as style from "./style.module.less";

const Login: React.FC = () => {
  const [name, setName] = useState("Yang");
  const types: any = style;

  function throwErr() {
    console.log("throwErr-handler");
    throw new Error("sourceMap测试");
  }
  console.log("style:", style);

  return (
    <>
      <div>
        <div className={types.formMain}>Login Title from style</div>
        <button onClick={throwErr}>wakk {name}</button>
      </div>
    </>
  );
};

// export default Login;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
