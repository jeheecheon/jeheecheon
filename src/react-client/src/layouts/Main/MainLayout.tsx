import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return (
    <>
      <Container fluid className='m-0 p-0'>
        <NavBar></NavBar>

        <div className='min-vh-100'>
          <Container fluid="md">
            <Outlet />
          </Container>
        </div>

        <Footer></Footer>
      </Container>
    </>
  );
}
