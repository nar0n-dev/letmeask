import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss'


type QuestionProps = {
    children?: ReactNode;
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    isHighlighted?: boolean;
    isAnswered?: boolean;
}


export const Question = ({content, author, isHighlighted = false, isAnswered = false, children}: QuestionProps) => {
    return (
        <div 
            className={cx(
                'question',
                {answered: isAnswered},
                {highlighted: isHighlighted && !isAnswered}
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    );
}