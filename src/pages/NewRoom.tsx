import { Link } from 'react-router-dom';

import illustrationSVG from '../assets/images/illustration.svg';
import logoSVG from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export const NewRoom = () => {
    const { user } = useAuth()

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
                    <form action="">
                        <input
                            type="text"
                            placeholder="Enter the room name"
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