import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import menuItems from '@/data/menuItems';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <CustomHead />
      <Layout>
        <main className="prose-xl">
          <div className="min-h-screen flex justify-center items-center flex-col">
            <h1 className="2xl font-bold uppercase">Graph Visualizers</h1>
            <ul>
              {menuItems.map((item) => {
                return (
                  <li key={item.url}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </Layout>
    </>
  );
}
