import React,{useEffect,useState} from 'react';
import '../styles/App.css';
import {Button, Form, Input, Typography, Table, Row, Col} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const SearchJokes = () => {

    const [jokesFound, setJokesFound]=useState(null);
    const [keyword, setKeyword]=useState('');
    const { Title } = Typography;

    useEffect(()=> {
        const getJokes = async ()=>{
            const data=await fetch(`https://api.chucknorris.io/jokes/search?query=${keyword}`);
            const json=await data.json();
            setJokesFound(json.result);
        };
        getJokes();
    },[keyword]);

    const handleSearch=()=>{
        let newWord=document.querySelector( '#word' ).value;
        setKeyword(newWord);

    }

    const columns = [
        {
            title: 'TEXTO',
            dataIndex: 'value',
            key:'value',
        },
        {
            title: 'CATEGORÍAS',
            dataIndex: 'categories',
            key:'categories',
        }
    ];
    let data=null;
    if(jokesFound){
    data = jokesFound.map((joke,index)=>{
        return{
            key: index,
            value: joke.value,
            categories: joke.categories
        };
    });
    }
return (
    <>
        <Row justify={'center'}>
            <Col span={12}>
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            //onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Palabra clave:"
                name="word"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input id='word' style={{width:250}}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type='primary' onClick={handleSearch} icon={<SearchOutlined />}>Buscar</Button>
            </Form.Item>
        </Form>
            </Col>
        </Row>
        <Title level={4} style={{textAlign:'center'}}>Resultados de la búsqueda</Title>
        <Table columns={columns} dataSource={data}/>
    </>
)
}
export default SearchJokes;