import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject)
  })
}

async function main() {
  const fontUrl = 'https://cdn.fontshare.com/wf/BFBSY7LX5W2U2EROCLVVTQP4VS7S4PC3/IIUX4FGTMD2LK2VWD3RVTAS4SSMUN7B5/53RZKGODFYDW3QHTIL7IPOWTBCSUEZK7.ttf'
  console.log('Downloading Clash Display font...')
  const fontData = await download(fontUrl)
  console.log('Font downloaded (' + fontData.length + ' bytes)')

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 63px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.04)',
                filter: 'blur(60px)',
                left: 150,
                top: 65,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'rgba(242,210,122,0.03)',
                filter: 'blur(60px)',
                right: 150,
                top: 65,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'baseline', gap: 0 },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: 160,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F2D27A 50%, #D4AF37 100%)',
                      backgroundClip: 'text',
                      color: 'transparent',
                      lineHeight: 1,
                    },
                    children: 'HMZ',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: 160,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: '#F5F5F5',
                      lineHeight: 1,
                    },
                    children: 'Develop',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 18,
                letterSpacing: '0.25em',
                color: '#8B8B8B',
                marginTop: 12,
              },
              children: 'PREMIUM DIGITAL STUDIO',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                width: 300,
                height: 1,
                background: 'rgba(212,175,55,0.15)',
                marginTop: 20,
              },
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
          name: 'Clash Display',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const pngData = resvg.render().asPng()
  writeFileSync(resolve(__dirname, '../public/og-image.png'), pngData)
  console.log('✅ OG image generated: public/og-image.png (' + pngData.length + ' bytes)')
}

main().catch(err => { console.error('❌ Failed:', err); process.exit(1) })
