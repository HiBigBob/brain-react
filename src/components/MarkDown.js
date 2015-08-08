import React from 'react';
import marked from 'marked';

export default class MarkDown extends React.Component {
  render() {
    var text = marked(this.props.text);
    return (
      <div dangerouslySetInnerHTML={{__html: text}} />
    );
  }
}
