import { useLocation } from "react-router-dom"

import styles from './Projects.module.css'

import Message from "../layouts/Message"
import LinkButton from '../layouts/LinkButton'
import Container from '../layouts/Container'

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <LinkButton to="/newProject" text="New Project"/>
            </div>
            {message && (
                <Message type="success" message={message} />
            )}
            <Container customClass="start">
                <p>Projects...</p>
            </Container>
        </div>
    )
}

export default Projects