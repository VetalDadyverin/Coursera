import React from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({item, isLoding, ErrMess}){
    if(isLoding){
        return (
            <Loading />
        );
    }
    else if (ErrMess){
        return (
            <h4>{ErrMess}</h4>
        );
    }
    else
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
}

function Home(props){
    return(
        <div className = "container">
            <div className = "row align-items-start">
                <div className = "col-12 col-md m-1">
                    <RenderCard item = {props.dish} 
                    isLoding = {props.dishesLoading}
                    ErrMess = {props.dishesErrMess}
                    />
                </div>
                <div className = "col-12 col-md m-1">
                <RenderCard item = {props.promotion} 
                    isLoding = {props.promoLoading}
                    ErrMess = {props.promoErrMess}/>
                </div>
                <div className = "col-12 col-md m-1">
                    <RenderCard item = {props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;