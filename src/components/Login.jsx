
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase/config';
import { 
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión exitoso');
            alert('Inicio de sesión exitoso');
           // Verifica si el email es denedig@gmail.com
        if (email === 'denedig@gmail.com') {
            navigate('/ProductList'); // Redirige a la pagina de admin

        } else {
            navigate('/'); // Redirige a la pagina principal
        }
        }  catch (error) {
            // Manejo del error 
            if (error.code === 'auth/invalid-credential') {
                setError('El correo electrónico o la contraseña son incorrectos.');
            } else {
                setError(error.message);
            }
        }
    };

    // inicio de sesion con google
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Usuario registrado con Google:', user);
            alert('Usuario registrado con Google con éxito');
            navigate('/');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Inicia Sesión
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-900">
                                Email address
                            </label>

                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes cuenta?{' '}
                        <button href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <Link to={"/Register"} >
                                Registrate ahora
                            </Link>
                        </button>
                    </p>

                    <button
                            onClick={handleGoogleSignIn}
                            className="flex w-full mt-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Iniciar sesión con Google  <FcGoogle  className="ml-2 mt-0  w-6 h-6"/>
                        </button>
                    
                </div>

               
            </div>
        </>
    )
}

export default Login;


