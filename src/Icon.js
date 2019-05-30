import React from 'react';

export default function Icon(props) {
  const { icon } = props;

  const iconPath = process.env.NODE_ENV === 'development'
    ? `#${icon.id}`
    : icon.url;

  return (
    <svg className="Icon">
      <use xlinkHref={iconPath}></use>
    </svg>
  )
}
