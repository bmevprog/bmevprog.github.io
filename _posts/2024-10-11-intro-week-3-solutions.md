---
layout: post
author:
 - nemkin
title: 'VProg Intro : Week 3, Binary Search - Solutions'
date: 2024-10-11 22:00:00 +0200
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

- Binary search on the interval of possible answers.
- We can do this because if a spell is effective with a potion, then it will be with larger ones too. -> The space of possible answers is ordered!

```cpp
#include <bits/stdc++.h>
using namespace std;

// int = 4 bytes = 32 bits
// long long = 8 bytes 64 bits
// long ? 4 bytes = 32 bits

class Solution {
public:
     bool checker(int spell, int potion, long long success) {
       return ((long long)(spell)*(long long)(potion)>=success);
     }

    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        std::sort(potions.begin(), potions.end());

        // Binary search on the interval of possible answers.
        // We can do this because if a spell is effective with a potion, then it will be with larger ones too.
        // -> The space of possible answers is ordered!
        std::vector<int> result;
        // Loop invariants:
        // A way to prove correctness of binary search.
        // They are true before entering the loop.
        // Each loop execution keeps them true if they were true at start.
        for(auto& spell : spells) {
          // Loop invariant. The smallest good answer is in this interval & the right pointer is pointing to a good answer.
        int left = 0;
        int right = potions.size();

        while(left < right) { // While the interval has more than one element left.
          int mid = (left + right) / 2; // We point to the middle.
          //int hours = checker(piles, mid); // Check it.
          if (checker(spell, potions[mid], success)) { // -> If that is a good answer &
            // we are looking for the smallest good answer in the ordered space, we can exclude the upper half, they are all bigger good answers!
            right = mid; // So just set right end to mid.
            // This retains the loop invariant: smallest answer is still in the interval and right is still a good answer.
          } else { // -> If that is a bad answer &
            // we are looking for the smallest good answer in the ordered space, we can exclude the lower half, they are all bad answers!
            left = mid + 1;  // So just set left end to mid+1.
            // We just checked that mid is a bad answer, so we can exclude that as well.
            // This retains the loop invariant: smallest answer is still in the interval and right is still a good answer, if it was previously.
          }
        }
        // So at the end of execution, the loop invariants have been kept true!
        // And the size of my interval is 1!
        // And the loop invariant says that the smallest possible good answer is in the interval!
        // So the single element of the interval is the smallest possible good answer!
        result.push_back(potions.size()-left); // So just return it (return right; would work too).
        }
        return result;
     }
};
```

## HW2 : Koko eating bananas

[LC 875](https://leetcode.com/problems/koko-eating-bananas/)

- If someone told you the answer, how would you check it? Can you check if Koko would finish before the guard comes back or not?
- Yes, you can implement a checker function, with the pile sizes and the speed and it will just simulate what Koko would do and return the number of hours it took.
- Is there a speed at which we know we will finish in time for sure?
- Yes, since Koko can eat at most the current pile each hour, the biggest speed can be achieved if Koko eats a pile each hour. This can be done if we set the speed to the maximum sized pile.
- And of course, the smallest possible speed is 1 banana / hour.
- Well if we know the interval for the possible answers, we can perform linear search on it, calling the checker function for each current speed and return when we find the valid one.
- Unfortunately, this is too slow.
- However, there is a property to the possible answers: if it is possible for Koko to finish at a specific speed in time, then any larger speed is also possible.
- If we imagine the interval from 1 to maxPile as an "array" and put ❌ to any speed that is too slow and a ✅ to any fast enough speed, it will look something like this: ❌ ❌ ❌ .. ❌ ✅ ✅ ✅ ...✅ . At the lower end we will have speeds too slow and one of them finally will be fast enough ... then all of them will be fast enough. 
- We can search using binary search on this space of possible answers. Imagine this array as 0's followed by 1's and we want the smallest index where there is a 1. 
- And so we implement a binary search using the checker function to find the smallest good solution. :)

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
     long long checker(vector<int>& piles, int speed) {
       long long hours = 0;
       for(int i=0; i<piles.size(); ++i) { // At most 10^4 steps.
         hours += (piles[i] / speed) + !!(piles[i] % speed);
       }
       return hours;
     }

     // The main function for the solver.
     // Input: The piles and the h (guard's return hour).
     // Output: Smallest possible speed to finish the bananas.
     int minEatingSpeed(vector<int>& piles, int h) {
        // The min possible speed to be the answer is 1.
        int minSpeed = 1;
        // The max possible speed to be the answer is the maximum number of bananas in a pile, so Koko would eat one pile each hour.
        int maxSpeed = *max_element(piles.begin(), piles.end());
        
        // Binary search on the interval of possible answers.
        // We can do this because if a speed is good enough than any bigger speed is also good.
        // -> The space of possible answers is ordered!

        // Loop invariants:
        // A way to prove correctness of binary search.
        // They are true before entering the loop.
        // Each loop execution keeps them true if they were true at start.
        
        // Loop invariant. The smallest good answer is in this interval & the right pointer is pointing to a good answer.
        int left = minSpeed;
        int right = maxSpeed;

        while(left < right) { // While the interval has more than one element left.
          int mid = (left + right) / 2; // We point to the middle.
          int hours = checker(piles, mid); // Check it.
          if (hours <= h) { // -> If that is a good answer &
            // we are looking for the smallest good answer in the ordered space, we can exclude the upper half, they are all bigger good answers!
            right = mid; // So just set right end to mid.
            // This retains the loop invariant: smallest answer is still in the interval and right is still a good answer.
          } else { // -> If that is a bad answer &
            // we are looking for the smallest good answer in the ordered space, we can exclude the lower half, they are all bad answers!
            left = mid + 1;  // So just set left end to mid+1.
            // We just checked that mid is a bad answer, so we can exclude that as well.
            // This retains the loop invariant: smallest answer is still in the interval and right is still a good answer, if it was previously.
          }
        }
        // So at the end of execution, the loop invariants have been kept true!
        // And the size of my interval is 1!
        // And the loop invariant says that the smallest possible good answer is in the interval!
        // So the single element of the interval is the smallest possible good answer!
        return left; // So just return it (return right; would work too).
     }
};

