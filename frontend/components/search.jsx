var PostStore = require("../stores/PostStore");
var React = require("react");


var Search = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){
        this.setState({searchString:e.target.value});
    },

    render: function() {

        var libraries =
            searchString = this.state.searchString.trim().toLowerCase();


        if(searchString.length > 0){

            libraries = libraries.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });

        }

        return <div>
                    <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />

                    <ul>

                        { libraries.map(function(l){
                            return <li>{l.name} <a href={l.url}>{l.url}</a></li>
                        }) }

                    </ul>

                </div>;

    }
});
