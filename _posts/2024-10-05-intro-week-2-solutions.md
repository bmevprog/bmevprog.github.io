---
layout: post
author:
 - nemkin
title: 'VProg Intro : Week 2, Two Pointers - Solutions'
date: 2024-10-11 18:00:00 +0200
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
of the three. Inside the loop we do the same Left/Right two pointer
technique as for TwoSum, to find the two other numbers of the triplets.

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

[LC 713](https://leetcode.com/problems/subarray-product-less-than-k)

We should find the longest subarray for each starting index where the product
of all elements is less than $k$. Since the numbers are at least $1$, any
prefix of this array is also a solution and anything longer than this cannot
be a solution. So once we have the longest subarray like this, we can count
each prefix as a valid solution.

The longest subarrays can be found using the Slow/Fast two pointer approach.
The left bound increases step by step, while the right bound is increased till
the product is small enough. For each $i$, $j$ will point to the first element
in the array, for which the product of the numbers `nums[i]` to `nums[j]` will
be too much. Therefore $j-1$ is the last valid index, we have exactly $j-i$
valid prefixes.

At the end of the loop, before we increment $i$, we must pay attention to also
divide our current product with the number we are stepping off of, `nums[i]`
since it won't be a part of our subarray when the loop restarts.

We handle the case when `nums[i]` itself is too large separately, stepping
both pointers off of it and initializig `prod` again with $1$.

```cpp
class Solution
{
public:
  int numSubarrayProductLessThanK(vector<int>& nums, int k)
  {
    int n = nums.size();
    int ans = 0;

    int i=0, j=0;
    int prod = 1;
    for(int i=0; i<n; ++i)
    {
      while(j<n && prod * nums[j] < k)
      {
        prod *= nums[j];
        ++j;
      }
      ans += j-i;
      if(nums[i] < k) prod /= nums[i];
      else { j=i+1; prod = 1; }
    }
    return ans;
  }
};
```

## HW3: Container with most water

[LC 11](https://leetcode.com/problems/container-with-most-water)

```cpp
class Solution
{
public:
  int maxArea(vector<int>& height)
  {
    int n = height.size();
    int i=0, j=n-1;
    int maxarea=0;
    while(i<j)
    {
      int area = min(height[i], height[j]) * (j-i);
      maxarea = max(area, maxarea);
        if(height[i] < height[j]) ++i;
        else --j;
    }
    return maxarea;
  }
};
```