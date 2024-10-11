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

This exercise is a bit more challenging than the previous ones.

We can quickly notice, that sorting is not a possibility here, because we
are concerned not only with the heights, but also the widths, i.e. the
distances of the vertical lines.

However, a Left/Right two pointer approach will work here, with the following
reasoning: Start out with the widest possible container, the left pointer $i=0$
and the right pointer $j=n-1$. Between `height[i]` and `height[j]`, the shorter
one determines the area of the container, let's say the shorter one is at the
left, pointer $i$.

Fixing $i$, is there any way to get a bigger container? No, because `height[i]`
is an upper limit on how tall the container can be, so even if the other line
is taller, it won't make the area bigger. Furthermore, we have the longest
possible width right now, our $j$ pointer will only step closer to $i$, so
the width can only decrease.

Therefore, there is no other solution to be considered that includes pointer $i$,
we can step off of it now. And the argument is similar for pointer $j$.

```cpp
class Solution
{
public:
  int maxArea(vector<int>& height)
  {
    int n = height.size();
    int ans=0;

    int i=0, j=n-1;
    while(i<j)
    {
      int area = min(height[i], height[j]) * (j-i);
      ans = max(ans, area);
      if(height[i] < height[j]) ++i;
      else --j;
    }
    return ans;
  }
};
```

## Challenge: Vasya and Arrays

Let's call the operation Vasya performs a merge.

In this exercise we have a new setup: our two pointers will be moving through two
separate arrays.

We start with both pointers pointing to the first elements of their respective
arrays. If those elements are equal, we are lucky, there is no need to merge
them with anything! In fact, if we were to merge here, any solution we end up
with could be improved by "unmerging" these elements, so it would never be
optimal to merge these numbers. Therefore, we keep them as is and move both
pointers to the next elements of their arrays.

If the two current elements are not equal, we will start merging in one of
the arrays: if $a[i] < b[j]$, we have to increase our current element's value
in array `a`, otherwise it would never match to array `b`. Therefore we merge
`a[i]` with `a[i+1]`.

Similarly, if $a[i] > b[j]$ we do the same in array `b`.

A little implementation trick here is to not remove any merged elements from
the arrays, simply add `a[i]` to `a[i+1]` and increment `i`. This allows us to
keep track of the current elements, without needing to do costly removals.

In the end, if we are able to finish both of our arrays, we have successfully
made them equal. If our loop exited with one array still having remaining elements,
it means that they cannot be made equal. (This is the case, for example, when their
sum is different.)

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
  
int main()
{
  ios::sync_with_stdio(0); cin.tie(0);
  int n; cin>>n; vector<ll> a(n); for(auto& ai: a) cin>>ai;
  int m; cin>>m; vector<ll> b(m); for(auto& bi: b) cin>>bi;
  int ans=0;

  int i=0, j=0;
  while(i<n && j<m)
  {
    if(a[i] == b[j]) { ++i; ++j; ++ans; }
    else if(a[i] < b[j])
    {
      if(i < n-1) { a[i+1] += a[i]; ++i; }
      else break;
    }
    else if(a[i] > b[j])
    {
      if(j < m-1) { b[j+1] += b[j]; ++j; }
      else break;
    }
  }
  if(i<n || j<m) cout << -1 << endl;
  else cout << ans << endl;
  return 0;
}
```

This type of two pointers technique appears, for example, in the
[merge operation](https://en.wikipedia.org/wiki/Merge_algorithm)
of the
[merge sort algorithm](https://en.wikipedia.org/wiki/Merge_sort).
In that case, the two pointers iterate the two sorted
arrays, always appending the smaller element to the resulting array.

### FastIO

An important note on this exercise is that the solution without the line
`ios::sync_with_stdio(0); cin.tie(0);` will result in a
`Time Limit Exceeded` verdict, simply because the input size is very
large.

In C++, we have access to both the C-style standard streams `stdin`
and `stdout` (using functions, such as `std::scanf` and `std::printf`)
and also `std::cin`and `std:cout`, which are implemented differently.

To allow freely mixing the two types of I/O's, C++ by default synchronizes
the two streams, applying each I/O operation on a C++ stream onto the
corresponding C stream's buffer. If you don't use C-style I/O,
you can disable this behaviour by calling `ios::sync_with_stdio(0)`.
This will make your C++ I/O considerably faster.

Furthermore, by default C++ will flush the `std::cout` buffer before every
`std::cin` operation, to print whatever output the program produced, for
example giving the user a nice prompt, asking them to input something,
before `std::cin` runs. In a *non-interactive problem*, this is
completely unnecessary and can be disabled by calling `cin.tie(0)`.

If you ever need to flush `std::cout`, you can manually run `cout << flush`,
or `cout << endl`, the latter printing a line ending as well.

References:

- [io::sync_with_stdio](https://en.cppreference.com/w/cpp/io/ios_base/sync_with_stdio)
- [io::tie](https://en.cppreference.com/w/cpp/io/basic_ios/tie)
- [std::flush](https://en.cppreference.com/w/cpp/io/manip/flush)
