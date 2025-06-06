import { useState, useEffect } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => { setCategories(data) })
            .catch((err) => { console.log(err) })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (
        <form className={styles.project_form} onSubmit={submit}>
            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Insert the project name"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''} />
            <Input
                text="Project Budget"
                type="number"
                name="budget"
                placeholder="Insert the project budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''} />
            <Select
                name="category_id"
                text="Select a category"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm