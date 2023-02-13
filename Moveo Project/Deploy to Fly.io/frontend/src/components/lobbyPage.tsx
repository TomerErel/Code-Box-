import { Center, List, Title } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CodeBox } from "../interface/code";
import { getCodeBlocks } from "../services/api.service";

export const LobbyPage: React.FC = () => {
    const [codeBlocks, setCodeBlocks] = useState<CodeBox[]>([]);

    async function getCodeBlock() {
        const codeBlocks = await getCodeBlocks()
        setCodeBlocks(codeBlocks)
    }

    useEffect(() => {
        getCodeBlock()
        let x = 0;

        x++
        console.log('rendering lobby component', x)
    },
        []);


    return (
        <>
            <Center>
                <Title>Code Box</Title>
            </Center>
            <h3> First user to enter this page will be the 'Mentor' and see the code only as 'ReadOnly'</h3>
            <h3> Second user to enter this page will be the 'User' and see the code only 'Editable'</h3>
            <h4> // Fetch Data from DB</h4>

            <List>
                {codeBlocks.map((codeBlock) => (
                    <List.Item key={codeBlock.title}>
                        <Link to={`:${codeBlock.title}`}>
                            <div>{codeBlock.title}</div>
                        </Link>
                    </List.Item>
                ))}
            </List>
        </>
    );
};
