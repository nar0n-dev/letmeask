import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationSVG from '../assets/images/illustration.svg';
import logoSVG from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export const NewRoom = () => {
    const { user } = useAuth()

    const history = useHistory()

    const [newRoom, setNewRoom] = useState('')

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault();

        // Verifica se o usuario nao digitou um monte espaco em branco
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        // firebase.key = id do registro da sala
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img
                    src={illustrationSVG}
                    alt="Ilustration symbolinzing questions and answers"
                />
                <strong>Make live Q&amp;A rooms </strong>
                <p>Ask your audience questions in real time</p>
            </aside>

            <main>
                <div className="main-content">
                    <img
                        src={logoSVG}
                        alt="LetMeAsk"
                    />
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Enter the room name"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>
                            Create room
                        </Button>
                    </form>
                    <p>Want to enter a room that already exist? <Link to="/">Click here</Link></p>
                </div>
            </main>
        </div>
    );
}