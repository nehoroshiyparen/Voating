import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef, createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const location = useLocation();
    const adminSocketRef = useRef(null);
    const clientSocketRef = useRef(null);
    const [onStartPoll, setOnStartPoll] = useState(null);
    const [onQuestionChanged, setOnQuestionChanged] = useState(null);
    const [onPollEnded, setOnPollEnded] = useState(null);

    const connectAdminSocket = () => {
        if (!adminSocketRef.current) {
            adminSocketRef.current = new WebSocket('ws://localhost:8080');

            adminSocketRef.current.onopen = () => { 
                adminSocketRef.current.send(JSON.stringify({ role: 'admin' }));
            };
        }
    };

    const pollStartNotification = (poll_id) => {
        if (adminSocketRef.current && adminSocketRef.current.readyState === WebSocket.OPEN) {
            adminSocketRef.current.send(JSON.stringify({ role: 'admin', type: 'startPoll', poll_id }));
        }
    };

    const changeQuestion = (question_id, poll_id) => {
        if (adminSocketRef.current && adminSocketRef.current.readyState === WebSocket.OPEN) {
            adminSocketRef.current.send(JSON.stringify({ role: 'admin', type: 'changeQuestion', question_id, poll_id }));
        }
    };

    const endPoll = (poll_id) => {
        if (adminSocketRef.current && adminSocketRef.current.readyState === WebSocket.OPEN) {
            adminSocketRef.current.send(JSON.stringify({ role: 'admin', type: 'endPoll', poll_id }));
        }
    };

    const connectClientSocket = () => {
        if (!clientSocketRef.current) {
            clientSocketRef.current = new WebSocket('ws://localhost:8080');

            return new Promise((resolve, reject) => {
                clientSocketRef.current.onopen = () => {
                    clientSocketRef.current.send(JSON.stringify({ role: 'client' }));
                    resolve();
                };
    
                clientSocketRef.current.onerror = (error) => {
                    console.error('Ошибка WebSocket:', error);
                    reject(error);
                };
            });
        }
    }

    const sendPollId = (poll_id) => {
        if (clientSocketRef.current && clientSocketRef.current.readyState === WebSocket.OPEN) {
            const message = {
                action: 'join',
                poll_id: poll_id
            }

            clientSocketRef.current.send(JSON.stringify(message))
        }
    }

    useEffect(() => {
        if (location.pathname.startsWith('/poll') || location.pathname.startsWith('/questionsController')) {
            if (!adminSocketRef.current) {
                connectAdminSocket();
            }
        } else {
            if (adminSocketRef.current) {
                console.log('Закрываю соединение админа');
                adminSocketRef.current.close();
                adminSocketRef.current = null;
            }
        }

        if (location.pathname.startsWith('/client')) {
            if (!clientSocketRef.current) {
                connectClientSocket();
            }
        } else {
            if (clientSocketRef.current) {
                console.log('Закрываю соединение клиента');
                clientSocketRef.current.close();
                clientSocketRef.current = null;
            }
        }

    }, [location.pathname]);

    return (
        <WebSocketContext.Provider value={{
            adminSocketRef,
            clientSocketRef,
            sendPollId,
            changeQuestion,
            pollStartNotification,
            endPoll,
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
