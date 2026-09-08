export const posts = [
  ['2024-10-12-intro-week-3-solutions', 'VProg Intro : Week 3, Binary Search - Solutions', '2024-10-12', 'Solutions to the homeworks from Week 3.', ['vprog-intro'], ['vprog-intro', 'binsearch', 'solutions']],
  ['2024-10-11-intro-week-2-solutions', 'VProg Intro : Week 2, Two Pointers - Solutions', '2024-10-11', 'Solutions to the homeworks from Week 2.', ['vprog-intro'], ['vprog-intro', 'twoptr', 'solutions']],
  ['2024-09-28-intro-week-3', 'VProg Intro : Week 3, Binary Search', '2024-09-28', 'Video is out for Week 3!', ['vprog-intro'], ['vprog-intro', 'binsearch', 'video']],
  ['2024-09-20-intro-week-2', 'VProg Intro : Week 2, Two Pointers', '2024-09-20', 'Video is out for Week 2!', ['vprog-intro'], ['vprog-intro', 'twoptr', 'video']],
  ['2024-09-20-intro-week-1-solutions', 'VProg Intro : Week 1, Introduction - Solutions', '2024-09-20', 'Solutions to the homeworks from Week 1.', ['vprog-intro'], ['vprog-intro', 'implementation', 'solutions']],
  ['2024-09-09-vprog-start', 'VProg Intro : Week 1, Introduction + VProg Advanced Student Club', '2024-09-09', 'Autumn 2024, VProg Intro video', ['vprog', 'vprog-intro', 'starting', 'introduction'], ['vprog', 'vprog-intro', 'starting', 'introduction', 'video']],
  ['2024-08-10-non-academic-problem', 'Non-academic problem (Bridge Finding)', '2024-08-10', 'Solving CF 1986F with bridge finding.', ['codeforces', 'graph-theory'], ['codeforces', 'dfs', 'graph-theory', 'trees']],
  ['2024-04-03-pure-math', 'Competitive programming for pure mathematics', '2024-04-03', 'On 10 April!', ['vprog', 'pure-math', 'projects'], ['vprog', 'pure-math', 'projects']],
  ['2024-03-08-house-robbery', 'House Robbery (learning dynamic programming)', '2024-03-08', 'Solving LeetCode 198: House Robbery.', ['leetcode', 'dynamic-programming'], ['leetcode', 'dp'], true],
  ['2024-03-04-vprolog', 'VProlog', '2024-03-04', 'On 6 March!', ['vprog', 'vprolog'], ['vprog', 'vprolog']],
  ['2024-02-16-vprog-start', 'VProg Student Club', '2024-02-16', 'Spring 2024', ['vprog', 'starting'], ['vprog', 'starting']],
  ['2023-09-01-vprog-start', 'VProg Student Club', '2023-09-01', 'Fall 2023', ['vprog', 'starting'], ['vprog', 'starting']],
  ['2023-02-26-vprog-start', 'VProg Student Club', '2023-02-26', 'Spring 2023', ['vprog', 'starting'], ['vprog', 'starting']],
  ['2022-09-01-vprog-start', 'VProg Student Club', '2022-09-01', 'Fall 2022', ['vprog', 'starting'], ['vprog', 'starting']],
  ['2022-04-12-wish-i-knew-how-to-sort', 'Wish I Knew How to Sort (an exercise in probability)', '2022-04-12', 'In this post I would like to talk about solving 1753C: Wish I Knew How to Sort on Codeforces.', ['codeforces', 'probability-theory'], ['codeforces', 'probability-theory', 'expectation-value', 'markov-chain']],
  ['2021-04-16-google-code-jam-qualification-round', 'Google Code Jam 2021 - Qualification Round', '2021-04-16', 'The 2021 Google Code Jam Qualification Round took place a few weeks ago.', ['competitions'], ['google', 'codejam']]
].map(([slug, title, date, summary, categories, tags, hidden = false]) => ({
  slug, title, date, summary, categories, tags, hidden, url: `/posts/${slug}/`
}));

export function groupPosts(field) {
  const groups = new Map();
  for (const post of posts.filter((item) => !item.hidden)) {
    for (const value of post[field]) {
      const items = groups.get(value) ?? [];
      items.push(post);
      groups.set(value, items);
    }
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
