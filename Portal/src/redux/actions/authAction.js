

export const updateUser = (userData) => {
    return async (dispatch, getState) => {
      try {
        dispatch({ type: 'UPDATE_USER_REQUEST' }); // Start the update process


  
        const { accessToken } = getState().auth; // Access token from Redux state
        const response = await fetch('http://localhost:9000/api/v2/users/update-account', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Token in header
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json(); // Parse the response
  
        if (response.ok) {
          dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data }); // Dispatch success action
          console.log('User updated successfully:', data);
        } else {
          console.error('Error updating user:', data.message);
          throw new Error(data.message || 'Error updating user');
        }
      } catch (error) {
        console.error('Update failed:', error);
        dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message }); // Dispatch failure action
      }
    };
  };


  

export const addQualification = (qualificationData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().auth; // Access the token from Redux state
        console.log(qualificationData);
        
        dispatch({ type: 'ADD_QUALIFICATION_REQUEST' });

        try {
            const response = await fetch('http://localhost:9000/api/v2/users/add-qualification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ qualification: qualificationData }), // Wrap in an object
            });

            const data = await response.json();
            console.log(response);
            
            if (response.ok) {
                dispatch({ type: 'ADD_QUALIFICATION_SUCCESS', payload: data });
            } else {
                throw new Error(data.message || 'Error adding qualification');
            }
        } catch (error) {
            console.error('Error in addQualification:', error); // Log the error for debugging
            dispatch({ type: 'ADD_QUALIFICATION_FAILURE', payload: error.message });
        }
    };
};


