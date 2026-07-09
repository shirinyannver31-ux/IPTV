class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || {};
        this.currentUser = localStorage.getItem('currentUser') || null;
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    saveCurrentUser() {
        localStorage.setItem('currentUser', this.currentUser);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(email);
    }

    isValidPassword(password) {
        return password.length >= 6;
    }

    register(email, password, confirmPassword) {
        if (!this.isValidEmail(email)) {
            return { success: false, message: t('invalidEmail') };
        }

        if (!this.isValidPassword(password)) {
            return { success: false, message: t('shortPassword') };
        }

        if (password !== confirmPassword) {
            return { success: false, message: t('passwordMismatch') };
        }

        if (this.users[email]) {
            return { success: false, message: 'Email already registered' };
        }

        this.users[email] = {
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        this.saveUsers();
        return { success: true, message: 'Registration successful' };
    }

    login(email, password) {
        if (!this.users[email]) {
            return { success: false, message: 'Invalid email or password' };
        }

        if (this.users[email].password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid email or password' };
        }

        this.currentUser = email;
        this.saveCurrentUser();
        return { success: true, message: 'Login successful' };
    }

    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    resetPassword(email, newPassword, confirmPassword) {
        if (!this.users[email]) {
            return { success: false, message: 'Email not found' };
        }

        if (!this.isValidPassword(newPassword)) {
            return { success: false, message: t('shortPassword') };
        }

        if (newPassword !== confirmPassword) {
            return { success: false, message: t('passwordMismatch') };
        }

        this.users[email].password = this.hashPassword(newPassword);
        this.saveUsers();
        return { success: true, message: t('passwordReset') };
    }

    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

const auth = new AuthManager();