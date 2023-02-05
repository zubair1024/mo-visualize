import Layout from '@/components/Layout';
import moTypes from '@/data/moTypes';
import { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { MarkerType, Position } from 'reactflow';

let x = 0;
let y = 0;

const newNodes = moTypes.map((item) => {
  const result = {
    id: item.typeId.toString(),
    data: {
      label: item.typeName,
    },
    position: { x, y },
  };
  x = x + 100;
  y = y + 100;

  return result;
});

const newEdges = [];
moTypes.forEach((item) => {
  item.parentTypes?.forEach((parentTypeId) => {
    newEdges.push({
      id: `e${item.typeId}-${parentTypeId}`,
      source: item.typeId.toString(),
      target: parentTypeId.toString(),
      label: 'this is an edge label',
    });
  });
});

// console.log(newNodes);
console.log(newEdges);

export const nodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Default Node',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
    },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: 'custom style',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node',
    },
    position: { x: 400, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'default',
    className: 'annotation',
    data: {
      label: (
        <>
          On the bottom left you see the <strong>Controls</strong> and the
          bottom right the <strong>MiniMap</strong>. This is also just a node 🥳
        </>
      ),
    },
    draggable: false,
    selectable: false,
    position: { x: 150, y: 400 },
  },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const MoTypesScreen = () => {
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
            id="treeWrapper3"
            className="bg-white"
            style={{ height: '100vh', width: '100%' }}
          >
            <ReactFlow
              nodes={newNodes}
              edges={newEdges}
              fitView
              attributionPosition="top-right"
              draggable
              zoomOnScroll
            ></ReactFlow>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MoTypesScreen;
