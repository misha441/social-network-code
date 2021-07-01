import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/formControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";


const MyPosts = React.memo((props) => {

    let addPost = (values) => {
        props.addPost(values.newPostBody);
    }

    let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likes={p.likesCount}/>);


    return (
        <div className={s.PostBlock}>
            <h3>My post</h3>

            <AddNewPostReduxForm onSubmit={addPost}/>

            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    );
});


const maxLength200 = maxLengthCreator(200);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostBody'} component={Textarea} placeholder={'Enter new post'}
                       validate={[required, maxLength200]} className={s.newPostBody}/>
            </div>
            <div>
                <button className={'buttonStyle'}>Button</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'profileAddNewPost'})(AddNewPostForm);

export default MyPosts;