import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'

function ProjectCard({ id, projectName, budget, category, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{projectName}</h4>
            <p>
                <span>Budget:</span> ${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Edit
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectCard