/* establish global variables for ESLint */
/* global document */

// React
import React from 'react';
import ReactDOM from 'react-dom';
// marked Markdown to HTML converter
import marked from 'marked';
// import jquery and bootstrap js
import 'jquery';
import 'bootstrap';
// import custom styles for project
import './index.scss';

// Input component that receives Markdown from user
class MarkdownInput extends React.Component {
  constructor(props) {
    super(props);
    // start with an initial state that demonstrates markdown
    this.state = {
      input: 'H1 Header\n=======\nH2 Header\n-----------\n### H3 Header\nThis is an example paragraph\n\nHere are some text attributes: *italic*, **bold**, `monospace`, ~~strikethrough~~ .\n\nUnordered Lists:\n  * React\n  * SASS\n\nNumbered list:\n\n  1. One\n  2. Two\n  3. Three\n\nExample link to [Free Code Camp](https://FreeCodeCamp.com)',
    };

    // bind the handle change method to this component
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount() {
    this.props.onChange(this.state.input);
  }

  // handle changes to the text area
  handleChange(event) {
    // update the state on this component
    this.setState({
      input: event.target.value,
    });

    // pass the updated value to the parent
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="col-md-6">
        <textarea
          className="form-control"
          rows="23"
          value={this.state.input}
          onChange={this.handleChange}
          autoFocus
        />
      </div>
    );
  }
}
// Check property types for MarkdownInput
MarkdownInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};

// Output component for Mardown HTML
const MarkdownOutput = function (props) {
  return (
    <div
      className="col-md-6"
      id="output-area"
      dangerouslySetInnerHTML={{ __html: marked(props.markdown) }}
    />
  );
};
// Check property types for MarkdownInput
MarkdownOutput.propTypes = {
  markdown: React.PropTypes.string.isRequired,
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
    };

    // bind methods to Component
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
  }

  handleMarkdownChange(value) {
    this.setState({
      markdown: value,
    });
  }

  render() {
    return (
      <div className="row">
        <MarkdownInput onChange={this.handleMarkdownChange} />
        <MarkdownOutput markdown={this.state.markdown} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
