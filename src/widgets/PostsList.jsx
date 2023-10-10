import React, { useEffect, useState, useMemo, useRef, useCallback, createElement } from 'react';
import ShortPost from '../entities/ShortPost';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useGetAllPostsQuery } from '../utils/Fetcher';
import './PostsList.css'

function PostsList() {
    const containerRef = useRef(null)
    const { data, isLoading, isError, isSuccess } = useGetAllPostsQuery();
    const [items, setItems] = useState([]);
    const [loadedInnitData, setLoadedInnitData] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [gap, setGap] = useState(30);
    const [listItemHeight, setlistItemHeight] = useState(350);
    // number of loaded posts for first load
    // used for slicing (+10 posts) later
    const [n, setN] = useState(10);
    const [bufferedItems, setBufferedItems] = useState(4);

    const visibleChildren = useMemo(() => {
        const memoStartIndex = Math.max(Math.floor(scrollPosition / listItemHeight) - bufferedItems, 0);
        const memoEndIndex = Math.min(
            Math.ceil((scrollPosition + containerHeight) / listItemHeight - 1) + bufferedItems,
            items.length,
        );
        setEndIndex(memoEndIndex);

        return items.slice(memoStartIndex, memoEndIndex + 1).map((post, index) => {
            return createElement(ShortPost, {
                style: {
                    position: 'absolute',
                    top: (memoStartIndex + index) * listItemHeight + index * gap,
                },
                title: post.title,
                body: post.body,
                id: post.id,
            });
        });
    }, [items, gap, listItemHeight, scrollPosition, containerHeight, bufferedItems]);

    function LoadMoreData() {
        setItems([...items, ...data.slice(n, n + 10)])
        setN(n + 10)
    }

    const onScroll = useCallback((e) => {
        setScrollPosition(e.target.scrollTop)
    }, []);

    useEffect(() => {
        const resizeHandler = (e) => {
            setContainerHeight(e[0].contentRect.height);
        };

        const resizeObserver = new ResizeObserver(resizeHandler);
        if (containerRef && containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    useEffect(() => {
        if (endIndex + bufferedItems > items.length && !isLoading) {
            LoadMoreData();
        }
    }, [LoadMoreData, bufferedItems, endIndex, items]);


    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isSuccess && !loadedInnitData) {
        const slice = data.slice(0, n)
        setItems(slice)
        setLoadedInnitData(true)
    }

    if (isError) {
        return <>Error...</>
    }

    return (
        <div className='list-container' ref={containerRef} onScroll={onScroll}>
            {visibleChildren}
        </div>
    )
}


export default PostsList