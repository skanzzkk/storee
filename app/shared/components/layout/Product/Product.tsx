'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import s from './Product.module.scss';
import { IProduct } from '@/app/shared/types/IProduct';
import Button from '../../UIKIT/Button/Button';
import { useFavoriteStore } from '@/app/shared/core/providers/favoriteProvider';
import { useBasketStore } from '@/app/shared/core/providers/basketProvider';
import { useDislikeStore } from '@/app/shared/core/providers/dislikeProvider';
export const Product: React.FC<IProduct> = (props: IProduct) => {
  const { favorites, triggerFavorite } = useFavoriteStore(state => state);

  const { basketAction, basketItems } = useBasketStore(state => state);

  const { dislikes, doLike, redoLike } = useDislikeStore(state => state);
  useEffect(() => {
    console.log(basketItems);
  }, [basketItems]);

  return (
    <div className={s.Product}>
      <div className={s.Product__like} onClick={() => void triggerFavorite(props.id)}>
        {favorites.includes(props.id) ? '❤️' : '🤍'}
      </div>
      <div onClick={() => doLike(props.id)}>Поставить 👎</div>
      <div onClick={() => redoLike(props.id)}>Убрать 👎</div>
      {dislikes.map(i => (
        <> {i}</>
      ))}
      <Image src={props.img} alt={props.title} width={160} height={160} className={s.Product__crad_image} />
      <h3 className={s.Product__title}>{props.title}</h3>
      <div className={s.Product__bottom}>
        <p className={s.Product__bottom_price}>${props.price}</p>
        <Button size="m" style="black_solid" onClick={() => void basketAction(props.id)}>
          Buy now
        </Button>
      </div>
    </div>
  );
};
