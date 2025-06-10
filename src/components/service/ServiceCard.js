import { BsFillTrashFill } from 'react-icons/bs'

import styles from '../project/ProjectCard.module.css'

function ServiceCard({ id, serviceName, cost, description, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <h4>{serviceName}</h4>
            <p>
                <span>cost:</span> ${cost}
            </p>
            <p className={styles.description_text}>
                <span className={`${styles[description.toLowerCase()]}`}></span> {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Delete
                </button>
            </div>
        </div>
    )
}

export default ServiceCard