int main() {
  // Reading in the input. Not needed for LeetCode but needed for the online IDE we used.
  int n, h;
  cin>>n>>h;
  vector<int> piles(n);
  for(int i=0; i<n; ++i) {
    cin>>piles[i];
   }

  // Running the solution on the input.
  Solution s;
  cout << s.minEatingSpeed(piles, h) << endl;
  return 0;
}
```

## HW3 : Cardboard for Pictures

[CF 1850E](https://codeforces.com/contest/1850/problem/E)

- Solution via Binary search
- Solution via Just implement it


```cpp
// https://codeforces.com/contest/1850/submission/223932370

#include <bits/stdc++.h>
using namespace std;
  
typedef long long ll;
typedef long l;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef vector<l> vl;
typedef vector<vector<l>> vvl;
typedef vector<ll> vll;
typedef vector<vector<ll>> vvll;
#define all(v) v.begin(), v.end()
#define printv(v) for(int i=0;i<(int)v.size();i++){cout<<v[i]<<' ';}cout<<endl;
#define printvv(v) for(int i=0;i<(int)v.size();i++){for(int j=0;j<(int)v[i].size();j++){cout<<v[i][j]<<' ';}cout<<endl;}cout<<endl;

ll caculate(vll& a,ll x){
    ll c=0;
    for(int i=0; i<(int)a.size(); i++){
        //(a[i]-x)*(a[i]-x) we know is aroudn 4e18
        //c<=2e18. So everytime it goes above that just set it to 2e18
        // 4e18+2e18<9e18
        ll max=2e18;
        ll n=(a[i]+2*x)*(a[i]+2*x);
        c=min(max,c+n);
    }
    /* cout<<c<<endl; */
    return c;
}
  
void solve(){
    ll n,c; cin>>n>>c;
    vll a(n);
    for(int i=0; i<n; i++) cin>>a[i];
    ll l=0; ll h=1e9;
    while(l<h){
        ll x = (l+h)/2;
        ll r = caculate(a,x);
        if(r<c){
            l=x;
        }else if(r>c){
            h=x;
        }else{
            l=x;
            break;
        }
        /* cout<<"l:"<<l<<" h:"<<h<<" r:"<<r<<endl; */ 
    }
    cout<<l<<endl;
}
  
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
  
    int t; cin>>t;
    while(t--) solve();
  
    return 0;
}
  
/*      Description:
  *
  */
```

```cpp
// https://codeforces.com/contest/1850/submission/216618649

#include <iostream>
#include <vector>
#include <list>
#include <set>
#include <map>
#include <string>
#include <algorithm>
#include <cmath>
  
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
  
int main()
{
    ios::sync_with_stdio(false);
    // cin.tie(NULL);
  
    int t;
    cin >> t;
    while(t--)
    {
        ll n, c;
        cin >> n >> c;
  
        vector<ll> a(n);
        for(ll &x : a)
            cin >> x;
  
        ll A = 0, B = 0, C = 0;
        for(ll x : a)
        {
            A += 4;
            B += 4 * x;
            C += x * x;
        }
  
        C -= c;
  
        double dA = A, dB = B, dC = C;
  
        double Z = dB / dA / 2;
        double D = (Z / 2 * dB - dC) / dA;
        double res = (-Z + sqrt(D));
        cout << (ll)round(res) << endl;
  
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