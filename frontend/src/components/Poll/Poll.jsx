import React from 'react';
import './Poll.css';
import open from '/open.png'
import block from '/block.png'
import { Link } from 'react-router-dom';


export default function Poll({ id, title, description, user_name, isOpen }) {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaivor: 'smooth'
        })
    }

    return (
        <li className="voteItem">
            <Link key={id} to={`/poll/${id}?user_name=${user_name}&title=${title}&description=${description}`} onClick={() => scrollToTop()}> 
                <div className="voteTitle"><strong>{title}</strong></div>
                <div className="voteDescription">{description}</div>
                <div className="voteAuthor">Автор голосования: <strong>{user_name}</strong></div>
                <div className="voteStatus">
                    {isOpen ? <img src={open} /> : <img src={block} />}
                    {isOpen ? 'Голосование открыто' : 'Голосование закрыто'}
                </div>
            </Link>
        </li>
    );
}