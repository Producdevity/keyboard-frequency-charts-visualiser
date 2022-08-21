// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
// import keystrokes from '../../data/keystrokes_short.log'
// @ts-ignore
// import keystrokes2 from '../../data/keystrokes_short2.log'
// @ts-ignore
import keystrokes3 from '../../data/keystrokes_short3.log'

type Data = {
  keystrokes: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // res.status(200).send(keystrokes)
  res.status(200).send(keystrokes3)
}
