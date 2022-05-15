import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import AddPost from "./AddPost";

export default () => {
    const [posts, getPosts] = useState([]);
    const user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            fetch("https://api.react-learning.ru/posts", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(o => o.json())
            .then(data => {
                console.log(data);
                data.forEach(d => {
                    console.log(d.tags);
                })
                getPosts(data.reverse());
            })
        }
    }, []);

    const deletePost = (e) => {
        let id = e.target.id;
        console.log(id);
        fetch(`https://api.react-learning.ru/posts/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => res.json()).then(ans => {
            console.log(ans);
            getPosts(prev => prev.filter(post => post._id !== id));
        })
    }

    return <>
        <BrowserRouter>
            <div className="myhead">
                <h1>ПОСТЫ</h1>
                <nav>
                    <a><Link to="/" style={{
                        color: "white",
                        backgroundColor: "#8a2be2",
                        borderRadius: "8px"
                    }}>Все посты</Link></a>
                    <a><Link to="/add" style={{
                        color: "white",
                        backgroundColor: "#f1356d",
                        borderRadius: "8px"
                    }}>Добавить пост</Link></a>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<div>
                    {posts.map((post, i) => <div key={i} className="post">
                        <img src={post.image}/>
                        {post.title}
                        {post.author._id === user && <span className="delete" onClick={deletePost} id={post._id}>x</span>}
                        <button onClick={() => setLiked(!liked)} onAnimationEnd={() => setClicked(false)}>Like!</button>
                    </div>)
                    }
                </div>}/>
                <Route path="/add" element={<AddPost update={getPosts}/>}/>
            </Routes>
        </BrowserRouter>
    </>
}
