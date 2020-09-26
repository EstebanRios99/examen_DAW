import React,{useEffect,useState} from 'react';
import '../styles/App.css';
import {Button,Typography, Form, Select, Row, Col} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const JokesAndCategories = () =>{

    const [joker, setJoker]=useState(null);
    const [otherJoke, setOtherJoke]=useState(1);
    const [category, setCategory]=useState('');
    const [categories, setCategories] = useState([]);
    const {Text}=Typography;
    useEffect(()=> {
        const getCategories = async ()=>{
            const data=await fetch(`https://api.chucknorris.io/jokes/categories`);
            const json=await data.json();
            setCategories(json);
        };
        getCategories();
    },[]);

    useEffect(()=> {
        const getJoker = async ()=>{
            if(!category){
            const data=await fetch(`https://api.chucknorris.io/jokes/random`);
            const json=await data.json();
            setJoker(json);
            }
            else{
                const data=await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
                const json=await data.json();
                setJoker(json);
            }
        };
        getJoker();
    },[otherJoke]);

    console.log("joker",joker);
    const handleOtherJoke =()=>{
        setOtherJoke(otherJoke+1);
    }
    const handleCategory=(value)=>{
        setCategory(value);
        console.log("categoria",value);
    }
    return(
        <>
            <Row justify={'center'}>
                <Col span={12}>
                    <Form>
                        <Form.Item label="Categorías" >
                            <Select placeholder={"Cualquier categoría"} style={{width:200}} onChange={handleCategory}>
                                <Select.Option value={''} style={{color: "#b1b2b5"}}>Cualquier categoría</Select.Option>
                                {categories.map((category,i)=>(
                                    <Select.Option value={category} key={i}>{category}</Select.Option>
                                ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary' onClick={handleOtherJoke} icon={<SearchOutlined />} align={'center'}>Otra Broma</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <br/>
            <br/>

            {joker ?
                    <Text>{joker.value}</Text>
                :'Cargando Chiste'
            }

        </>
    );
}
export default JokesAndCategories;