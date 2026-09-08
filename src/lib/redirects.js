const redirects = {};

function add(destination, ...paths) {
  for (const path of paths) redirects[path] = destination;
}

const editors = [
  'https://ide.usaco.guide/NZ01ADW5zS7ju1chatz',
  'https://ide.usaco.guide/OK112khL-4NwDbn_Y1y',
  'https://ide.usaco.guide/OK118jJ8Woyg3uu7U0q',
  'https://ide.usaco.guide/OK11Db8K6A8nYAPXwTp',
  'https://ide.usaco.guide/OK11Nb9IPrX6rGeqcSG',
  'https://ide.usaco.guide/OK11SdsNKXGqDIyV53Q',
  'https://ide.usaco.guide/OK11_zCvpCLq2TTCZfQ',
  'https://ide.usaco.guide/OK11eSpWc47lsc5Mvdc'
];
add(editors[0], 'code1', 'code', 'ide', 'kod', 'usaco', 'ide1', 'kod1', 'usaco1');
for (let i = 1; i < editors.length; i += 1) {
  const number = i + 1;
  add(editors[i], `code${number}`, `ide${number}`, `kod${number}`, `usaco${number}`);
}

add('https://codeforces.com/group/2cnVva0QXt/join', 'codeforces', 'cf');
add('https://discord.gg/Vuw8yQUc5p', 'discord', 'dc');
add('https://forms.gle/om4bBXurdSzMTFxb9', 'felveteli', 'kviz', 'nyiltnap');
add('https://github.com/bmevprog', 'git', 'github', 'gh');
add('https://cs.bme.hu/icpc', 'icpc', 'acm', 'bme');
add(
  'https://drive.google.com/drive/folders/1gmDX3y6k5ywXF35FkECn9FLvkDQloHEr',
  'intro',
  'download',
  'intro-download'
);
add(
  'https://miro.com/welcome/c2Q5ZFEyc2JXRjNNVmZ3enY1S2RtN1JHcGJzQWhtcjBOa21KRXhXRkFHTjhVMm9MRjJJZUVQWDlYSThrbDBHTjNPa0ZwNktiZkJlVFpqYytXY0pEN1Z0Zlp3WGpZRTVXQXdMWk1JRFN4R0ZJZFVHQ2tKL0xtQ3FYU0NXNW1pWHlNakdSWkpBejJWRjJhRnhhb1UwcS9BPT0hdjE=?share_link_id=931117087673',
  'miro-team',
  'miro-inv',
  'miro-invite'
);
add(
  'https://miro.com/app/board/uXjVNXSGjJU=/?share_link_id=727722995947',
  'miro',
  'miro1',
  'whiteboard',
  'wb',
  'tabla',
  'firka'
);
add(
  'https://miro.com/app/board/uXjVLs3Q-HE=/?share_link_id=66278285665',
  'miro2',
  'whiteboard2',
  'wb2',
  'tabla2',
  'firka2'
);
add(
  'https://miro.com/app/board/uXjVIGEl1TQ=/?share_link_id=769840908033',
  'miro3',
  'whiteboard3',
  'wb3',
  'tabla3',
  'firka3'
);
add(
  'https://docs.google.com/document/d/14k4Owuuvs1ilZ6aJVk1KsTVdBGogJPtBqWc8hKSHE3g/edit',
  'prolog',
  'pl'
);
add('https://discord.gg/N8WbXhQGYq', 'voice', 'join-voice');
add('https://www.youtube.com/@bmevprog', 'youtube', 'yt');
add('https://us06web.zoom.us/j/86740035264', 'zoom');
add('/feed.xml', 'rss');

export { redirects };
