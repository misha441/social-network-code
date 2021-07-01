import React, {useState, useEffect} from 'react';
import styles from './ProfileInfo.module.css';

const ProfileStatusWithHook = (props) => {

    let [editMode,setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    },[props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    const statusBlockEditingPermission = props.isOwner
        ? <div className={styles.profileStatus}>
            <div  onDoubleClick={activateEditMode}>{props.status || '-------'}</div>
        </div>
        :<div className={styles.profileStatus}>
            <div>{props.status || '-------'}</div>
        </div> ;

    return (
        <div>
            {!editMode
                ? statusBlockEditingPermission
                : <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHook;