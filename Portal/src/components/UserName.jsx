import React from 'react'

const splitFullName = (fullName) => {
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    return { firstName, lastName };
};

const UserName = ({ user }) => {
    const { firstName, lastName } = splitFullName(user.fullname);
    
    return (
        <div className='flex gap-36 '>
            <div>
                <p className="font-semibold">First Name</p>
                <p>{firstName}</p>
            </div>
            <div>
                <p className="font-semibold">Last Name</p>
                <p>{lastName}</p>
            </div>
        </div>
    )
}

export default UserName