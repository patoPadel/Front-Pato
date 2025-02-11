import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registrarse } from '../../redux/actions/actions';
import Swal from 'sweetalert2';
import LoginGoogle from '../LoginGoogle';
import FormDatosUsuario from '../FormDatosUsuario';
import './styles.css';

function Registrarse() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [area, setArea] = useState('');
    const [numTel, setNumTel] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [depto, setDepto] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
            const { id, value } = e.target;
            setErrors((prev) => ({ ...prev, [id]: null }));
            switch (id) {
                case 'nombre':
                    setNombre(value);
                    break;
                case 'apellido':
                    setApellido(value);
                    break;
                case 'dni':
                    setDni(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'password':
                    setPassword(value);
                    break;
                case 'area':
                    setArea(value);
                    break;
                case 'numTel':
                    setNumTel(value);
                    break;
                case 'calle':
                    setCalle(value);
                    break;
                case 'numero':
                    setNumero(value);
                    break;
                case 'piso':
                    setPiso(value);
                    break;
                case 'depto':
                    setDepto(value);
                    break;
                case 'codigoPostal':
                    setCodigoPostal(value);
                    break;
                case 'provincia':
                    setProvincia(value);
                    break;
                case 'localidad':
                    setLocalidad(value);
                    break;
                case 'comentarios':
                    setComentarios(value);
                    break;
                default:
                    break;
            }
    };
    //funcion para ver la password
    const onClickVerContraseña = () => {
        const inputContraseña = document.querySelector('.input-password');
        if(inputContraseña.type === 'password') { //le cambio el tipo de input
            inputContraseña.type = 'text';
        }else {
            inputContraseña.type = 'password';
        }
    }    
    const validar = () => {
        const campos = {
            nombre,
            apellido,
            dni,
            email,
            password,
            area,
            numTel,
            calle,
            numero,
            codigoPostal,
            provincia,
            localidad,
        };

        const nuevosErrores = Object.entries(campos).reduce((acc, [key, value]) => {
            if (!value || value.trim() === '') {
                acc[key] = ` es requerido.`;
            }
            return acc;
        }, {});

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    //limpio los campos
    const limpiarCampos = () => {
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setPassword('');
        setNumTel();
        setArea();
        setCalle('');
        setNumero('');
        setPiso('');
        setDepto('');
        setCodigoPostal('');
        setProvincia('');
        setLocalidad('');
        setComentarios('');
        setErrors({});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            const data = ({
                nombre,
                apellido,
                dni,
                email,
                password,
                telefono: { area, numero: numTel },
                direccion: {
                    calle,
                    numero,
                    piso,
                    depto,
                    codigoPostal,
                    provincia,
                    localidad,
                },
                comentarios,
            });
            dispatch(registrarse(data))
                .then((response) => {
                    if (response?.msg === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registrado correctamente',
                            timer: 1500,
                        });
                        limpiarCampos();
                        window.location.href = '/login';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: response?.data?.msg || 'Error desconocido',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error del servidor:", error.response?.data || error.message);
                    Swal.fire({
                        icon: 'error',
                        title: error.response?.data?.msg || 'Error al conectar con el servidor',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    };

    return (
        <div className='cont-registrarse'>
            <FormDatosUsuario 
                nombre={nombre}
                apellido={apellido}
                dni={dni}
                email={email}
                password={password}
                area={area}
                numTel={numTel}
                calle={calle}
                numero={numero}
                piso={piso}
                depto={depto}
                codigoPostal={codigoPostal}
                provincia={provincia}
                localidad={localidad}
                comentarios={comentarios}
                errors={errors}
                onClickVerContraseña={onClickVerContraseña}
                limpiarCampos={limpiarCampos}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                registrarse={true}
            />
            <div className='cont-btn-registrarse'>
                <LoginGoogle />
            </div>
        </div>
    )
}

export default Registrarse