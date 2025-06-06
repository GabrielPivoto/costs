import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {

    const navigate = useNavigate()

    function saveNewProject(project){

        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate("/projects", 
                {state:{message: "Project successfully created!"}})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.new_project_container}>
            <h1>Create Project</h1>
            <p>Create a project to add the services</p>
            <ProjectForm btnText="Create project" handleSubmit={saveNewProject}/>
        </div>
    )
}

export default NewProject