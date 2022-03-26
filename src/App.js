import './App.css';
import Nav from './Components/Nav';
import Banner from './Components/Banner';
import Form from './Components/Form';

function App() {
  return (
    <>
      <Nav />{/*The nav bar component */}
      <Banner />{/* The Banner Component which contains the Description */}

      <Form />{/* The Form Component which accepts the wallet address and block */}
    </>
  );
}

export default App;
