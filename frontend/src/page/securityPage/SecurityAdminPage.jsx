import { useContext, useEffect } from 'react'
import ProfileContext from '../../components/context/ProfileContext'
import { useNavigate } from 'react-router-dom'

const SecurityAdminPage = ({ children }) => {
    const profileData = useContext(ProfileContext)
    const navigate = useNavigate()
    useEffect(() => {
        profileData.role === "admin" ? null : navigate("/main")
    }, [profileData.role, navigate])
    
    return (
        <>
            {children}
        </>
    )
}

export default SecurityAdminPage