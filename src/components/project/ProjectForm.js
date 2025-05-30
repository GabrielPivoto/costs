import Input from '../form/Input'
import styles from './ProjectForm.module.css'

function ProjectForm() {
    return (
        <form className={styles.project_form}>

            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Project name" />
            <Input
                text="Project Budget"
                type="number"
                name="budget"
                placeholder="Project budget" />
            <div>
                <select name="projectId">
                    <option>Test 1</option>
                    <option>Test 2</option>
                </select>
            </div>
            <Input type="submit" value="Create Project" />
        </form>
    )
}

export default ProjectForm