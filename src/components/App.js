import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

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

  // стэйт для сохранения индекса карточки
  const [cardIndex, setCardIndex] = useState({});

  //открываем попап с картинкой
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card)       //передаем  данные карточки
    setisImagePopupOpen(true)   //открываем попап скартинкой
    componentDidMount()         //устанавливаем событие при нажатии клавиши Esc
    // document.querySelector('.open-img__popup').classList.add('popup_opened');
    
  };

// -----------------------------

const selectedCardOne =  {
  cardIndex: 10,
  likes: Array(3), 
  name: 'hitman', 
  link: 'https://cdnimg.rg.ru/img/content/167/49/21/Hitman_1000_d_850.jpg', 
  owner: {
    about: "Physicist and Chemist55",
    avatar: "https://bitrafmix.com/data/images/en/30.jpg",
    cohort: "cohort-34",
    name: "Test 155799",
    _id: "977e2691ed8b03b2e627a13e",
  }, 
}

const handleCards = (cards) => {
  // console.log('App: cards = ',cards)
  return cards
}
console.log('handleRightArrowClick: cards = ',handleCards)

//Переключение картинок в 'слайдере'
const handleRightArrowClick = () => {
  // debugger
  console.log('selectedCard = ', selectedCard);
  console.log('cardIndex = ', selectedCard.cardIndex);
  let newCardIndex = selectedCard.cardIndex + 1;
  console.log('newCardIndex = ', newCardIndex);
  //вытащить карточку по newCardIndex из массива и передать setSelectedCard()

  // console.log('handleRightArrowClick: cards = ',cards)

  // cards.forEach(card => {
  //   if(card.cardIndex == newCardIndex){
  //     console.log('newCardIndex: card = ',card)
  //     setSelectedCard(card)
  //   }
  // });

  // 
  setSelectedCard(selectedCardOne)
  
}

const handleLeftArrowClick = () => {
  console.log('handleLeftArrowClick');
}

// --------------------------------

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



  return (
    <>
      <Header />
      <main className="content">
        <Main  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleConfirmClick={handleConfirmClick}
                  handleImagePopupOpen={handleImagePopupOpen}
                  handleCardClick={handleCardClick}
                  handleCards={handleCards}
        />
      </main>

      <Footer />
{/* /попап для картинки карточки */}
  <ImagePopup onClose={closeAllPopups} 
              isOpen={isImagePopupOpen} 
              name={selectedCard.name} 
              link={selectedCard.link}
              id={selectedCard.id}
              cardIndex={selectedCard.cardIndex}
              handleRightArrowClick={handleRightArrowClick}
              handleLeftArrowClick={handleLeftArrowClick}
              />

{/* попап Редактировать профиль */}
      <PopupWithForm  onClose={closeAllPopups} 
                      isOpen={isEditProfilePopupOpen}  
                      title="Редактировать профиль" 
                      name={'edit-profile'} 
      >
        <div className="form__field">
          <input placeholder="Имя" id="user-title" className="popup__input popup__input_user-title" name="title" required="" minLength="2" maxLength="40" /> 
          <span className="popup__input-error user-title-error"></span>
        </div>
        <div className="form__field">
          <input placeholder="О себе" id="user-subtitle" className="popup__input popup__input_user-subtitle" name="subtitle" required="" minLength="2" maxLength="200" /> 
          <span className="popup__input-error user-subtitle-error"></span>
        </div>
      </PopupWithForm>

{/* попап добавления карточки       */}
      <PopupWithForm  onClose={closeAllPopups}
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
      <PopupWithForm  onClose={closeAllPopups} 
                      isOpen={isEditAvatarPopupOpen} 
                      title={'Обновить аватар'} 
                      name={'new-avatar'}
      >
        <div className="form__field">
          <input placeholder="ссылка на изображение аватара" id="avatar-input" className="popup__input popup__input_avatar-img" name="avatar-src" required="" type="url" /> 
          <span className="popup__input-error plaсe-img-input-error"></span>
        </div>
      </PopupWithForm>

{/* попап с удалением карточки */}
      <PopupWithForm  onClose={closeAllPopups} 
                      isOpen={isConfirmPopupOpen}
                      title={'Вы уверены?'} 
                      name={'confirmation'}
      >
        <button className="popup__btn confirmation-btn" name="btn" type="submit" value="Согласиться">Да</button>
      </PopupWithForm>


    </>
  );
}

export default App;
