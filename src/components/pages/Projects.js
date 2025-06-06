import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'

import styles from './Projects.module.css'

import Message from "../layouts/Message"
import LinkButton from '../layouts/LinkButton'
import Container from '../layouts/Container'
import Loading from '../layouts/Loading'

import ProjectCard from "../project/ProjectCard"

function Projects() {

    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [isLoadingDisabled, setIsLoadingDisabled] = useState(false)
    const [deleteProjectMessage, setDeleteProjectMessage] = useState('')

    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setIsLoadingDisabled(true)
                })
                .catch((err) => { console.log(err) })
        }, 500)
    }, [])

    function removePreoject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'aplication/json',
            },
        })
            .then((resp) => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setDeleteProjectMessage("Project successfully deleted!")
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <LinkButton to="/newProject" text="New Project" />
            </div>
            {message && (
                <Message type="success" message={message} />
            )}
            {deleteProjectMessage && (
                <Message type="error" message={deleteProjectMessage} />
            )}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard
                        id={project.id}
                        projectName={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removePreoject}
                    />
                ))}
                {!isLoadingDisabled && <Loading />}
                {isLoadingDisabled && projects.length === 0 && (
                    <p>There are any projects registered</p>
                )}
            </Container>
        </div>
    )
}

export default Projects