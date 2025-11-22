<template>
  <div class="login-root">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
      rel="stylesheet"
    />

    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <form @submit.prevent="login">
      <h3>Login Here</h3>

      <label for="username">Username</label>
      <input type="text" placeholder="Email" id="username" v-model="email" />

      <label for="password">Password</label>
      <input type="password" placeholder="Password" id="password" v-model="password" />

      <button type="submit">Enviar</button>

      <div class="social">
        <div class="go"><i class="fab fa-google"></i> Google</div>
        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-root *,
.login-root *:before,
.login-root *:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.login-root {
  background-color: #080710;
  position: relative;
  min-height: 520px;
}
.login-root .background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.login-root .background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.login-root .shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.login-root .shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}
.login-root form {
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
.login-root form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
.login-root form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

.login-root label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
.login-root input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #fff;
}
.login-root input::placeholder {
  color: #e5e5e5;
}
.login-root button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.login-root .social {
  margin-top: 30px;
  display: flex;
}
.login-root .social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.login-root .social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.login-root .social .fb {
  margin-left: 25px;
}
.login-root .social i {
  margin-right: 4px;
}
</style>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      // Endpoint relativo (boot/axios.js ya tiene baseURL configurado)
      const endpointURL = '/node-api/users/signin'

      const userData = {
        email: this.email,
        password: this.password,
      }

      console.log('Enviando a:', endpointURL)
      console.log('Datos:', userData)

      this.$api
        .post(endpointURL, userData)
        .then((response) => {
          console.log('Inicio de sesión exitoso:', response.data)

          // Extraer token (dependiendo de la respuesta puede venir en response.data.token)
          const token = (response.data && (response.data.token || response.data)) || null
          if (!token) {
            throw new Error('Token no encontrado en la respuesta')
          }

          // Guardar token como string (no hace falta JSON.stringify)
          localStorage.setItem('token', token)

          // Configurar header por defecto para futuras peticiones
          this.$api.defaults.headers.common['Authorization'] = `Bearer ${token}`

          // Navegar a la página principal (ajusta la ruta si tienes una ruta específica para Digimons)
          this.$q.notify({
            type: 'positive',
            position: 'top',
            message: 'Inicio de sesión correcto',
          })
          // Redirigir a la página de Digimons al iniciar sesión
          this.$router.push('/digimon')
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$q.notify({
            type: 'negative',
            position: 'top',
            message: 'Error al iniciar sesión: Verifique credenciales o URL.',
          })
        })
    },
  },
}
</script>
