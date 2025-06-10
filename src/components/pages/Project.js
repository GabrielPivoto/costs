import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import Message from '../layouts/Message'

import ProjectForm from '../project/ProjectForm'

import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [services, setServices] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => { console.log(err) })
        }, 500)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editProject(project) {

        setMessage('')

        if (project.budget < project.cost) {
            setMessage("Budget cannot be lower than project cost!")
            setMessageType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)

        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Project updated!")
                setMessageType("success")
            })
            .catch((err) => { console.log(err) })
    }

    function createService(project) {

        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage("Budget overflow! Verify the service cost!")
            setMessageType("error")
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => { resp.json() })
            .then((data) => { })
            .catch((err) => { console.log(err) })
    }

    function removeService(id, cost) {

        const updatedServices = project.services.filter(
            (service) => service.id !== id,
        )

        const updatedProject = project
        updatedProject.services = updatedServices
        updatedProject.cost = parseFloat(updatedProject.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        })
            .then((resp) => { resp.json() })
            .then(() => {
                setProject(updatedProject)
                setServices(updatedServices)
                setMessage("Service successfully removed!")
                setMessageType("success")
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={messageType} message={message} />}
                        <div className={styles.details_container}>
                            <h1>{project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit project" : "Close"}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total budget:</span> ${project.budget}
                                    </p>
                                    <p>
                                        <span>Budget used:</span> ${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editProject}
                                        btnText="Edit project"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Add a service</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Add service" : "Close"}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Add service"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        serviceName={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}
                                    />
                                ))
                            ) : (
                                <p>This project has no servies yet</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project