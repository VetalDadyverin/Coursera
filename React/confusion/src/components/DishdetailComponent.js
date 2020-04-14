import React, {Component} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Input, Form, Label, FormGroup} from "reactstrap";
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';


function RenderDish({dish}){
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

function RenderAllComments({comments}){

    if( comments != null) {
        const mine = comments.map((comment) =>{
            return (
                <div key = {comment.id}>
                    <div>
                        <p>{comment.comment}</p>
                        <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                </div>
            );
        } );

        return (
            <div>
                <h4>Comments</h4>
                <div className = "list-unstyled">{mine}</div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is :" + JSON.stringify(values));
        alert("Current state is :" + JSON.stringify(values));
    }

    render(){
        return(
            <React.Fragment>
                <div className = "container">
                    <div className = "row">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to = '/menu'>Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    {this.props.dish.name}
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <div className = "col-12">
                                <h3> {this.props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                    <div className = "row">
                        <div className = "col-12 col-md-5 m-1">
                            <RenderDish dish = {this.props.dish} />
                            </div>
                        <div className = "col-12 col-md-5 m-1">
                            <RenderAllComments comments = {this.props.comments} />
                            <Nav className = "ml-auto" navbar>
                                        <NavItem>
                                            <Button outline onClick = {this.toggleModal}>
                                                <span className="fa fa-pencil"></span> Submit Comment
                                            </Button>
                                        </NavItem>
                            </Nav>
                        </div>
                    </div> 
                </div>
                <Modal isOpen =  {this.state.isModalOpen}  toggle = {this.toggleModal}>
                            <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Form>
                                    <FormGroup >
                                        <Label htmlFor = "rating">Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor = "username">Your name</Label>
                                        <Control.text model = ".username" id = "username" name = "username" 
                                            placeholder = "Your Name"
                                            innerRef = {(input) => this.username = input}
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label htmlFor = "message">Comment</Label>
                                        <Control.textarea model=".message" id="message" name="message"
                                        rows="9"
                                        className="form-control" />
                                    </FormGroup>
                                    <Button type = "submit" value = "submit" className = "bg-primary">Submit</Button>
                                </Form>
                            </LocalForm>
                            </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


export default DishDetail;