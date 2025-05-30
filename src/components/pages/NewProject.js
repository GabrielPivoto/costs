import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){
    return (
        <div className={styles.new_project_container}>
            <h1>Create Project</h1>
            <p>Create a project to add the services</p>
            <ProjectForm />
        </div>
    )
}

export default NewProject