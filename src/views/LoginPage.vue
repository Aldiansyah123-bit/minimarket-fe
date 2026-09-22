<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-container">
          <i class="fas fa-store"></i>
        </div>
        <h2>Selamat Datang</h2>
        <p>POS Minimarket - Sistem Kasir Digital</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Username</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            placeholder="Masukkan username" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="loginForm.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Masukkan password" 
            required 
          />
        </div>
        
        <div v-if="loginError" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ loginError }}
        </div>
        
        <button type="submit" class="btn-login">
          <i class="fas fa-sign-in-alt"></i> Masuk
        </button>
      </form>
      
      <div class="demo-accounts">
        <p>Demo Accounts:</p>
        <div class="demo-grid">
          <button 
            v-for="acc in demoAccounts" 
            :key="acc.username"
            @click="fillLogin(acc)"
            class="demo-btn"
          >
            <div class="demo-avatar" :style="{ background: acc.color }">
              <i class="fas fa-user"></i>
            </div>
            <div class="demo-info">
              <strong>{{ acc.role }}</strong>
              <small>{{ acc.username }}</small>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      showPassword: false,
      demoAccounts: [
        { role: 'Administrator', username: 'admin', password: 'admin123', color: '#dc2626' },
        { role: 'Owner', username: 'owner', password: 'owner123', color: '#7c3aed' },
        { role: 'Manager', username: 'manager', password: 'manager123', color: '#2563eb' },
        { role: 'Kasir', username: 'kasir1', password: 'kasir123', color: '#16a34a' }
      ]
    }
  },
  computed: {
    loginError() {
      return this.$store.state.loginError
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('login', this.loginForm)
    },
    fillLogin(acc) {
      this.loginForm.username = acc.username
      this.loginForm.password = acc.password
      this.$store.commit('CLEAR_LOGIN_ERROR')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a, #1e40af, #3730a3);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-container {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
}

.logo-container i {
  font-size: 1.5rem;
  color: white;
}

.login-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.login-header p {
  color: #6b7280;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-login:hover {
  background: #1d4ed8;
}

.demo-accounts {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.demo-accounts p {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 0.5rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.demo-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.demo-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.demo-avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.demo-avatar i {
  font-size: 0.5rem;
  color: white;
}

.demo-info {
  flex: 1;
  min-width: 0;
}

.demo-info strong {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
}

.demo-info small {
  display: block;
  color: #9ca3af;
  font-size: 0.625rem;
}
</style>
