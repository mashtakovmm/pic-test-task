import React, { useEffect, useRef, useState } from 'react'; 
import Button from '../shared/Button';
import './ShortPost.css'
import { Link } from 'react-router-dom';


function ShortPost(props) {
    const {title, body, id, offset} = props
    const observer = useRef();
    const [isInViewport, setIsInViewport] = useState(true);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', HandleScroll)
        const elem = observer.current;
        // minus padding 
        setWidth(elem.clientWidth - 20);
        setHeight(elem.clientHeight - 20);
        return () => window.removeEventListener('scroll', HandleScroll)
    },[]);

    function HandleScroll() {
        const elem = observer.current;
        const rect = elem.getBoundingClientRect();
        const isVisible = (
            rect.top <= window.innerHeight + offset &&
            rect.bottom >= -offset
        );
        setIsInViewport(isVisible)
    }

    return (
        isInViewport ? (
            <div className='short-post-containter' ref={observer}>
                <h2 className='h2'>{id}. {title}</h2>
                <span className='span'>{body}</span>
                <Link to={ `/pic-test-task/post/${id}` }><Button text="Просмотр"></Button></Link>
            </div>
        ) : (
            <div className='short-post-containter' ref={observer} style={{minWidth:width, minHeight:height}}>
            </div>
        )
      )
    
}

export default ShortPost