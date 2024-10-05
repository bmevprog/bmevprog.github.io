---
layout: post
author:
 - nemkin
title: 'VProg Intro : Week 2, Two Pointers - Solutions'
date: 2024-10-05 18:00:00 +0200
summary: 'Solutions to the homeworks from Week 2.'
categories: [vprog-intro]
keywords: vprog-intro, twoptr
tags:
 - vprog-intro
 - twoptr
 - solutions
math: true
---

## HW1: 3SUM

[LC 15](https://leetcode.com/problems/3sum)

This exercise is similar to the TwoSum one in the video. We iterate 
the input vector, checking all possible candidates for the first number
of the three, inside the loop we do the same two pointer technique
as for 2SUM, to find the two other numbers of the triplets.

Since we are now looking for all solutions, we collect them
in a container and return it at the end. Because the input vector
can contain duplicate numbers, our code might find the same
set of three numbers more than once, but our return vector
cannot contain duplicate solutions. To achieve this, we first
collect the results in an `std::set`, which automatically handles
duplicate entries by only storing unique elements. At the end,
this has to be converted back into an `std::vector`, to match the
return type of the function.

The naive, or brute force solution would be three nested for-loops,
in $O(n^3)$ time. This solution improves that to $O(n^2)$, with an
outer for-loop executed $n$ times, and the inner two pointers
algorithm running in $O(n)$.

```cpp
class Solution
{
public:
  vector<vector<int>> threeSum(vector<int>& nums)
  {
    int n = nums.size();
    sort(nums.begin(), nums.end());

    set<vector<int>> results;
    for(int i=0; i<n; ++i)
    {
      int j=i+1;
      int k=n-1;
      while(j<k)
      {
        while(j<k && nums[i] + nums[j] + nums[k] < 0) ++j;
        while(j<k && nums[i] + nums[j] + nums[k] > 0) --k;
        if(j<k && nums[i] + nums[j] + nums[k] == 0)
        {
          results.insert({nums[i], nums[j], nums[k]});
          ++j; --k;
        }
      }
    }
    vector<vector<int>> ans;
    for(auto& s : results) ans.push_back(s);
    return ans;
  }
};
```

## HW2: Subarray Product Less Than K

https://leetcode.com/problems/subarray-product-less-than-k

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
  int numSubarrayProductLessThanK(vector<int>& nums, int k) {
    int n = nums.size();

    int i=0, j=0;
    int curr = 1;
    int count = 0;
    for(int i=0; i<n; ++i)
    {
      while(j<n && curr * nums[j] < k)
      {
        curr *= nums[j];
        ++j;
      }
      count += j-i;
      if(nums[i] < k) curr /= nums[i];
      else { j=i+1; curr = 1; }
    }
    return count;
  }
};

int main()
{
  ios::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int t; cin>>t; while(t--)
  {
    int n, k; cin>>n>>k;
    vector<int> a(n); for(auto& ai: a) cin>>ai;
    Solution s;
    cout << s.numSubarrayProductLessThanK(a, k) << endl;
  }
  return 0;
}
```
