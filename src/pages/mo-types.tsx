import Layout from '@/components/Layout';
import moTypes from '@/data/moTypes';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Graph from 'react-graph-vis';

interface INode {
  id: string;
  label: string;
  title: string;
}

interface IEdge {
  to: string;
  from: string;
}

const newNodes: INode[] = moTypes.map((item) => {
  const result = {
    id: item.typeId.toString(),
    label: item.typeName,
    title: item.typeId.toString(),
  };
  return result;
});

const newEdges: IEdge[] = [];

moTypes.forEach((item) => {
  item.parentTypes?.forEach((parentTypeId) => {
    newEdges.push({
      to: item.typeId.toString(),
      from: parentTypeId.toString(),
    });
  });
});

const options = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
  // height: '',
  physics: {
    enabled: true,
  },
  interaction: { multiselect: true, dragView: true },
};

const MoTypesScreen = () => {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);
  const [searchValue, setSearchValue] = useState('');
  useRef();

  useEffect(() => {
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedNode = newNodes.filter(
      (i) => i.id === searchValue || i.label === searchValue,
    );
    if (selectedNode?.length) {
      const filteredEdges = newEdges.filter(
        (i) => i.from == selectedNode[0].id,
      );
      const filteredToNodeIds = filteredEdges.map((i) => i.to);
      const filteredNodeIds = [selectedNode[0].id, ...filteredToNodeIds];
      const filteredNodes = newNodes.map((i) => {
        if (filteredNodeIds.indexOf(i.id) > -1) {
          return { ...i, color: 'red' };
        } else {
          return i;
        }
      });

      setNodes(filteredNodes);
      // setEdges(filteredEdges);
    }
  };

  const handleReset = () => {
    setNodes(newNodes);
    setEdges(newEdges);
    setSearchValue('');
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="py-10">
            <form className="flex flex-wrap space-x-3">
              <div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
            <div className="text-sm flex space-x-3">
              <p>Nodes: {nodes.length}</p>
              <p>Edges: {edges.length}</p>
            </div>
          </div>
          <div className="bg-white" style={{ height: '100vh', width: '100%' }}>
            {nodes.length && edges.length && (
              <Graph
                graph={{ nodes: nodes, edges: edges }}
                options={options}
                events={{
                  select: ({
                    nodes,
                    edges,
                  }: {
                    nodes: INode[];
                    edges: IEdge[];
                  }) => {
                    console.log('Selected nodes:');
                    console.log(nodes);
                    console.log('Selected edges:');
                    console.log(edges);
                    alert('Selected node: ' + nodes);
                  },
                }}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(MoTypesScreen), { ssr: false });
