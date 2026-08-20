import { createContext, useContext, useState } from 'react';

const translations = {
  pt: {
    // Navbar
    navServers: 'Meus servidores',
    navProfile: 'Meu perfil',

    // Login / Register
    loginTitle: 'Entrar',
    loginLabel: 'Login',
    loginPassword: 'Senha',
    loginBtn: 'Entrar',
    loginLoading: 'Entrando...',
    registerTitle: 'Criar Conta',
    registerPassword: 'Senha',
    registerConfirm: 'Confirmar senha',
    registerBtn: 'Criar',
    registerLoading: 'Criando...',
    loginSubtitle: 'Gerencie seus servidores',
    passwordMismatch: 'As senhas não coincidem!',
    passwordTooShort: 'A senha deve ter pelo menos 8 caracteres.',
    passwordNeedsUpper: 'A senha deve ter pelo menos uma letra maiúscula.',
    passwordNeedsSpecial: 'A senha deve ter pelo menos um caractere especial (ex: !@#$%).',
    loginWrongCredentials: 'E-mail ou senha incorretos.',

    // Homepage
    homeTitle: 'Meus hosts',
    homeActiveSpan: 'ativos',
    homeLoading: 'Carregando...',
    homeEmpty: 'Nenhum host ativo ainda. Adicione um!',

    // MyServers
    serversTitle: 'Todos os meus hosts:',
    filterAll: 'Todos',
    filterActive: 'Ativos',
    filterInactive: 'Inativos',
    searchPlaceholder: 'Pesquisar pelo nome...',
    serversLoading: 'Carregando servidores...',
    serversEmpty: 'Nenhum servidor encontrado com esse filtro.',
    addServer: 'Adicionar novo servidor',

    // ServerBanner confirm
    confirmDeleteTitle: 'Excluir servidor?',
    confirmDeleteText: 'será removido permanentemente.',
    cancel: 'Cancelar',
    delete: 'Excluir',
    deleting: 'Excluindo...',

    // HostDetail
    back: 'Voltar',
    loading: 'Carregando...',
    notFound: 'Servidor não encontrado.',
    infoTitle: 'Informações',
    game: 'Jogo',
    linkLabel: 'Link / IP de conexão',
    notes: 'Observações',
    actionsTitle: 'Ações',
    deactivate: 'Desativar',
    activate: 'Ativar',
    edit: 'Editar',
    createdAt: 'Criado em',
    deleteServer: 'Excluir servidor?',
    deleteServerText: 'será removido permanentemente. Esta ação não pode ser desfeita.',
    active: 'Ativo',
    inactive: 'Inativo',

    // AddHost / EditHost
    addHostTitle: 'Adicionar',
    editHostTitle: 'Editar',
    hostWord: 'Host',
    fieldName: 'Nome',
    fieldNamePlaceholder: 'Ex: Servidor Minecraft',
    fieldImage: 'URL da Imagem',
    fieldImagePlaceholder: 'https://exemplo.com/imagem.jpg',
    fieldLink: 'Link / IP de conexão',
    fieldLinkPlaceholder: 'Ex: play.meuservidor.com:25565',
    fieldStatus: 'Status',
    fieldNotes: 'Observações',
    fieldNotesPlaceholder: 'Anotações sobre o servidor...',
    save: 'Salvar',
    saveChanges: 'Salvar alterações',
    saving: 'Salvando...',
    cancelBtn: 'Cancelar',

    // MyProfile
    profileLogout: 'Sair',
    profileDelete: 'Excluir conta',
    profileLogoutTitle: 'Sair da conta?',
    profileLogoutText: 'Você será redirecionado para a tela de login.',
    profileDeleteTitle: 'Excluir conta?',
    profileDeleteText: 'Esta ação é irreversível. Todos os seus dados serão perdidos.',
    profileWait: 'Aguarde...',
  },

  en: {
    // Navbar
    navServers: 'My servers',
    navProfile: 'My profile',

    // Login / Register
    loginTitle: 'Sign In',
    loginLabel: 'Login',
    loginPassword: 'Password',
    loginBtn: 'Sign In',
    loginLoading: 'Signing in...',
    registerTitle: 'Create Account',
    registerPassword: 'Password',
    registerConfirm: 'Confirm password',
    registerBtn: 'Create',
    registerLoading: 'Creating...',
    loginSubtitle: 'Manage your servers',
    passwordMismatch: 'Passwords do not match!',
    passwordTooShort: 'Password must be at least 8 characters.',
    passwordNeedsUpper: 'Password must contain at least one uppercase letter.',
    passwordNeedsSpecial: 'Password must contain at least one special character (e.g. !@#$%).',
    loginWrongCredentials: 'Incorrect email or password.',

    // Homepage
    homeTitle: 'My',
    homeActiveSpan: 'active hosts',
    homeLoading: 'Loading...',
    homeEmpty: 'No active hosts yet. Add one!',

    // MyServers
    serversTitle: 'All my hosts:',
    filterAll: 'All',
    filterActive: 'Active',
    filterInactive: 'Inactive',
    searchPlaceholder: 'Search by name...',
    serversLoading: 'Loading servers...',
    serversEmpty: 'No servers found for this filter.',
    addServer: 'Add new server',

    // ServerBanner confirm
    confirmDeleteTitle: 'Delete server?',
    confirmDeleteText: 'will be permanently removed.',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',

    // HostDetail
    back: 'Back',
    loading: 'Loading...',
    notFound: 'Server not found.',
    infoTitle: 'Information',
    game: 'Game',
    linkLabel: 'Connection link / IP',
    notes: 'Notes',
    actionsTitle: 'Actions',
    deactivate: 'Deactivate',
    activate: 'Activate',
    edit: 'Edit',
    createdAt: 'Created on',
    deleteServer: 'Delete server?',
    deleteServerText: 'will be permanently removed. This action cannot be undone.',
    active: 'Active',
    inactive: 'Inactive',

    // AddHost / EditHost
    addHostTitle: 'Add',
    editHostTitle: 'Edit',
    hostWord: 'Host',
    fieldName: 'Name',
    fieldNamePlaceholder: 'e.g. Minecraft Server',
    fieldImage: 'Image URL',
    fieldImagePlaceholder: 'https://example.com/image.jpg',
    fieldLink: 'Connection link / IP',
    fieldLinkPlaceholder: 'e.g. play.myserver.com:25565',
    fieldStatus: 'Status',
    fieldNotes: 'Notes',
    fieldNotesPlaceholder: 'Notes about the server...',
    save: 'Save',
    saveChanges: 'Save changes',
    saving: 'Saving...',
    cancelBtn: 'Cancel',

    // MyProfile
    profileLogout: 'Sign Out',
    profileDelete: 'Delete account',
    profileLogoutTitle: 'Sign out?',
    profileLogoutText: 'You will be redirected to the login screen.',
    profileDeleteTitle: 'Delete account?',
    profileDeleteText: 'This action is irreversible. All your data will be lost.',
    profileWait: 'Please wait...',
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'pt');

  const toggle = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const t = (key) => translations[lang][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
