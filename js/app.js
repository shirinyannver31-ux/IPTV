class IPTVApp {
    constructor() {
        this.currentPage = 'auth';
        this.init();
    }

    init() {
        if (auth.isLoggedIn()) {
            this.showLanguageSelection();
        } else {
            this.showAuthPage();
        }
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'switch-to-signup') {
                this.showSignUp();
            } else if (e.target.id === 'switch-to-signin') {
                this.showSignIn();
            } else if (e.target.id === 'forgot-password-btn') {
                this.showForgotPasswordModal();
            } else if (e.target.id === 'register-btn') {
                this.handleRegister();
            } else if (e.target.id === 'login-btn') {
                this.handleLogin();
            } else if (e.target.id === 'send-reset-btn') {
                this.handlePasswordReset();
            } else if (e.target.classList.contains('lang-btn')) {
                this.selectLanguage(e.target.dataset.lang);
            } else if (e.target.id === 'get-iptv-btn') {
                this.showIPTVInstructions();
            } else if (e.target.id === 'logout-btn') {
                this.logout();
            } else if (e.target.id === 'change-lang-btn') {
                this.showLanguageSelection();
            } else if (e.target.classList.contains('copy-btn')) {
                this.copyToClipboard();
            } else if (e.target.classList.contains('close-btn')) {
                this.closeModal(e.target.closest('.modal'));
            }
        });
    }

    showAuthPage() {
        this.currentPage = 'auth';
        document.getElementById('root').innerHTML = `
            <div class="container">
                <div class="auth-container">
                    <h1 data-i18n="register">${t('register')}</h1>
                    <div id="auth-form"></div>
                </div>
            </div>
        `;
        this.showSignUp();
    }

    showSignIn() {
        document.getElementById('auth-form').innerHTML = `
            <form onsubmit="return false">
                <div class="form-group">
                    <label data-i18n="email">${t('email')}</label>
                    <input type="email" id="login-email" placeholder="your@gmail.com" required>
                </div>
                <div class="form-group">
                    <label data-i18n="password">${t('password')}</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="button" class="btn btn-primary" id="login-btn" data-i18n="signIn">${t('signIn')}</button>
                <div class="forgot-password">
                    <a id="forgot-password-btn" data-i18n="forgotPassword">${t('forgotPassword')}</a>
                </div>
            </form>
            <div class="switch-mode">
                <p data-i18n="switchToSignUp">${t('switchToSignUp')}</p>
                <a id="switch-to-signup" data-i18n="register">${t('register')}</a>
            </div>
        `;
    }

    showSignUp() {
        document.getElementById('auth-form').innerHTML = `
            <form onsubmit="return false">
                <div class="form-group">
                    <label data-i18n="email">${t('email')}</label>
                    <input type="email" id="register-email" placeholder="your@gmail.com" required>
                </div>
                <div class="form-group">
                    <label data-i18n="password">${t('password')}</label>
                    <input type="password" id="register-password" required>
                </div>
                <div class="form-group">
                    <label data-i18n="confirmPassword">${t('confirmPassword')}</label>
                    <input type="password" id="register-confirm" required>
                </div>
                <button type="button" class="btn btn-primary" id="register-btn" data-i18n="signUp">${t('signUp')}</button>
            </form>
            <div class="switch-mode">
                <p data-i18n="switchToSignIn">${t('switchToSignIn')}</p>
                <a id="switch-to-signin" data-i18n="login">${t('login')}</a>
            </div>
        `;
    }

    handleRegister() {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        const result = auth.register(email, password, confirm);
        if (result.success) {
            alert('Registration successful! Please sign in.');
            this.showSignIn();
        } else {
            this.showError(result.message);
        }
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const result = auth.login(email, password);
        if (result.success) {
            this.showLanguageSelection();
        } else {
            this.showError(result.message);
        }
    }

    showForgotPasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <h2 data-i18n="resetPassword">${t('resetPassword')}</h2>
                <div class="form-group">
                    <label data-i18n="email">${t('email')}</label>
                    <input type="email" id="reset-email" placeholder="your@gmail.com">
                </div>
                <button class="btn btn-primary" id="send-reset-btn" data-i18n="sendResetLink">${t('sendResetLink')}</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    handlePasswordReset() {
        const email = document.getElementById('reset-email').value;
        if (!auth.users[email]) {
            this.showError('Email not found');
            return;
        }

        const newPasswordModal = document.createElement('div');
        newPasswordModal.className = 'modal active';
        newPasswordModal.innerHTML = `
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <h2 data-i18n="newPassword">${t('newPassword')}</h2>
                <div class="form-group">
                    <label data-i18n="newPassword">${t('newPassword')}</label>
                    <input type="password" id="new-password" required>
                </div>
                <div class="form-group">
                    <label data-i18n="confirmNewPassword">${t('confirmNewPassword')}</label>
                    <input type="password" id="confirm-new-password" required>
                </div>
                <button class="btn btn-primary" onclick="app.confirmPasswordReset('${email}')" data-i18n="resetPassword">${t('resetPassword')}</button>
            </div>
        `;
        document.body.appendChild(newPasswordModal);
        document.querySelectorAll('.modal')[0].remove();
    }

    confirmPasswordReset(email) {
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;

        const result = auth.resetPassword(email, newPassword, confirmNewPassword);
        if (result.success) {
            this.closeAllModals();
            alert(result.message);
            this.showSignIn();
        } else {
            this.showError(result.message);
        }
    }

    showLanguageSelection() {
        this.currentPage = 'language';
        document.getElementById('root').innerHTML = `
            <div class="container">
                <div class="language-selection">
                    <h2 data-i18n="selectLanguage">${t('selectLanguage')}</h2>
                    <div class="language-buttons">
                        <button class="lang-btn" data-lang="hy" data-i18n="armenian">${t('armenian')}</button>
                        <button class="lang-btn" data-lang="ru" data-i18n="russian">${t('russian')}</button>
                    </div>
                </div>
            </div>
        `;
    }

    selectLanguage(lang) {
        setLanguage(lang);
        this.showDashboard();
    }

    showDashboard() {
        this.currentPage = 'dashboard';
        const user = auth.getCurrentUser();
        document.getElementById('root').innerHTML = `
            <div class="dashboard">
                <div class="header">
                    <h1 data-i18n="welcome">${t('welcome')}</h1>
                    <div class="header-actions">
                        <button class="lang-switcher" id="change-lang-btn" data-i18n="changeLanguage">${t('changeLanguage')}</button>
                        <button class="logout-btn" id="logout-btn" data-i18n="logout">${t('logout')}</button>
                    </div>
                </div>
                <div class="dashboard-content">
                    <h2>${user}</h2>
                    <button class="get-iptv-btn" id="get-iptv-btn" data-i18n="getIPTV">${t('getIPTV')}</button>
                </div>
            </div>
        `;
    }

    showIPTVInstructions() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; overflow-y: auto; max-height: 90vh;">
                <button class="close-btn">&times;</button>
                <h2 data-i18n="iptvInstructions">${t('iptvInstructions')}</h2>
                
                <div class="iptv-instructions">
                    <h3 data-i18n="iptvLinkText">${t('iptvLinkText')}</h3>
                    <div class="iptv-link">
                        ${t('iptvLink')}
                        <button class="copy-btn" data-i18n="copyLink">${t('copyLink')}</button>
                    </div>
                </div>

                <div class="iptv-instructions">
                    <h3 data-i18n="recommendedPlayers">${t('recommendedPlayers')}</h3>
                    <div class="player-list">
                        <div class="player-item" data-i18n="televizo">${t('televizo')}</div>
                        <div class="player-item" data-i18n="ottplayer">${t('ottplayer')}</div>
                    </div>
                </div>

                <div class="iptv-instructions">
                    <h3>How to use:</h3>
                    <p data-i18n="instruction1">${t('instruction1')}</p>
                    <p data-i18n="instruction2">${t('instruction2')}</p>
                    <p data-i18n="instruction3">${t('instruction3')}</p>
                    <p data-i18n="instruction4">${t('instruction4')}</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    copyToClipboard() {
        const link = t('iptvLink');
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
    }

    logout() {
        auth.logout();
        this.showAuthPage();
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(m => m.remove());
    }

    closeModal(modal) {
        modal.remove();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        const formContainer = document.querySelector('form') || document.querySelector('.modal-content');
        if (formContainer) {
            formContainer.insertBefore(errorDiv, formContainer.firstChild);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }
}

const app = new IPTVApp();