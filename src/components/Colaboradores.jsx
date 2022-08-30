import { useState } from "react";
import { BaseColaboradores } from "../datos.js";
import Swal from 'sweetalert2'
import { Button, Form, Container, Navbar, ListGroup  } from 'react-bootstrap';

const Colaboradores = () => {

    const [listDatos, setlistDatos] = useState(BaseColaboradores);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [filter, setFilter] = useState("");
    const [filterList, setfilterList] = useState("");

    const saveData = (e) => {
        e.preventDefault();

        if (!name) {
            Swal.fire({
                title: 'Error!',
                text: 'Debes agregar un nombre para continuar.',
                icon: 'error',
                confirmButtonText: 'Volver a intentar'
            })
        } else if (!email){
            Swal.fire({
                title: 'Error!',
                text: 'Debes agregar un correo para continuar.',
                icon: 'error',
                confirmButtonText: 'Volver a intentar'
            })
        }else
            setlistDatos([...listDatos, { nombre: name, correo: email, completed: false }]);
    };

    const datsName = (e) => {
        setname(e.target.value);
    };
    const datsEmail = (e) => {
        setemail(e.target.value);
    };

    const filterName = (e) => {
        setfilterList([...listDatos].filter(colab => colab.nombre.includes(e.target.value)));
        setFilter(e.target.value);
    };

    return (
        <Container>
            <Navbar className="my-5 px-3 " bg="success" expand="lg">
                <Navbar.Brand>Buscador de Colaboradores</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                    <Form className="d-flex ">
                        <Form.Control
                        type="search"
                        placeholder="Buscar colaborador"
                        className="me-2"
                        aria-label="Buscar colaborador"
                        name="colabSearch"
                        onChange={filterName}
                        />
                        <Button variant="outline-dark">Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Form className="my-5" onSubmit={saveData}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                    <Form.Control placeholder=" Insertar nombre" name="name" onChange={datsName}
                    value={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder=" Insertar email" name="email" onChange={datsEmail}
                    value={email} />
                </Form.Group>
                <Button className="text-dark" size="lg" variant="success" type="submit"> Agregar Colaborador </Button>
            </Form>
            <ListGroup className="my-5 " as="ol" numbered>
            {(filter ? filterList : listDatos).map((colab, index) =>
                <ListGroup.Item as="li"
                key={index}>
                {colab.nombre} -
                {colab.correo}
                </ListGroup.Item>)}
            </ListGroup>
        </Container>
    );
};
export default Colaboradores;
