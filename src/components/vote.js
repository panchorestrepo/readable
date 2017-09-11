import React, {Component} from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions';
import { Icon, Button } from 'semantic-ui-react'


class Vote extends Component {
    onUpVote() {
        const { id, type } = this.props;
        console.log("onUpVote:",id);
        this.props.vote(id,type,"upVote");
    }
    onDownVote() {
        const { id, type } = this.props;
        console.log("downVote:",id);
        this.props.vote(id,type,"downVote");
    }
    render() {
        const { id, voteScore } = this.props;
        console.log(id)

        return (<div>
                    {/*<Button animated onClick={this.onUpVote.bind(this)}>
                        <Button.Content visible>
                            <Icon name='thumbs outline up'/>
                        </Button.Content>
                        <Button.Content hidden>
                            <small>Up vote</small>
                        </Button.Content>
                    </Button>*/}
                    <Icon name='thumbs outline up' style={{cursor : 'pointer'}} onClick={this.onUpVote.bind(this)}/>
                    <Button className="btn btn-outline-primary">
                        Votes <span className="badge badge-pill badge-primary ">{voteScore}</span>
                    </Button>
                    <Icon name='thumbs outline down' style={{cursor : 'pointer'}} onClick={this.onDownVote.bind(this)}/>
                    {/*<Button animated  onClick={this.onDownVote.bind(this)}>
                        <Button.Content visible>
                            <Icon name='thumbs outline up'/>
                        </Button.Content>
                        <Button.Content hidden>
                            <small>Down Vote</small>
                        </Button.Content>
                    </Button>                    */}
                </div>);
    }
}
function mapStateToProps({ posts }, ownProps) {
    console.log("mapStateToProps vote:",ownProps)
    return { id : ownProps.id, type: ownProps.type, voteScore: ownProps.voteScore }
}

export default connect(mapStateToProps,{ vote })(Vote);