import React, {useState} from "react";
import "./index.css";

export default ({update}) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    const sendForm = (e) => {
        e.preventDefault();
        console.log("Форма не ушла =)");
        console.log(title);
        console.log(text);
        setTitle("");
        setText("");
        let token = localStorage.getItem("token");
        let body = {
            "title": title,
            "text": text
        }
        if (img) {
            body.image = img
        }
        fetch("https://api.react-learning.ru/posts", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(ans => {
                console.log(ans);
                update(prev => [...prev, ans]);
            })
    }

    return <div>
        <h1>Добавить пост</h1>
        <form onSubmit={sendForm}>
            <input placeholder="Название поста" value={title} onInput={e => setTitle(e.target.value)}/>
            <textarea placeholder="Пост" value={text} onInput={e => setText(e.target.value)}/>
            <input placeholder="Картинка" value={img} onChange={e => setImg(e.target.value)}/>
            <button type="submit">Добавить пост</button>
        </form>
    </div>
}

