import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({ type, message }) {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {

        if(!message)
            return
        
        setIsVisible(true)

        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [message])

    return (
        <>
            {isVisible && (
                <div
                    className={`${styles.message} ${styles[type]}`}>
                    {message}
                </div>
            )}
        </>
    )
}

export default Message