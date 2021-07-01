import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <div className={s.postContent}>
                <img
                    src='https://illustrators.ru/uploads/illustration/image/1232594/main_%D1%8B%D1%8B%D1%8B%D1%8B.png'
                    alt='' />
                <div className={s.postMessage}>{props.message}</div>
            </div>
            <div>{props.likes} likes</div>
        </div>
    );
}

export default Post;