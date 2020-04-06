import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishdetailComponent extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish){
        if( dish != null) {
            return (
                <Card>
                    <CardImg width = "100%" src={dish.image} alt = {dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }
    
    renderAllComments(dish){

        if( dish != null) {
            const mine = dish.comments.map((comment) =>{
                return (
                    <div key = {comment.id}>
                        <div>
                            <p>{comment.comment}</p>
                            <p>--{comment.author} , {comment.date}</p>
                        </div>
                    </div>
                );
            } );

            return (
                <div>
                    <h4>Comments</h4>
                    {mine}
                </div>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render(){
        return(
            <div className = "row">
                <div className = "col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className = "col-12 col-md-5 m-1">
                    {this.renderAllComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishdetailComponent;