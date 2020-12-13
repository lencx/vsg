/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import { FC } from 'react';

export interface IssuesIconProps {
  size?: number;
  color?: string;
}

const IssuesIcon: FC<IssuesIconProps> = ({ size, color }) => {
  return (
    <i className="starsicon" style={{ fontStyle: 'normal', display: 'flex' }}>
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        width={size}
        height={size}
        aria-hidden="true">
        <path
          fill={color}
          fillRule="evenodd"
          d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
        />
      </svg>
    </i>
  );
};

IssuesIcon.defaultProps = {
  size: 16,
  color: '#666',
};

export default IssuesIcon;
