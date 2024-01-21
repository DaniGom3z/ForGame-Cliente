import React, {useEffect,useState} from 'react'
import Button from '../atoms/button'
import Title from '../atoms/title'
import { useNavigate } from 'react-router-dom';


const IniciarSesion = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const btnIniciarSesion = document.getElementById("btn__iniciar-sesion");
    const btnRegistrarse = document.getElementById("btn__registrarse");
    const formulario_login = document.querySelector(".formulario__login");
    const formulario_register = document.querySelector(".formulario__register");
    const contenedor_login_register = document.querySelector(".contenedor__login-register");
    const caja_trasera_login = document.querySelector(".caja__trasera-login");
    const caja_trasera_register = document.querySelector(".caja__trasera-register");

    const anchoPage = () => {
      if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
      } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
      }
    };
    const inicioSesion = () => {
      if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
      } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
      }
    };
    const register = () => {
      if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
      } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
      }
    };

    
    btnIniciarSesion.addEventListener("click", inicioSesion);
    btnRegistrarse.addEventListener("click", register);
    window.addEventListener("resize", anchoPage);

    
    anchoPage();

   
    return () => {
      btnIniciarSesion.removeEventListener("click", inicioSesion);
      btnRegistrarse.removeEventListener("click", register);
      window.removeEventListener("resize", anchoPage);
    };
  }, []); 




  const [formData, setFormData] = useState({
    nombre: '',
    email: '',  // Asegúrate de agregar todos los campos del formulario
    contraseña: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    contraseña: '',
  });
  const [error, setError]=useState(null);
  const[errorLogin, setErrorLogin]=useState(null)
  const handleInputChange = (e, formType) => {
    const targetForm = formType === 'registro' ? setFormData : setLoginFormData;
    targetForm((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    setError(null)
    try {
      const respuesta = await fetch('http://localhost:4000/iniciar', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
      });
  
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Inicio de sesión exitoso:', datos);
  
        // Guardar el token en localStorage
        localStorage.setItem('token', datos.token);
       
        navigate('/admin');
      } else {
        const error = await respuesta.json();
        console.error('Error en el inicio de sesión:', error);
        setErrorLogin("El usuario no existe, crea un usuario para continuar")
        // Manejar errores, mostrar mensajes al usuario, etc.
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
    }
  };

  const handleRegistration = async () => {
    setError(null);
    
    try {
      console.log('Datos del formulario:', formData);
      const respuesta = await fetch('http://localhost:4000/registro', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Respuesta exitosa:', datos);
        alert("usuario creado exitosamente, inicia sesion para continuar")
        // Aquí podrías mostrar algún mensaje de éxito si lo necesitas
      } else {
        const error = await respuesta.json();
        console.error('Error en la solicitud:', error);
        
          setError('El correo electrónico ya está registrado. Por favor, elige otro.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error en el registro. Por favor, inténtalo de nuevo.');
    }
  };
  return (
    <>
    <div className=' bg-slate-300 w-screen h-screen flex items-center justify-center'>
      <main>
        <div className="contenedor__todo">
                  <div className="caja__trasera">
                    <div className="caja__trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-sesion">Iniciar Sesión</button>
                    </div>
                    <div className="caja__trasera-register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse">Regístrarse</button>
                    </div>
                </div>

              
                <div className="contenedor__login-register">
                   
                                        <form
                          action=""
                          className="formulario__login"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                          }}
                          >
                        <Title
                        text="Iniciar sesion"
                        styles="text-red-500 text-2xl text-center mb-10"
                        />
                        <input 
                        type="text"
                        required
                         placeholder="Correo Electronico"
                         name='email'
                          value={loginFormData.email}
                          onChange={(e) => handleInputChange(e, 'login')}
                        />
                        <input
                         type="password" 
                         required
                         placeholder="Contraseña"
                         name='contraseña'
                       value={loginFormData.contraseña}
                       onChange={(e) => handleInputChange(e, 'login')}
                        />
                         {errorLogin && <div className="error-message  text-red-500">{errorLogin}</div>}
                        <Button 
                        styles="text-white w-2/4 bg-red-500 h-full z-10 text-xl font-semibold"
                        text="Entrar"
                        type="submit"
                        />
                    </form>
                    <form action="" className="formulario__register"
                     onSubmit={(e) => {
                      e.preventDefault();
                      handleRegistration();
                    }}
                      >
                    
                        <Title
                        text="Registrarse"
                        styles="text-red-500 text-2xl text-center mb-10"
                        />
                        <input
                          type="text"
                          required
                          placeholder="nombre"
                          name="nombre"  // Agrega el atributo 'name'
                          value={formData.nombre}  // Asocia el valor del campo al estado
                          onChange={(e)=>handleInputChange(e, 'registro')}  // Llama a la función de manejo de cambios
                        />
                        <input
                          type="email"
                          required
                          placeholder="Correo Electronico"
                          name="email"
                          value={formData.email}
                          onChange={(e)=>handleInputChange(e, 'registro')} 
                        />
                        <input
                          type="password"
                          required
                          placeholder="Contraseña"
                          name="contraseña"
                          value={formData.contraseña}
                          onChange={(e)=>handleInputChange(e, 'registro')} 
                        />
                        {error && <div className="error-message text-red-500">{error}</div>}
                        <Button 
                        styles="text-white w-2/4 bg-red-500 h-full  z-10  text-xl font-semibold"
                        text="Registrarse"
                      />
                    </form>
              </div>
          </div>
      </main>
      
    </div>
        
    
    </>
  )
}

export default IniciarSesion