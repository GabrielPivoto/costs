import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'

import styles from './Projects.module.css'

import Message from "../layouts/Message"
import LinkButton from '../layouts/LinkButton'
import Container from '../layouts/Container'

import ProjectCard from "../project/ProjectCard"

function Projects() {

    const location = useLocation()
    const [projects, setProjects] = useState([])
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => { setProjects(data) })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <LinkButton to="/newProject" text="New Project" />
            </div>
            {message && (
                <Message type="success" message={message} />
            )}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard
                        id={project.id}
                        projectName={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id} />
                ))}
            </Container>
        </div>
    )
}

export default Projects