import { readdirSync } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const musicFolder = join(process.cwd(), "public", "music");

  // Fetch all .mp3 files in the public/music folder
  const files = readdirSync(musicFolder).filter((file) =>
    file.endsWith(".mp3")
  );

  // Send back the list of files (URLs)
  const musicFileUrls = files.map((file) => `/music/${file}`);
  res.status(200).json(musicFileUrls);
}
