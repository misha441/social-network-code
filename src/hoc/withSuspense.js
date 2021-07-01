import React from 'react';

const withSuspence = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<h1>Loading profile...</h1>}>
            <Component {...props}/>
        </React.Suspense>
    }
}

export default withSuspence;