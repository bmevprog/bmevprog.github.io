export const posts = [
  ['2024-10-12-intro-week-3-solutions', 'VProg Intro : Week 3, Binary Search - Solutions', '2024-10-12', 'Solutions to the homeworks from Week 3.'],
  ['2024-10-11-intro-week-2-solutions', 'VProg Intro : Week 2, Two Pointers - Solutions', '2024-10-11', 'Solutions to the homeworks from Week 2.'],
  ['2024-09-20-intro-week-1-solutions', 'VProg Intro : Week 1, Introduction - Solutions', '2024-09-20', 'Solutions to the homeworks from Week 1.'],
  ['2024-08-10-non-academic-problem', 'Non-academic problem (Bridge Finding)', '2024-08-10', 'Solving CF 1986F with bridge finding.'],
  ['2024-04-03-pure-math', 'Competitive programming for pure mathematics', '2024-04-03', 'On 10 April!'],
  ['2024-03-08-house-robbery', 'House Robbery (learning dynamic programming)', '2024-03-08', 'Solving LeetCode 198: House Robbery.', true],
  ['2024-03-04-vprolog', 'VProlog', '2024-03-04', 'On 6 March!'],
  ['2022-04-12-wish-i-knew-how-to-sort', 'Wish I Knew How to Sort (an exercise in probability)', '2022-04-12', 'In this post I would like to talk about solving 1753C: Wish I Knew How to Sort on Codeforces.'],
  ['2021-04-16-google-code-jam-qualification-round', 'Google Code Jam 2021 - Qualification Round', '2021-04-16', 'The 2021 Google Code Jam Qualification Round took place a few weeks ago.']
].map(([slug, title, date, summary, hidden = false]) => ({
  slug, title, date, summary, hidden, url: `/posts/${slug}/`
}));
