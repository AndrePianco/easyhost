import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fazerLogin, cadastrarUsuario } from '../services/api';
import './LoginRegister.css';

export default function LoginRegister() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [loginErro, setLoginErro] = useState('');
  const [registerErro, setRegisterErro] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErro('');
    setLoginLoading(true);
    try {
      const usuario = await fazerLogin(loginData);
      // Salva o id do usuário no sessionStorage para as próximas requisições
      sessionStorage.setItem('userId', usuario.id);
      sessionStorage.setItem('userEmail', usuario.email);
      navigate('/home');
    } catch (err) {
      setLoginErro(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterErro('');
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterErro('As senhas não coincidem!');
      return;
    }
    setRegisterLoading(true);
    try {
      await cadastrarUsuario({ email: registerData.email, password: registerData.password });
      // Faz login automático após cadastro
      const usuario = await fazerLogin({ email: registerData.email, password: registerData.password });
      sessionStorage.setItem('userId', usuario.id);
      sessionStorage.setItem('userEmail', usuario.email);
      navigate('/home');
    } catch (err) {
      setRegisterErro(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <span className="logo-easy">EASY</span>
          <span className="logo-host">HOST</span>
        </div>
        <p className="login-subtitle">Gerencie seus servidores</p>
      </div>

      <div className="login-container">
        {/* Login Form */}
        <div className="login-form-card">
          <h2 className="login-form-title">Entrar</h2>
          <form onSubmit={handleLogin}>
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="login-email">Login</label>
              <div className="login-input-wrapper">
                <input
                  id="login-email"
                  className="login-input"
                  type="email"
                  placeholder="fulano@gmail.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label" htmlFor="login-password">Senha</label>
              <div className="login-input-wrapper">
                <input
                  id="login-password"
                  className="login-input"
                  type={showLoginPass ? 'text' : 'password'}
                  placeholder="••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="login-input-toggle"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {loginErro && <p className="login-erro">{loginErro}</p>}

            <button type="submit" className="login-submit" id="btn-login" disabled={loginLoading}>
              {loginLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className="login-form-card">
          <h2 className="login-form-title">Criar Conta</h2>
          <form onSubmit={handleRegister}>
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="register-email">Login</label>
              <div className="login-input-wrapper">
                <input
                  id="register-email"
                  className="login-input"
                  type="email"
                  placeholder="fulano@gmail.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label" htmlFor="register-password">Senha</label>
              <div className="login-input-wrapper">
                <input
                  id="register-password"
                  className="login-input"
                  type={showRegPass ? 'text' : 'password'}
                  placeholder="••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="login-input-toggle"
                  onClick={() => setShowRegPass(!showRegPass)}
                  aria-label="Toggle password visibility"
                >
                  {showRegPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label" htmlFor="register-confirm">Confirmar senha</label>
              <div className="login-input-wrapper">
                <input
                  id="register-confirm"
                  className="login-input"
                  type={showRegConfirm ? 'text' : 'password'}
                  placeholder="••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="login-input-toggle"
                  onClick={() => setShowRegConfirm(!showRegConfirm)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showRegConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {registerErro && <p className="login-erro">{registerErro}</p>}

            <button type="submit" className="login-submit secondary" id="btn-register" disabled={registerLoading}>
              {registerLoading ? 'Criando...' : 'Criar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
