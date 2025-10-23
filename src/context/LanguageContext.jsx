import React, { createContext, useState } from 'react'

export const LanguageContext = createContext()

const translations = {
  en: {
    home: 'Home',
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    addPost: 'Add Post',
    title: 'Title',
    content: 'Content',
    image: 'Image (optional)',
    author: "autor",
    edit: 'Edit',
    delete: 'Delete',
    noPosts: 'No posts yet.',
    submit: 'Submit',
    username: 'Username',
    password: 'Password',
    chooseFile: "Choose file",
    noFileSelected: "No file selected",
    headerLogin: 'Login',
    headerRegister: 'Register',
    placeholderUsername: 'Enter your username',
    placeholderPassword: 'Enter your password',
    mustBeLogged: 'You must be logged in to add a post',
    loginToAddPosts: 'Log in to add posts',
    canAddPosts: 'you can add posts',
    defaultAdmin: 'Default admin'
  },
  pl: {
    home: 'Strona główna',
    welcome: 'Witaj',
    login: 'Zaloguj',
    logout: 'Wyloguj',
    register: 'Zarejestruj',
    addPost: 'Dodaj post',
    title: 'Tytuł',
    content: 'Treść',
    image: 'Obrazek (opcjonalnie)',
    author: "autor",
    edit: 'Edytuj',
    delete: 'Usuń',
    noPosts: 'Brak postów.',
    submit: 'Wyślij',
    username: 'Nazwa użytkownika',
    password: 'Hasło',
    chooseFile: "Wybierz plik",
    noFileSelected: "Plik nie wybrany",
    headerLogin: 'Logowanie',
    headerRegister: 'Rejestracja',
    placeholderUsername: 'Wpisz nazwę użytkownika',
    placeholderPassword: 'Wpisz hasło',
    mustBeLogged: 'Musisz być zalogowany, by dodać post',
    loginToAddPosts: 'Zaloguj się, aby dodawać wpisy',
    canAddPosts: 'możesz dodawać wpisy',
    defaultAdmin: 'Domyślny admin'
  },
  ru: {
    home: 'Главная',
    welcome: 'Привет',
    login: 'Войти',
    logout: 'Выйти',
    register: 'Регистрация',
    addPost: 'Добавить пост',
    title: 'Заголовок',
    content: 'Содержание',
    image: 'Изображение (опционально)',
    author: "автор",
    edit: 'Редактировать',
    delete: 'Удалить',
    noPosts: 'Постов нет.',
    submit: 'Отправить',
    username: 'Имя пользователя',
    password: 'Пароль',
    chooseFile: "Выбрать файл",
    noFileSelected: "Файл не выбран",
    headerLogin: 'Вход',
    headerRegister: 'Регистрация',
    placeholderUsername: 'Введите имя пользователя',
    placeholderPassword: 'Введите пароль',
    mustBeLogged: 'Вы должны быть авторизованы, чтобы добавить пост',
    loginToAddPosts: 'Войдите, чтобы добавлять посты',
    canAddPosts: 'вы можете добавлять посты',
    defaultAdmin: 'Админ по умолчанию'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pl')

  const toggleLang = () => {
    const keys = Object.keys(translations)
    const idx = keys.indexOf(lang)
    setLang(keys[(idx + 1) % keys.length])
  }

  const t = (key) => translations[lang][key] || key

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
