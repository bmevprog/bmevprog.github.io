---
layout: post
author:
 - nemkin
title: 'VProg Intro : Week 3, Binary Search - Solutions'
date: 2024-10-12 16:00:00 +0200
summary: 'Solutions to the homeworks from Week 3.'
categories: [vprog-intro]
keywords: vprog-intro, binsearch
tags:
 - vprog-intro
 - binsearch
 - solutions
math: true
---

## HW1: Successful Pairs of Spells and Potions

[LC 2300](https://leetcode.com/problems/successful-pairs-of-spells-and-potions)

For each spell, we are looking for the number of potions that will form a successful pair with it.
We can first order the potions by increasing strength. Then, for each spell we can perform a binary search
on the sorted potions array, looking for the smallest strength potion, that will still succeed, when
paired with that spell. Then, any potion stronger than this will also succeed, while anything weaker
will fail. So we can count the number of potions on the right side of the minimal successful one.

You can implement the binary search by hand in the following way:

```cpp
using ll = long long;

class Solution {
public:
  bool successful(ll spell, ll potion, ll success) { return success <= spell * potion; }

  vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, ll success)
  {
    std::sort(potions.begin(), potions.end());
    std::vector<int> ans;
    
    for(auto& spell : spells)
    {
      int lo = 0;
      int hi = potions.size();

      while(lo < hi)
      {
        int mid = (hi-lo)/2 + lo;
        if (successful(spell, potions[mid], success))
          hi = mid;
        else
          lo = mid + 1;
      }
      ans.push_back(potions.size()-lo);
    }
    return ans;
  }
};
```

Or in this case, since the potions array is already 'materialized' in the memory, you can
use `std::lower_bound` too.

In c++, when we have integers `int x,y;`, if we write `x/y`, that will be an integer division
and return the floor, $\lfloor \frac{x}{y} \rfloor$. A neat trick to get the ceil, $\lceil \frac{x}{y} \rceil$
instead, is to write `(x+y-1)/y`. This works, since `(x+y)/y` would always increase the result by `+1`, so
`(x+y-1)/y` increases by `+1` only when the remainder of `x mod y` is not `0`.

```cpp
using ll = long long;

class Solution {
public:

  vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, ll success)
  {
    std::sort(potions.begin(), potions.end());
    std::vector<int> ans;
    
    for(auto& spell : spells)
    {
      ll minpotion = (success+spell-1)/spell;
      int count = potions.end() - lower_bound(potions.begin(), potions.end(), minpotion);
      ans.push_back(count);
    }
    return ans;
  }
};
```

## HW2 : Koko eating bananas

[LC 875](https://leetcode.com/problems/koko-eating-bananas)

This is a typical 'binary search for the smallest possible solution' type of task. To see this, you have to answer two questions:

- Can you validate a solution? - If someone gave you a speed, could you check if Koko would finish in time with that speed?
- Is the solution space ordered? - If a specific speed is correct, would any higher speed work also?

The answer is yes to both questions, so let's do a binary search!

We need a starting interval of possible answers. The lowest possible correct answer would be a speed of `1 banana / hour`,
so we set this as lo. The highest possible speed we may need is for Koko to 'devour' each pile in `1 hour` (she cannot
go faster than that), so that would mean she needs to be able to eat the largest pile in `1 hour`, so we set `hi`
to this amonut of `bananas / hour`.

Then, we have a checker function `can_finish`, which tells us if a specific speed is enough for Koko to finish in time.

The rest is binary search, as seen before. :)

```cpp
using ll = long long;

class Solution
{
public:
  bool can_finish(const vector<int>& piles, int hours, const int speed)
  {
    for(auto& pile : piles) hours -= (pile + speed - 1) / speed;
    return 0 <= hours;
  }

  int minEatingSpeed(vector<int>& piles, int h)
  {
    int lo = 1;
    int hi = *max_element(piles.begin(), piles.end());

    while(lo < hi)
    {
      int mid = (hi-lo)/2 + lo;
      if (can_finish(piles, h, mid))
        hi = mid;
      else
        lo = mid + 1; 
    }
    return lo;
  }
};
```

## HW3 : Cardboard for Pictures

[CF 1850E](https://codeforces.com/contest/1850/problem/E)

In many cases, exercises where a binary search is possible also allow for
direct solutions. This exercise is one of those. The question is, would you
rather implement a quadratic solver on floating point numbers or a binary
search on integers?

The correct answer is the latter, so let's look at binary search first.

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const ll maxll = numeric_limits<ll>::max();
const ll maxllsq = sqrt(maxll);

ll n, c;
vector<ll> p;
 
bool fits(ll w)
{
  ll total = 0;
  for(auto& px : p)
  {
    ll side = px + 2 * w;  if (maxllsq < side) return false;
    ll add = side * side;  if (maxll - add < total) return false;
    total += add;          if (c < total) return false;
  }
  return true;
}
 
int main()
{
  int t; cin>>t; while(t--)
  {
    cin >> n >> c;
    p.assign(n, {}); for(auto& px : p) cin>>px;

    ll lo = 1;
    ll hi = c;
    while (lo < hi)
    {
      ll mid = (hi - lo + 1)/2 + lo;
      if (fits(mid))
        lo = mid;
      else
        hi = mid - 1;
    }
    cout << lo << endl;
  }
}
```

We are searching for the **largest** frame width for which we still have
enough cardboard. This makes our binary search implementation slightly
different. In this case, we implement `upper_bound`, as opposed to
`lower_bound`.

![](/assets/posts/2024-10-12-intro-week-3-solutions/binary-search.png)

It is useful to think about what will happen when our interval
shrinks to size 2, this is where we can accurately set the +1/-1's
in our equations.

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

// PTVF Numerical Recipes 5.6.4, 5.6.5:
// Solve ax^2 + bx + c = 0.

// numerical stability
// substracting two near equal numbers
// see loss of significance / catastrophic cancellation

const double eps = 1e-14;
vector<double> quadsolve(double a, double b, double c)
{
  if(abs(a) < eps) // linear
  {
    if(abs(b) < eps) return {}; // c = 0
    return {-c/b}; // bx + c = 0
  }

  double D = b*b - 4*a*c; // discriminant
  if (D < -eps) return {}; // no real roots
  if (abs(D) < eps) return {-0.5*b/a}; // double root

  // numerically stable: no catastrophic cancellation
  double sgnb = (b >= 0.0) ? 1.0 : -1.0;
  double q = -0.5 * (b + sgnb * sqrt(D));
  return {q/a, c/q};
}

int main()
{
  int t; cin>>t; while(t--)
  {
    ll n, c; cin >> n >> c;
    vector<ll> p(n); for(ll &px : p) cin >> px;
  
    ll A=4*n, B=0, C=-c;
    for(auto& px : p) { B += 4*px; C += px*px; }

    auto result = quadsolve(A,B,C);
    auto ans = *max_element(result.begin(), result.end());
    cout << (ll)round(ans) << endl;
  }
  return 0;
}
```


## Challenge: Doremy's IQ

[CF 1707A](https://codeforces.com/contest/1707/problem/A)

- We need an $O(n)$ or $O(n*log(n))$ solution, $O(n^2)$ would be out of time.
- Observation: If you need to take a contest that would lower your IQ, it is always better to choose a later one, so you have higher IQ for the contests between those.

Solution via just implement it:

#go-backwards

- You should reverse the process, start from the last day and go to the beginning.
- You start with 0 IQ and increase your IQ whenever you need it to contest on the current day. 
- You can increase your IQ up to your initial IQ number, after that, you are only allowed to take contests that are not more difficult than your IQ.

Solution via binary search:

- A good strategy would be: first start taking contests that don't lower your IQ, then at a certain point just take all of the contests. The question is which position should you change your strategy? 
- If you have a specific position, you can test if you will end up with negative IQ at the end, to determine if that position is viable or not. This can be done in $O(n)$, just doing a for loop and executing the strategy, keeping track of your IQ.
- If a position is viable, then every position to the right of it is also viable. 
- To maximize the contests you took, you want the leftmost viable position. 
- You can do a binary search to find the leftmost viable position! That will be $log(n)$ times the check, which is $O(n)$, so $O(nlog(n))$!

```cpp
# https://codeforces.com/contest/1707/submission/207278595

num = int(input())
for i in range(num):
    n, q = map(int, input().split(" "))
    tests = list(map(int, input().split(" ")))
    
    def test_barrier(pos):
        ans = []
        current_q = q
        for index, t in enumerate(tests):
            if index < pos:
                if t <= current_q:
                    # We take it & our IQ doesn't decrease.
                    ans.append(1)
                else:
                    # We don't take it.
                    ans.append(0)
            else:
                if t <= current_q:
                    # We take it & our IQ doesn't decrease.
                    ans.append(1)
                else:
                    # We do take it & our IQ decreases!
                    current_q-=1
                    ans.append(1)
            if current_q<0:
                return (False, ans)
                    
        return (True, ans)
  
    left = 0
    right = n
    # Loop invariant: The interval contains the solution.
    while left < right:
        mid = (left + right) // 2
        # X X X X Y Y Y Y Y
        is_correct, _ = test_barrier(mid)
        if(is_correct):
            right = mid
        else:
            left = mid + 1
    
    _, ans = test_barrier(left)
    print("".join(map(str, ans)))
```

```cpp
// https://codeforces.com/contest/1707/submission/207281290

#include <bits/stdc++.h>
using namespace std;
  
int main() {
  
  int cases; cin>>cases;
  
  while(cases--) {
  
    int n, q; cin>>n>>q;
    vector<int> a(n);
    vector<int> sol(n);
    for(int i=0; i<n; ++i) cin>>a[i];
  
    int current_q = 0;
    for(int i=n-1; 0<=i; --i) {
      if (a[i] <= current_q) {
        sol[i] = 1;
      } else if (current_q < q){
        ++current_q;
        sol[i] = 1;
      }
    }
  
    for(int i=0; i<n; ++i) cout<<sol[i];
    cout<<endl;
  }
  
  return 0;
}
```