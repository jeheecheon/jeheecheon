import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { ReactNode } from 'react';


export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Container fluid className='m-0 p-0'>
        <NavBar></NavBar>

        <div className='min-vh-100'>
          <Container fluid="md">
            {children}
          </Container>
        </div>

        <Footer></Footer>
      </Container>
    </>
  );
}
