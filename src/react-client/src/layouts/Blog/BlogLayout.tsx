import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import IPageProps from '../../interfaces/page';


const BlogLayout: React.FunctionComponent<IPageProps> = _ => {
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

export default BlogLayout;
