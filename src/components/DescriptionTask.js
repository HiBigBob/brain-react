import React from 'react';
import MarkDown from './MarkDown';

export default class DescriptionTask extends React.Component {
  render() {
    return (
      <tbody className="table-brain-description">
          <tr>
              <td className="text-center">
              </td>
              <td className="font-w600">
                <MarkDown text={this.props.task.description} />
              </td>
              <td>
              </td>
              <td className="hidden-xs">
              </td>
          </tr>
      </tbody>
    );
  }
};
