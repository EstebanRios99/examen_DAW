import React,{useEffect,useState} from 'react';
import '../styles/App.css';
import JokesAndCategories from "./JokesAndCategories";
import {Typography, Row} from "antd";
import SearchJokes from "./SearchJokes";


const App = () =>{

 const { Title } = Typography;

    return(
        <>
            <Row justify={'center'}>
                <Title level={2}>Chuck Norris Jokes</Title>
            </Row>
                <JokesAndCategories/>
                <br/>
                <br/>
                <br/>
                <SearchJokes />
        </>
    );
}

export default App;
