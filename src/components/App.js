import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {

  const [currentBtn, setCurrentBtn] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);



  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false)
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false)

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
  }
  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(true)
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
  }
  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true)
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
  }
  const handleConfirmClick = () => {
    setisConfirmPopupOpen(true)
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
  }
  const handleImagePopupOpen = () => {
    setisImagePopupOpen(true)
  }

  //открываем попап с картинкой
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setSelectedCard(card)       //передаем  данные карточки
    setisImagePopupOpen(true)   //открываем попап скартинкой
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
    // document.querySelector('.open-img__popup').classList.add('popup_opened');
  };

  //закрываем попап с картинкой
  const closeAllPopups = () => {
    // console.log('closeAllPopups');
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisConfirmPopupOpen(false);
    setisImagePopupOpen(false);
    componentWillUnmount()  //снимаем событие при нажатии клавиши Esc
  };

  const onKeyDown = (evt) => {
    if (evt.key == "Escape") {
      // console.log('onKeyDown');
      closeAllPopups()
    }
  }
  const componentDidMount = () => {
    document.addEventListener('keydown', onKeyDown);
  }
  const componentWillUnmount = () => {
    document.removeEventListener('keydown', onKeyDown);
  }


// Функция обновления пользователя 
  function handleUpdateUser(user) {
    api.postUser(user)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
// Функция обновления аватара 
  function handleUpdateAvatar(avatar) {

console.log('avatar= ',avatar);

    api.postAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <main className="content">
          <Main handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleConfirmClick={handleConfirmClick}
            handleImagePopupOpen={handleImagePopupOpen}
            handleCardClick={handleCardClick}
          />
        </main>
        <Footer />
        {/* /попап для картинки карточки */}
        <ImagePopup onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          name={selectedCard.name}
          link={selectedCard.link}
        />
        {/* попап Редактировать профиль */}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        /> 
        {/* попап добавления карточки       */}
        <PopupWithForm 
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          title={'Новое место'}
          name={'add-plaсe'}
        >
          <div className="form__field">
            <input placeholder="название" id="place-title-input" className="popup__input popup__input_plaсe-title" name="name" required="" minLength="2" maxLength="30" />
            <span className="popup__input-error place-title-input-error"></span>
          </div>
          <div className="form__field">
            <input placeholder="ссылка на картинку" id="plaсe-img-input" className="popup__input popup__input_plaсe-img" name="link" required="" type="url" />
            <span className="popup__input-error plaсe-img-input-error"></span>
          </div>
        </PopupWithForm>
        {/* попап Обновить аватар       */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* <PopupWithForm onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          title={'Обновить аватар'}
          name={'new-avatar'}
        >
          <div className="form__field">
            <input 
              placeholder="ссылка на изображение аватара" 
              id="avatar-input" 
              className="popup__input popup__input_avatar-img" 
              name="avatar-src" 
              required="" 
              type="url" 
            />
            <span className="popup__input-error plaсe-img-input-error"></span>
          </div>
        </PopupWithForm> */}

        {/* попап с удалением карточки */}
        <PopupWithForm onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          title={'Вы уверены?'}
          name={'confirmation'}
        >
          <button className="popup__btn confirmation-btn" name="btn" type="submit" value="Согласиться">Да</button>
        </PopupWithForm>

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
