import React, { useRef, useState } from 'react';

export default function Counter() {
  let countRef = useRef(0);


  return (
    <button onClick={() => {
      alert(countRef.current);
      countRef.current += 1;
      
    }}>
      Click me {countRef.current}
    </button>
  );
}


// import React, { Component, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import AppRoutes from './AppRoutes';
// import { Layout } from './components/Layout';
// import './custom.css';

// export default class App extends Component {
//   static displayName = App.name;

//   myfunc() {
//     const [index, setIndex] = useState(1);
//   }

//   render() {
//     return (
//       <Layout>
//         <Routes>
//           {AppRoutes.map((route, index) => {
//             const { element, ...rest } = route;
//             return <Route key={index} {...rest} element={element} />;
//           })}
//         </Routes>
//       </Layout>
//     );
//   }
// }
