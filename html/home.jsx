var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class ShowPost extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <div className="list-group">
            <a href="#" className="list-group-item active">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
          </div>
      )
    }
}

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubjecChange = this.handleSubjectChange.bind(this);
    this.state = {
      title:'',
      subject:''
    };
  }
  handleTitleChange(e){
    this.setState({title:e.target.value})
  }
  handleSubjectChange(e){
    this.setState({body:e.target.value})
  }
  addPost(){
    axios.post('/addPost', {
      title: this.state.title,
      subject: this.state.subject
    })
    .then(function (response) {
      console.log('response from add post is ',response);
      hashHistory.push('/')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="col-md-5">
      <div className="form-area">
      <form role="form">
      <br styles="clear:both" />
      <div className="form-group">
      <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
      </div>

      <div className="form-group">
      <textarea onChange={this.handleSubjectChange} className="form-control"  type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
      </div>

      <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
      </form>
      </div>
      </div>
      )
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost"></Route>
    </Router>,
document.getElementById('app'));
