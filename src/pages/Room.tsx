import { Button } from '../components/Button';

import '../styles/room.scss'
export const Room = () => {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src="{logoImg}" alt="Letmeask" />
                    <div>code</div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea 
                        placeholder="What do you want to ask me?"
                    />

                    <div className="form-footer">
                        <span>To send your question, <button>please do login</button>.</span>
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}