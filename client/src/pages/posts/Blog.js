import React, {Component} from 'react';
import NewPostForm from "../../components/posts/NewPostForm";
import {connect} from 'react-redux'
import {addPosts} from "../../actions";
import './Blog.css'
import TimeAgo from "react-timeago/lib/index";
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import backend from '../../apis/backend'

const formatter = buildFormatter(polishStrings)

class Blog extends Component {
  async componentDidMount() {
    try {
      const result = await backend.get('/posts')
      this.props.addPosts(result.data)
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
        <div className="blog">
          {this.props.isLogged ? <NewPostForm/> : undefined}
          {this.props.posts.map(
              post =>
                  <div key={post._id} className="postContainer">
                    <div className="avatar">
                      <img
                          src="https://media.giphy.com/media/B1IWXbj4Disow/200.gif"
                          alt="avatar"/>
                    </div>
                    <div className="section-info underline">
                      <div className="item nick">{post.author}</div>
                      <TimeAgo className="item time" date={post.createdAt}
                               formatter={formatter}/>
                      <div className="item plus-count item-right">5</div>
                      <button className="item btn-plus">+</button>
                    </div>
                    <div className="section">
                      {post.content}
                    </div>
                  </div>
          )}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
  addPosts: posts => dispatch(addPosts(posts)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Blog)