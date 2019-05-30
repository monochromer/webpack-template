import React, { Component } from 'react';
import Icon from './Icon';
import ActivityIcon from 'feather-icons/dist/icons/activity.svg';
import ArchiveIcon from 'feather-icons/dist/icons/archive.svg';

console.log(ActivityIcon);

class App extends Component {
  render() {
    return (
      <div>
        <h4>SVG App</h4>
        <Icon icon={ActivityIcon} />
        <Icon icon={ArchiveIcon} />
        {/* <DynamicIcon icon="activity" />
        <DynamicIcon icon="archive" /> */}
      </div>
    )
  }
}

export default App;
