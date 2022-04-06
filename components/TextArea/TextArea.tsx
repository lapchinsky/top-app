import {TextAreaProps} from "./TextArea.props";
import styles from './TextArea.module.css';
import cn from "classnames";
import {ForwardedRef, forwardRef} from "react";

export const TextArea = forwardRef(({
                                        error,
                                        className,
                                        ...props
                                    }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(className, styles.textareaWrapper)}>
            <textarea className={cn(styles.textarea, {
                [styles.error]: error
            })} {...props} ref={ref}/>
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});