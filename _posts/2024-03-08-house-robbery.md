---
layout: post
author: nemkin
title: House Robbery (learning dynamic programming)
date: 2024-03-08 21:30:00 +0100
summary: 'Solving LeetCode 198: House Robbery.'
categories: [leetcode, dynamic-programming]
keywords: leetcode, dp
tags:
 - leetcode
 - dp
math: true
hidden: true
---

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Usually the first approach I see people come up with for this exercise goes something along the lines of: "let's iterate the house array

You might try solving it with a heuristic, but there will be counterexamples to all of them. Heuristics are solutions where you always make a decision based on local information as you iterate your nums array.

The problem is that when we make a decision whether to rob a house or not, it can never be undone later, if we find something better along the way. If we include a new house into the robbed ones, suddenly its neighbour cannot be included, so maybe the previous neighbour should be, and so on, the change might bubble up all the way to the beginning... how do we deal with these in an organized manner?

Instead of sticking to a choice, check what happens in both cases! So for instance, we can either include the last house or not.

If we include the n'th house, then obviously the n-1'th cannot be included... what we are left with is solving the same problem... for houses 1 .. n-2!  And if we don't include the n'th house ... well then we must solve the problem for houses 1 .. n-1!

So if we have a solver for between 1 .. n , maybe call it solve(n), this will be a recursive function, like so:

```python
nums = [0] + nums # Let's index houses from 1 to n, for better readability.
def solver(i): # Solve or 1..i.
  # Base cases
  if i==0: # If we have no houses, we can rob 0 money.
    return 0
  if i==1: # We can only rob the first house, so let's do it!
    return nums[1]
  return max(solver(i-2) + nums[i], solver(i-1))

print(solve(n))
```

But this is not too efficient. We call solver with n, then n-1 and n-2; the n-1 call will call for n-2 and n-3; the n-2 call will call for n-3 and n-4 ... lots of redundancy there. If we know a solution to an n, we should just remember it.

This is called memoization, the typo is intentional. Python can do it built-in, with the macro `@cache`, but let's do it by hand now.

```python
nums = [0] + nums # Let's index houses from 1 to n, for better readability.
dp = [-1]*len(nums)

def solver(i): # Solve or 1..i.
  if dp[i] != -1: # If we already solved this case, return the solution.
    return dp[i]

  # Base cases
  if i==0: # If we have no houses, we can rob 0 money.
    dp[0] = 0
  elif i==1: # We can only rob the first house, so let's do it!
    dp[1] = nums[1]
  # Generic case
  else:
    dp[i] = max(solver(i-2) + nums[i], solver(i-1))

  return dp[i]

print(solve(n))
```

And at this point you can see that we're using the recursion completely unnecessarily, we could just fill out that dp array from left to right :)

```python
nums = [0] + nums # Let's index houses from 1 to n, for better readability.
dp = [-1]*len(nums)

dp[0] = 0
dp[1] = nums[1]

for i in range(2,n+1):
  dp[i] = max(dp[i-2] + nums[i], dp[i-1])

print(dp[n])
```

And this is what we call dynamic programming!

We relied on the principle of optimality, which means that an optimal solution to the problem for 1..n can be constructed from other **optimal solutions** to subproblems, 1..n-2 and 1..n-1 ! This is not true for all problems, consider finding a Hamiltonian path ... you can't just solve the problem for a subgraph, then try to build from there... maybe your edges have to be completely rearranged when a new vertex is added.

This is such a powerful tool, because using the principle of optimality you can turn a naive 2^n solution (checking all subsets of houses and finding the maximum value that satisfies the constraint) into a linear one, since the value of the optimal subet from 1..n comes from the values of other **optimal subsets** from 1..n-1 and 1..n-2 .

F.Y.I. Hamiltonian path can be solved with something called bitset dynamic programming, but that still has an exponential runtime and is a bit more trickier than this type of DP.
