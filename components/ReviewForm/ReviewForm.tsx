import {ReviewFormProps} from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import cn from "classnames";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: {errors}, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}
                 {...props}>
                <Input
                    {...register('name', { required: { value: true, message: 'Введите имя'}})}
                    placeholder='Имя'
                    error={errors.name}
                />
                <Input
                    {...register('title', { required: { value: true, message: 'Введите заголовок'}})}
                    placeholder='Заголовок отзыва'
                    className={styles.title}
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{required: {value: true, message: 'Поставьте оценку'}}}
                        render={({field}) => (
                            <Rating isEditable error={errors.rating} rating={field.value} ref={field.ref} setRating={field.onChange} />
                        )}
                    />
                </div>
                <TextArea
                    {...register('description', {required: {value: true, message: 'Заполните отзыв'}})}
                    placeholder='Текст отзыва'
                    className={styles.description}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, Ваш отзыв будет опубликован после проверки
                </div>
                <svg className={styles.close} onClick={() => setIsSuccess(false)} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.06066" y1="1.93934" x2="10.5459" y2="10.4246" stroke="#1CC37E" strokeWidth="3"/>
                    <line x1="1.93934" y1="10.4246" x2="10.4246" y2="1.93935" stroke="#1CC37E" strokeWidth="3"/>
                </svg>
            </div>}
            {error && <div className={cn(styles.panel, styles.error)}>
                <div>
                    Что-то пошло не так, попробуйте обновить страницу
                </div>
                <svg className={styles.close} onClick={() => setError(undefined)} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.06066" y1="1.93934" x2="10.5459" y2="10.4246" stroke="#1CC37E" strokeWidth="3"/>
                    <line x1="1.93934" y1="10.4246" x2="10.4246" y2="1.93935" stroke="#1CC37E" strokeWidth="3"/>
                </svg>
            </div>}
        </form>
    );
};