import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from "../components/RoomCode"
import logoSVG from '../assets/images/logo.svg';
import deleteSVG from '../assets/images/delete.svg';
import checkSVG from '../assets/images/check.svg';
import answerSVG from '../assets/images/answer.svg';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss'

type RoomParams = {
    id: string
}

export const AdminRoom = () => {
    //const { user } = useAuth();

    const history = useHistory()

    const params = useParams<RoomParams>()

    const roomId = params.id;

    const {title, questions} = useRoom(roomId)

    const handleCloseRoom = async () => {
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    const handleDeleteQuestion = async (questionId: string) => {
        if(window.confirm('Are you sure you want to remove this question?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    const handleCheckQuestionAsAnswered = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }
    
    const handleHighlightQuestion = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoSVG} alt="Letmeask" />
                    <div>
                        <RoomCode code={params.id}/>
                        <Button 
                            isOutlined 
                            onClick={handleCloseRoom}
                        >
                            Close Room
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
                    
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkSVG} alt="Mark the answered question" />
                                        </button>

                                        <button
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerSVG} alt="Highlight question" />
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteSVG} alt="Delete question" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}