import React from "react";
import Header from '../widgets/Header';
import { useGetPostQuery } from "../utils/Fetcher";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";
import Button from "../shared/Button";
import './PostInfo.css'

function PostInfo() {
    const { id } = useParams();
    const { data, isLoading } = useGetPostQuery(`${id}`)

    return (
        <>
            <Header />
            <div className="container">
            {isLoading ? <LoadingSpinner /> : 
            <div className="post-info-container">
                <h2>{data.title}</h2>
                <h3>Автор: {data.userId}</h3>
                <span>{data.body}</span>
                <Link to="/"><Button text="Назад" /></Link>
            </div>}
            </div>
        </>
    )
}

export default PostInfo