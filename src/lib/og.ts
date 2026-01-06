import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontPath = path.resolve('./public/fonts/Satoshi-Variable.woff');
const fontData = fs.readFileSync(fontPath);
const logoPath = path.resolve('./public/images/logo.png');
const logoData = fs.readFileSync(logoPath);
const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

type OgOptions = {
  title: string;
  subtitle?: string;
};

export async function renderOgImage({ title, subtitle }: OgOptions) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '80px',
          backgroundColor: '#fff8ea',
          color: '#120f0b',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'img',
                  props: {
                    src: logoSrc,
                    width: 200,
                    height: 114,
                    style: {
                      objectFit: 'contain',
                    },
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '72px',
                fontWeight: 600,
                fontFamily: 'Satoshi',
                lineHeight: 1.1,
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                fontFamily: 'Satoshi',
                color: '#6b695f',
                textAlign: 'right',
              },
              children: 'ursa.nz',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
