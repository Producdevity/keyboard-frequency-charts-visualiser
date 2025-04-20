// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import keystrokes from '../../data/keystroke.log'

type Data = {
  keystrokes: string
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).send(keystrokes)
}
