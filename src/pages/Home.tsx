import { useHistory } from 'react-router-dom';
import illustrationSVG from '../assets/images/illustration.svg';
import logoSVG from '../assets/images/logo.svg';
import googleSVG from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { useState, FormEvent } from 'react';
import { database } from '../services/firebase';

export const Home = () => {
    const history = useHistory();

    const { signInWithGoogle, user } = useAuth();

    const [roomCode, setRoomCode] = useState('');

    const handleCreateRoom = async () => {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }


    const handleJoinRoom = async (event: FormEvent) => {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if (!roomRef.exists()) {
            alert('Room does not exists!')
            setRoomCode('')
            return;
        }

        history.push(`rooms/${roomCode}`)
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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img
                            src={googleSVG}
                            alt="Logo Google"
                        />
                        Create your room with Google
                    </button>
                    <div className="separetor">or join in the room</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Enter the room code"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit'>
                            Enter the room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}