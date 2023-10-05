import React, { useEffect, useState } from 'react';
import ShortPost from '../entities/ShortPost';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useGetAllPostsQuery } from '../utils/Fetcher';
import './PostsList.css'

function PostsList() {

    const { data, isLoading, isError, isSuccess  } = useGetAllPostsQuery();
    const [items, setItems] = useState([]);
    const [loadedInnitData, setLoadedInnitData] = useState(false);
    // number of loaded posts for first load
    // used for slicing (+10 posts) later
    const [n, setN] = useState(20);
    //offset for loading and unloading items
    const [offset, setOffset] = useState(300);

    function LoadMoreData() {
        if(items.length !== data.length) {
            setItems([...items, ...data.slice(n, n+10)])
            setN(n+10)
        }
    }

    function HandleScroll(){
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight + offset >= scrollHeight) {
            LoadMoreData()
          }
      };
      
    useEffect(() => {
        window.addEventListener('scroll', HandleScroll)
        return () => window.removeEventListener('scroll', HandleScroll)
    }, [items]);
      
    
    if(isLoading) {
        return <LoadingSpinner />
    }

    if(isSuccess && !loadedInnitData) {
        const slice = data.slice(0,n)
        setItems(slice)
        setLoadedInnitData(true)
    }

    if(isError) {
        return <>Error...</>
    }

    return (
        <div className='post-list'>
            {items.map((post)=> {return (
                <ShortPost title={post.title} body={post.body} id={post.id}/>
            );})}
        </div>
        )
}


export default PostsList