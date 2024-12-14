import logo from '/logo.png'
import { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';


export default function Header() {
    const [time, setTime] = useState(new Date())
    setInterval(() => setTime(new Date()), 1000)
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt=" " style={{ height: '100px', marginRight: '10px' }} />
                    <h3 style={{ fontSize: '200%' }}>Голосования</h3>
                </div>
            </Link>
            <span>Текущее время: {time.toLocaleTimeString()}</span>
        </header>
    );

}