import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ( props ) => { // 상위 컴포넌트인 Root에서 넘겨준 props를 받음
  const { children } = props; // props의 컴포넌트를 추출함

  return (
    <div className="Layout">
      <Header />
      <hr/>
      { children }
      <hr/>
      <Footer />
    </div>
  );
}

export default Layout;