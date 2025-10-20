import React from 'react';

import { registerToArea } from '@/core/areaManager';

function RecentPostsWidget() {
  return (
    <div className="rounded-md border bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold">Recent Posts</h3>
      <ul className="text-sm">
        <li>- Post A</li>
        <li>- Post B</li>
        <li>- Post C</li>
      </ul>
    </div>
  );
}

// Register into the sidebar area on import
registerToArea('sidebar', {
  id: 'recent-posts',
  render: () => <RecentPostsWidget />,
});

export default RecentPostsWidget;
