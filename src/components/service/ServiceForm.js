import styles from '../project/ProjectForm.module.css'

import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Service name"
                name="name"
                placeholder="Insert project name"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Service cost"
                name="cost"
                placeholder="Insert service cost"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Service description"
                name="description"
                placeholder="Insert project description"
                handleOnChange={handleChange}
            />
            <SubmitButton
                text={btnText}
            />
        </form>
    )
}

export default ServiceForm