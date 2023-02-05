import defaultTags from '@/data/defaultTags';
import { NextSeo } from 'next-seo';

const CustomHead = () => {
  return (
    <NextSeo
      title={defaultTags.title}
      description={defaultTags.description}
      canonical={defaultTags.websiteUrl}
      openGraph={{
        url: defaultTags.websiteUrl,
        title: defaultTags.title,
        description: defaultTags.description,
        images: [
          {
            url: defaultTags.image,
            width: 477,
            height: 91,
            alt: defaultTags.title,
            type: defaultTags.imageType,
          },
        ],
        siteName: defaultTags.title,
      }}
      twitter={{
        handle: defaultTags.twitterHandle,
      }}
      additionalMetaTags={[
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ]}
    />
  );
};

export default CustomHead;
