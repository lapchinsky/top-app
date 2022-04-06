import React, {useState} from 'react';
import {Button, Htag, Input, P, Rating, Tag, TextArea} from '../components';
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from 'axios';
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {

    const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>Text</Htag>
        <Button appearance='primary' arrow='down'>Кнопка</Button>
        <P size='small'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at deserunt fugiat quod reiciendis saepe.</P>
      <Tag size='small'>Ghost</Tag>
      <Tag size='medium' color='red'>Red</Tag>
      <Tag size='medium' color='green'>Green</Tag>
      <Tag size='small' color='primary'>Primary</Tag>
        <Rating rating={rating} isEditable setRating={setRating} />
        <Input placeholder='test' />
        <TextArea placeholder='Текст отзыва' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[],
    firstCategory: number;
}