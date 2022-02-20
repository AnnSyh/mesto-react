import React from 'react';
import { useState, useEffect } from 'react';
import avatar from '../images/avatar.jpg';
import Button from './button';
import api from  '../utils/api.js';
import Card from './Card';

function Main({
                handleEditAvatarClick, 
                handleEditProfileClick, 
                handleAddPlaceClick,
                handleCardClick
            }) {

const [userName, setUserName] = useState('Имя пользователя');
const [userDescription, setUserDescription] = useState('О пользователе');
const [userAvatar, setUserAvatar] = useState(avatar);
  
    useEffect(() => {

      api.getUser()
        .then((userData) => {
            // console.log('userData = ',userData)
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        })
        .catch((err) => console.log(err));

    }, []);

const [cards , setCards ] = useState([]);


    useEffect(() => {
  
      api.getInitialCards()
        .then((cards) => {
            console.log('cards = ',cards)
            setCards(cards);
        })
        .catch((err) => console.log(err));
  
    }, []);    

    //заводим индекс карточки для слайдера
    let countCard = 0;
    cards.forEach(card => {
        countCard = countCard + 1;
        card.cardIndex = countCard
    });

    

  return (
    <>
        <section className="profile section content__section">
            <div className="profile__user">
                <div className="profile__pic btn-avatar-edit">
                    <img className="profile__img"
                        src={userAvatar}
                        alt="аватар" />
                    <Button title="" 
                            btnClass="profile__btn profile__btn_user-edit profile__btn_avatar-edit  link-hover" 
                            handleClick={handleEditAvatarClick}/>
                </div>

                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__name text-overflow">{userName}</h1>

                        <Button title="" 
                                btnClass="profile__btn profile__btn_user-edit btn-user-edit link-hover" 
                                handleClick={handleEditProfileClick}/>
                    </div>
                    <p className="profile__job text-overflow">{userDescription}</p>
                </div>

            </div>

            <Button title="+" 
                    btnClass="profile__btn profile__btn_user-add link-hover" 
                    handleClick={handleAddPlaceClick}/>
        </section>

        <section className="cards section content__section ">
            <div className="list-template-inner">
                <ul className="cards__list list-template-place">
                    {cards.map(({ _id, ...card }) => {
                        return (
                        <Card   key={_id} 
                                handleCardClick={() => handleCardClick(card)} 
                                {...card} 
                        />
                            );
                    })}
                </ul>
            </div>
        </section>
    </>
  );
}

export default Main;
