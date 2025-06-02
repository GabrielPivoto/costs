import { useState, useEffect } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {

    const [categories, setCategories] = useState([])

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

    return (
        <form className={styles.project_form}>

            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Insert the project name" />
            <Input
                text="Project Budget"
                type="number"
                name="budget"
                placeholder="Insert the project budget" />
            <Select
                name="category_id"
                text="Select a category"
                options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm