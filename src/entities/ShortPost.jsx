import Button from '../shared/Button';
import './ShortPost.css'
import { Link } from 'react-router-dom';


function ShortPost(props) {
    const { title, body, id, style } = props

    return (
        <div className='short-post-containter' style={style}>
            <h2 className='h2'>{id}. {title}</h2>
            <span className='span'>{body}</span>
            <Link to={`/pic-test-task/post/${id}`}><Button text="Просмотр"></Button></Link>
        </div>
    )
}

export default ShortPost