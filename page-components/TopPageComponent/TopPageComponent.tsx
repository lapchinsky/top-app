import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import {Advantage, Card, HhData, Htag, Tag} from "../../components";
import {TopLevelCategory} from "../../interfaces/page.interface";

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='medium'>{products.length}</Tag>}
                <div>Сортировка</div>
            </div>
            <div>
                {products && products.map(p => <div key={p._id}>{p.title}</div>)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='medium'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            <div className={styles.advantages}>
                <Htag tag='h2'>Преимущества</Htag>
                {page.advantages && page.advantages.length > 0 && page.advantages.map(el => <Advantage title={el.title}>{el.description}</Advantage>)}
            </div>
                {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <div className={styles.tags}>
                <Htag tag='h2'>Получаемые навыки</Htag>
                {page.tags.map(el => <Tag key={el} size='small' color='primary'>{el}</Tag>)}
            </div>
        </div>
    );
};