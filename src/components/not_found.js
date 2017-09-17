
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';


const NotFound = ({addPost, toggleSort, sortField }) => {
    return (
        <Container>
            <Header textAlign='center'>
                <Link to={'/'}>
                    <Image src='/assets/images/paraire-dog-404.jpg'/>
                </Link>
           </Header>
        </Container>
    );
}

export default NotFound;