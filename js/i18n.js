const translations = {
    hy: {
        title: 'IPTV - Հայերեն',
        login: 'Մուտք',
        register: 'Գրանցում',
        email: 'Gmail',
        password: 'Գաղտնաբառ',
        confirmPassword: 'Հաստատել գաղտնաբառ',
        forgotPassword: 'Մոռացել եմ գաղտնաբառը?',
        signIn: 'Մուտք գործեք',
        signUp: 'Գրանցվել',
        switchToSignUp: 'Չունե՞ք հաշիվ: Գրանցվեք',
        switchToSignIn: 'Ունե՞ք հաշիվ: Մուտք գործեք',
        selectLanguage: 'Ընտրեք լեզուն',
        armenian: 'Հայերեն',
        russian: 'Русский',
        welcome: 'Բարի գալուստ!',
        getIPTV: 'Ստանալ IPTV անվճար',
        iptvInstructions: 'IPTV հանգամանց',
        copyLink: 'Պատճենել',
        logout: 'Ելք',
        changeLanguage: 'Փոխել լեզուն',
        iptvLink: 'https://raw.githubusercontent.com/shirinyannver31-ux/IPTV/refs/heads/main/haykakan.m3u8',
        iptvLinkText: 'Պատճենեք այս հղումը և բաց կատարեք IPTV նվագարկիչի մեջ',
        recommendedPlayers: 'Խորհուրդ տրված IPTV նվագարկիչներ:',
        televizo: 'TELEVIZO',
        ottplayer: 'OTTPLAYER',
        instruction1: '1. Պատճենեք վերևի հղումը',
        instruction2: '2. Բացեք ցանկացած IPTV նվագարկիչ (TELEVIZO կամ OTTPLAYER)',
        instruction3: '3. Դրսից հղումը վերցված նվագարկիչի մեջ',
        instruction4: '4. Վայելեք հայերեն ալիքները',
        resetPassword: 'Վերականգնել գաղտնաբառ',
        sendResetLink: 'Ուղարկել վերականգնման հղում',
        resetSent: 'Վերականգնման հղում ուղարկվել է ձեր Gmail-ին',
        newPassword: 'Նոր գաղտնաբառ',
        confirmNewPassword: 'Հաստատել նոր գաղտնաբառ',
        passwordReset: 'Գաղտնաբառ վերականգնվել է',
        invalidEmail: 'Անվավեր email',
        passwordMismatch: 'Գաղտնաբառները համընկնում են',
        shortPassword: 'Գաղտնաբառը պետք է լինի առնվազն 6 նիշ'
    },
    ru: {
        title: 'IPTV - Русский',
        login: 'Вход',
        register: 'Регистрация',
        email: 'Gmail',
        password: 'Пароль',
        confirmPassword: 'Подтвердить пароль',
        forgotPassword: 'Забыли пароль?',
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        switchToSignUp: 'Нет аккаунта? Зарегистрируйтесь',
        switchToSignIn: 'Есть аккаунт? Войдите',
        selectLanguage: 'Выберите язык',
        armenian: 'Հայերեն',
        russian: 'Русский',
        welcome: 'Добро пожаловать!',
        getIPTV: 'Получить IPTV бесплатно',
        iptvInstructions: 'Инструкции IPTV',
        copyLink: 'Копировать',
        logout: 'Выход',
        changeLanguage: 'Изменить язык',
        iptvLink: 'https://raw.githubusercontent.com/shirinyannver31-ux/IPTV/refs/heads/main/haykakan.m3u8',
        iptvLinkText: 'Скопируйте эту ссылку и откройте её в вашем IPTV плеере',
        recommendedPlayers: 'Рекомендуемые IPTV плееры:',
        televizo: 'TELEVIZO',
        ottplayer: 'OTTPLAYER',
        instruction1: '1. ��копируйте ссылку выше',
        instruction2: '2. Откройте ваш любимый IPTV плеер (TELEVIZO или OTTPLAYER)',
        instruction3: '3. Вставьте ссылку в ваш плеер',
        instruction4: '4. Наслаждайтесь русскими каналами',
        resetPassword: 'Сбросить пароль',
        sendResetLink: 'Отправить ссылку для сброса',
        resetSent: 'Ссылка для сброса отправлена на ваш Gmail',
        newPassword: 'Новый пароль',
        confirmNewPassword: 'Подтвердить новый пароль',
        passwordReset: 'Пароль был сброшен',
        invalidEmail: 'Неверный адрес электронной почты',
        passwordMismatch: 'Пароли не совпадают',
        shortPassword: 'Пароль должен содержать минимум 6 символов'
    }
};

let currentLanguage = localStorage.getItem('language') || 'hy';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updatePageLanguage();
}

function t(key) {
    return translations[currentLanguage][key] || translations['hy'][key];
}

function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.title = t('title');
}