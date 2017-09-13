import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions';
import { Icon, Button } from 'semantic-ui-react'

const Vote = ({ id, type, vote, voteScore }) => {
    const onUpVote = () => {
        vote(id,type,"upVote");
    }
    const onDownVote = () => {
        vote(id,type,"downVote");
    }        

    return (<div>
                <Icon name='thumbs outline up' style={{cursor : 'pointer'}} onClick={onUpVote}/>
                <Button className="btn btn-outline-primary">
                    Votes <span className="badge badge-pill badge-primary ">{voteScore}</span>
                </Button>
                <Icon name='thumbs outline down' style={{cursor : 'pointer'}} onClick={onDownVote}/>
            </div>);
}

function mapStateToProps({ posts }, ownProps) {
    console.log("mapStateToProps vote:",ownProps)
    return { id : ownProps.id, type: ownProps.type, voteScore: ownProps.voteScore }
}

export default connect(mapStateToProps,{ vote })(Vote);