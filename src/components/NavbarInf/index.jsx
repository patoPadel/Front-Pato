import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.css';

function NavbarInf({usuario}) {

    const [muestraMenuAdmin, setMuestraMenuAdmin] = React.useState(false); //menu admin

    //función para posar sobre el menú admin y mostrarlo
    const handleMouseEnterAdmin = () => {
        setMuestraMenuAdmin(true);
    };
    //función para sacar el mouse del menú admin y ocultarlo
    const handleMouseLeaveAdmin = () => {
        setMuestraMenuAdmin(false);
    };

    return (
        <div className='fila-inf'>
            <ul className='ul-nav-inf'>
                <li>Bullpadel</li>
                <li>Nox</li>
                {/* menú Admin */}
                {
                    usuario?.isAdmin && (
                        <li
                            className='navbar-item-admin'
                            onMouseEnter={handleMouseEnterAdmin}
                            onMouseLeave={handleMouseLeaveAdmin}
                        >
                            Admin
                            {/* menú admin */}
                            {
                                muestraMenuAdmin && (
                                    <ul className='dropdown-menu-admin'>
                                        <li className='dropdown-item-admin'>
                                            <NavLink to='/admin/creaProd' className='link-navbar-admin'>Crea Producto</NavLink>
                                        </li>
                                        <li className='dropdown-item'>
                                            <NavLink to='/admin/listaProdsAdmin' className='link-navbar-admin'>Lista Propiedades</NavLink>
                                        </li>
                                    </ul>
                                )
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default NavbarInf