import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../../redux/actions/actions';
import Swal from 'sweetalert2';
import './styles.css';

function LoginClasico() {

    const usuarioLog = useSelector(state => state.dataUsuario); //datos del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    //valida errores
    const validate = () => {
        let validationErrors = {};       
        
        if (!email) {
            validationErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'El email no es válido';
        }
        if (!password) {
            validationErrors.password = 'La contraseña es obligatoria';
        } else if (password.length < 6) {
            validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length > 0 ? true : false;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (validate === true) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa los campos correctamente',
            });
        } else {
            const data = {
                email,
                password
            };
            dispatch(login(data));
        }
    };

    //efecto para disparar msj de error q viene del back
    useEffect(() => {
        if(usuarioLog?.message === 'ok'){
            //volver a la pagina anterior
            window.history.back();
        }
        if(usuarioLog?.message === 'Email incorrecto'){
            Swal.fire({
                text: 'Email incorrecto',
                icon: 'error'
            });
            dispatch(resetLogin());
        }
        if(usuarioLog?.message === 'Contraseña incorrecta'){
            Swal.fire({
                text: 'Contraseña incorrecta',
                icon: 'error'
            });
            dispatch(resetLogin());
        }
    },[dispatch, usuarioLog?.message]);


    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>Si no estás registrado/a</p>
            <button type='button' className="register-button" onClick={() => window.location.href = '/registrarse'}>
                Registrate
            </button>
        </div>
    );
}

export default LoginClasico;