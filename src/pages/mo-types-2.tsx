import Layout from '@/components/Layout';
import moTypes from '@/data/moTypes';
import { formatMoTypesTodD3Data } from '@/util/format';
import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
};

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue',
  },
  link: {
    highlightColor: 'lightblue',
  },
};

const RandomPortScreen = () => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const treeWrapper = document.getElementById('treeWrapper');
    if (treeWrapper) {
      const dimensions = treeWrapper.getBoundingClientRect();
      setPoint({ y: 100, x: dimensions.width / 2 });
    }
  }, []);
  return (
    <>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center py-10 font-bold shadow-lg">
            <h1>Managed Object Types</h1>
          </div>
          <div
            id="treeWrapper2"
            className="bg-white"
            style={{ height: '100vh', width: '100%' }}
          >
            <Tree
              data={formatMoTypesTodD3Data(moTypes)}
              orientation="horizontal"
              translate={{ x: point.x, y: point.y }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RandomPortScreen;
