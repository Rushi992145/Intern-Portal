

export const updateUser = (userData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().auth; // Access the token from Redux state
        console.log(userData)
        dispatch({ type: 'UPDATE_USER_REQUEST' });

        try {
            const response = await fetch('http://localhost:9000/api/v2/users/update-account', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(userData),
            });
            
            const data = await response.json();
            console.log(response)
            if (response.ok) {
                dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
            } else {
                throw new Error(data.message || 'Error updating user');
            }
        } catch (error) {
            dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
        }
    };
};
