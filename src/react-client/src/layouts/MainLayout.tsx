import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';


export default function MainLayout() {
  return (
    <>
      <Container fluid className='m-0 p-0'>
        <NavBar></NavBar>

        <div className='min-vh-100'>
          <Container fluid="md">
            asdasd
          </Container>
        </div>

        <Footer></Footer>
      </Container>
    </>
  );
}
