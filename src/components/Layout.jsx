import React from 'react';
import Header from './Header';

function Layout(props) {
    console.log(props);
    return (
    <div>
      <Header></Header>
      <main style={{height:'80vh'}}>{props.children}</main>
    </div>
  );
}

export default Layout;
