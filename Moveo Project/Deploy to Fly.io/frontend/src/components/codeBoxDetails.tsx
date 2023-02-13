import React, { useState, useEffect, createRef, SetStateAction } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CodeBox } from '../interface/code';
import { getCodeBlocksByTitle, updateCodeBox } from '../services/api.service';
import hljs from 'highlight.js';
import { connect, disconnect, on, send } from '../services/socket.service';

export const CodeBoxDetails: React.FC = () => {
    const [codeBox, setCodeBox] = useState<CodeBox | undefined>();
    const [editedCode, setEditedCode] = useState('');
    const params = useParams<'title'>();
    const codeRef = createRef<HTMLElement>();
    const [readOnly, setReadOnly] = useState(true);

    async function fetchCode() {
        try {
            if (params.title) {
                const titleName = params.title.replace(':', '')
                const selectedCode = await getCodeBlocksByTitle(titleName);
                setCodeBox(selectedCode[0]);
                setEditedCode(selectedCode[0].code);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        updateCodeBox()
        fetchCode();
    }, [params.title]);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [editedCode, codeRef]);

    useEffect(() => {
        connect()
        on('set_role', (data) => {
            setReadOnly(data === 'mentor')
        })
        on("receive_update", (data) => {
            setEditedCode(data);
        });
        return () => {
            disconnect();
        };
    }, []);

    function handleCodeChange(event: React.FocusEvent<HTMLElement>) {
        setEditedCode(event.target.innerText);
        send(event.target.innerText);
    }

    return (
        <div>
            {codeBox ? (
                <div>
                    <h1>{codeBox.title}</h1>
                    <h3>// Data from DB</h3>
                    <pre>
                        <h3>Student will type his code in the code box, when done, click outside the code box to send the data.</h3>
                        <h3>*Data will be updated using WebSocket only when user click outside the highlight box.</h3>
                        <code
                            ref={codeRef}
                            contentEditable={!readOnly}
                            onBlur={handleCodeChange}
                            dangerouslySetInnerHTML={{ __html: editedCode }}
                        />
                    </pre>
                    <Link to="/">
                        <h4 onClick={() => disconnect()}>Back to Lobby</h4>
                    </Link>
                    <span>*Highlighted using Highlight.js library*</span>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
