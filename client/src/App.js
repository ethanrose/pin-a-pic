import React, { Component } from 'react';
import $ from 'jquery';

class App extends Component {
	constructor(){
		super();
		this.state = {
			user: null,
			allUsers: [],
			allPics: []
		}
	}

	handlePostPicture(){
		console.log('posting....')
		let data = {
			url: document.getElementById('postingurl').value,
			caption: document.getElementById('postingcaption').value,
		}
		$.post('/api/postPicture', data, (res)=>{
			console.log('...success!')
			location.href = '/'
		})
	}

	componentDidMount(){
		$.get('/api/userdata', (res)=>{
			console.log(res)
			this.setState({user: res})
		})
		$.get('/api/allusers', (res)=>{
			this.setState({allUsers: res})
		})
		$.get('/api/allpics', (res)=>{
			this.setState({allPics: res})
		})
	}

  render() {
    return (
      <div className="App">
        <h1 className="text-center">Pin-a-pic (pinterest clone)</h1>

        	{!this.state.user &&
	        	<div className="text-center">
	        		<a href="/auth/twitter"><h1><i className="fa fa-twitter">login</i></h1></a>
	        	</div>
        	}


        	{this.state.user &&
        		<div className="text-center">
	        		<a href="/api/logout"><h1><i className="fa fa-twitter">logout</i></h1></a>
	        		{this.state.user.twitterId}

	        		<form onSubmit={()=>this.handlePostPicture()}>
	        			<input type="text" placeholder="paste your img url here!" id="postingurl" />
	        			<input type="text" placeholder="type a caption" id="postingcaption" />
	        			<button type="submit" className="btn btn-default">Submit</button>
	        		</form>
        		</div>
        	}

        	{this.state.allUsers.length > 0 &&
    			<div>
    				{this.state.allUsers.map( (user) => {
    					return <a href={'/user/'+user.twitterId}>{user.twitterId}</a>
    				})}
    			</div>
    		}


        	{this.state.allPics.length > 0 &&
        		<div>
    				{this.state.allPics.map( (pic) => {
    					return (
	    					<div>
	    					<img src={pic.url} />
	    					<p>{pic.caption}</p>
	    					</div>
    					)
    				})}
        		</div>
    		}

      </div>
    );
  }
}

export default App;