import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import {Advantage, HhData, Htag, Product, Sort, Tag} from "../../components";
import {TopLevelCategory} from "../../interfaces/page.interface";
import {SortEnum} from "../../components/Sort/Sort.props";
import {useEffect, useReducer} from "react";
import {sortReducer} from "../../components/Sort/sortReducer";

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Price});

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='medium'>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => <Product layout key={p._id} product={p} />)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='medium'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            <div className={styles.advantages}>
                <Htag tag='h2'>Преимущества</Htag>
                {page.advantages && page.advantages.length > 0 && page.advantages.map(el => <Advantage key={el._id} title={el.title}>{el.description}</Advantage>)}
            </div>
                {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <div className={styles.tags}>
                <Htag tag='h2'>Получаемые навыки</Htag>
                {page.tags.map(el => <Tag key={el} size='small' color='primary'>{el}</Tag>)}
            </div>
        </div>
    );
};