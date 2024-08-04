---
layout: post
author: nemkin
title: Google Code Jam 2021 - Qualification Round
date: 2021-04-16 12:00:00 +0100
summary: The 2021 Google Code Jam Qualification Round took place a few weeks ago.
categories: [competitions]
keywords: google, codejam
tags:
 - google
 - codejam
math: true
---

The 2021 Google Code Jam [Qualification Round](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a) took place a few weeks ago. The duration of this round is 30 hours, so no matter which timezone you live in around the world, you have more than a whole day to solve the tasks.  To advance to the next round, you must have collected at least 30 points, and as usual, it wasn't necessary to solve all the tasks to do so.

The tasks this year were the following:

- [Reversort](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d0a5c) (7 pont)
- [Moons and Umbrellas](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1145) (5, 11, 1 pont)
- [Reversort Engineering](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d12d7)  (7, 11 pont)
- [Median Sort](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1284) (7, 11, 10 pont)
- [Cheating Detection](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1155) (11, 20 pont)

Let's look at how we could advance to the next round!

## 1st Task: Reversort

### Description

Reversort is an algorithm, that can sort a list of distinct integers in ascending order, using the "Reverse" operation.

Each application of this operation reverses the order of some continuous part of the list.

The pseudocode of the algorithm is the following:

```
Reversort(L):
  for i := 1 to length(L) - 1
    j := index of the minimum in L[i..]
    Reverse(L[i..j])
```

The code above iterates over the array and in every step it swaps the number in the current position with the minimum number in the remaining array, such that the numbers between them will be put in reverse order, by reversing that continuous part of the array.

We can see, that at the end of the loop, the numbers in the array will be sorted in ascending order.

This algorithm is wasteful, the question is by how much. On the input, we receive an array of numbers in random order and we have to print the sum of the length of the subarrays reversed during the algorithm's run.

### Solution

There is only one test set. We can immediately see, that it is very small: $T=100$ cases, at most $N=100$ numbers in each. If we look at the algorithm above, it runs the loop $\~N$ times, inside it finds the minimum in $\~N$ steps and reverses in $\~N$ steps also, which means that it requires around $2\cdot{}N^2 = 2\cdot{}10^4$ steps in total. It is important to know, that 1 second is around $10^7$ - $10^8$ instructions (a rough estimate for competitive programming), so we easily fit under 1 second. We have 10 seconds and 1 GB of memory in total for the tests, so we can easily fit into these limits if we just implement the pseudocode as is.

It is a good idea to implement this task, because:

- It gives 7 points, which is a lot, compared to the 30 needed.
- We only have to translate the given pseudocode to a programming language, which is easy and fast.
- It has a Visible Verdict, so we can be sure we received those 7 points.
- The description of the task said, that there will be a similar task later, so we might kill two birds with one stone, if we deal with this task now.

I choose Python, because it is compact and has a similar syntax to the pseudocode itself. I usually choose between C++ and Python during competitions, using C++ for more complex tasks, where I want to use the STL library and if the time limits are strict. In this case, Python is the better choice for me.

I submitted the following code (without the comments):

```python
n = int(input()) # First line of the input: number of testcases
for n_i in range(n):
  cost = 0
  m = int(input()) # First line of the testcase: length of the array
  l = list(map(int, input().split(' '))) # Second line of the testcase: the array itself
  # Implementation of Reversort
  for i in range(m-1):
    j = l.index(min(l[i:m])) # Find the minimum element in the remainder of the array.
    cost += j-i+1 # Add the subarray's length to the total cost.
    l[i:j+1] = reversed(l[i:j+1]) # Reverse the subarray.
  print(f"Case #{n_i+1}: {cost}") # Print the solution in the correct format.
```

We can see, that we barely had to change anything to implement Reversort in Python and we were done. I had some issues with indexing (lesson learned: all built-in functions in Python assume intervals are closed from the left and open from the right) and I didn't know about `list.index` and the `reversed` functions, I had to look those up.

We received 7 points so far, we need 23 more.

## 2nd Task: Moons and Umbrellas

### Description

Apart from the story, the task is the following: we receive a string, which contains the characters C, J and ?. We have to switch the ? characters to either C or J, such that in the resulting string, the weighted sum of the number of CJ and JC substrings is as small as possible. The number of CJs is weighted by X and the number of JCs by Y, these parameters are also given on the input.

### Solution

Of the three test sets, the first (for 5 points) is very small, the string can be of length 10 at most, so here we could try out all possible cases, which amount to at most $2^10$ possibilities. If we were in a situation that we have already solved a few of the other tasks and just these 5 points are missing from the 30, then it would be worth coding just this much and not dealing with the other test sets.

The second test set (for 11 points) contains strings of length 1000 at most, which would be $2^1000$ possible solutions for each. Since $2^4 = 16 > 10$, that is greater than $10^250$, which would be too much, even if we could calculate the weight in one step. This test set does not allow for a brute force solution, we have to do some thinking too, however for 11 points, it might be worth dealing with.

However, the third test set (for 1 point) is very unsympathetic. It is only worth 1 point, but negative values can also appear among the weights, which must be handled in a completely opposite way (the number of substrings must be maximized instead of minimized), the length of the strings is also $1000$, so we cannot give a brute force algorithm and finally it is a Hidden Verdict, so we won't even know immediately whether our submission was successful. This is the test case that is not worth dealing with, unless we think of something quick for this while solving the second test set, otherwise we would just be wasting our time.

I submitted the following Python code for the first two test sets:

```python
n = int(input())
for n_i in range(n):
  x, y, m = input().split()
  x = int(x)
  y = int(y)
  m = m.replace('?', '')
  xc = m.count('CJ')
  yc = m.count('JC')
  print(f"Case #{n_i+1}: {x*xc + y*yc}")
```

If we want to just minimize the number of CJs and JCs, without caring about the weights first, then we could simply go through the string from left to right and replace every ? with the character to the left of it (which can no longer be ?, because we must have overwritten it in the previous step), or in the special case the string starts with ?'s, then replace them with the first non-? character, then we get such a minimized solution.

We can observe, that no matter what we replace the ?'s with, there is no way to reduce CJ and JC counts, we could only add to it, since for example for every C?...?J, somewhere a CJ substring will occur. So this solution is the best for any non-negative X and Y weights.

Finally, it's much easier to just delete the ?'s, since the method above only "slides" the non-? characters next to each other, so it will not introduce a new alternation, it will only move the existing ones next to each other.

For example for this input string:

`???JC??C??JCJ`

It will output this one:

`JJJJCCCCCCJCJ`

Which has the same number of CJ and JC substrings than the one which results from erasing the ?'s:

`JCCJCJ`

And this can be done in one operation in Python (`m.replace('?', '')`).

Python is a good choice here too, since it is concise and we have 10 seconds per test set, which is more than enough to run the code above.

We received 16 more points, we need 7 more.

## 3rd Task: Reversort Engineering

### Description

This is the task that starts the same way as Reversort, but now the roles are reversed: now on the input we get the length of the array and the cost and we have to output an array whose sorting will cost this much using Reversort (or write IMPOSSIBLE if this is not possible).

### Solution

For the first test set, the length of the array can be at most 7. This is very convenient, because we can try the 7!=5040 possible permutations one by one, run the solution given in the first task on each of them and print a permutation for which the cost is correct. If there is none, then print IMPOSSIBLE. This test set is worth 7 points, which is exactly what we need, so with this solution we are actually done, we could end the competition here.

The second test set is more difficult, the length of the array can be at most 100 and the brute force algorithm will run out of time on 100! cases. Since I've had a lot of time lest from the competition, I've decided to try to solve this test set too.

The key to the solution is to think backwards: we start from the final result, the sorted list of length N, we iterate on it backwards and step by step we "reverse" subarrays of the length we choose, until we reach the starting, mixed up list. If we can choose the lengths of the subarrays in such a way that the total sum of their length is the required cost, then the resulting array is the solution. (And here, of course, we have to notice on the task is impossible.)

The first observation is that we will use at least 1 cost in each step, since the task says that if the is the smallest element at the current position, we will still "flip" that one-element subarray. Since this will certainly arise as a cost at each position (n-1 times in total), it is worth deducting (accounting for) this at the beginning, so that during further calculations it will not happen that we have used up all the costs but have not yet reached the beginning of the array.

The consequence of this is that the cost of reversing an array of length $k$ will be $k-1$ from now on, because $1$ has already been accounted for.

And the next observation is that we can choose from the following costs in the given positions from back to front:

(Here the array is indexed with 0...n-1, Reversort does not run on the last element of the array, so we start backwards at index $n-2$.)

- index n-2: 0 if the element on index n-2 is rotated in place, and 1 if indexes n-2 and n-1 are swapped.
- index n-3: 0,1,2, similarly.
- index n-4: 0,1,2,3, similarly.
...
- index 0: 0,1,...,n-1.

So the task is to assemble the required cost as an amount while we can choose 1 number in each step above. Since we can choose an arbitrarily small number in each step, it is a good strategy to choose the maximum possible in each iteration to reduce the remaining cost as much as possible, unless we exceed it. If the maximum value in the list of possible choices is already more than the remaining cost, then a value equal to the cost is available too and can be selected from the list, then we can choose 0 in the remaining iterations.

I implemented this algorithm in Python:

```python
# First line of input: number of test cases.
z = int(input())
for z_i in range(z):
  # First line of test case: required array length, required cost value.
  n, c = map(int, input().split(' '))
  
  # First, we quickly rule out impossible cases:

  # We know that the minimum possible cost is n-1, if the goal is
  # less than this, then it's impossible.
  if c < n-1:
    print(f"Case #{z_i+1}: IMPOSSIBLE")
    continue
  # To get the maximum possible cost, we choose largest number in each step,
  # which is the sum of the numbers N,...,2 (there is no 1, because for the
  # last element Reversort is not run).
  if n*(n+1)/2-1 < c:
    print(f"Case #{z_i+1}: IMPOSSIBLE")
    continue
  # The description of the test sets includes that 2<n, this is unnecessary
  # here, I just didn't notice.
  if n == 1:
    print(f"Case #{z_i+1}: 1")
    continue

  # At this point a solution exists:

  # We account for the n-1 cost at the beginning:
  c -= (n-1)

  # Here I first calculate the costs in advance (this is not necessary,
  # it could also be done on the go):
  
  # In this array I will store for each starting index the end
  # of the subarray to be rotated.
  torev = list(range(n))
  # Here I'm going forwards, it is only necessary in the next step to go
  # backwards.
  for i in range(n-1):
    # Here I calculate how much costs I can account for in this iteration
    # (or the length of the longest possible subarray, or if it is too long,
    # then I can take the entire remaining cost).
    j = min(n-1-i, c)
    # I store where the end of the rotated subarray is. Here I had to
    # think a bit about the indexes, if there is a +1/-1 somewhere,
    # but this one is the correct indexing.
    torev[i] = i + j
    # I remove from the total cost the value I accounted for in this iteration.
    c -= j

  # And here I play the previously stored rotations backwards and
  # generate the starting array:

  # We start from the ordered array of length n.
  l = list(range(1,n+1))
  # i=n-2...0
  for i in range(n-2,-1,-1):
    # End of the subarray to be rotated.
    j = torev[i]
    # Even more +1/-1 indexing questions.
    l[i:j+1] = reversed(l[i:j+1])
    
  # Print the solution.
  st = " ".join(map(str, l))
  print(f"Case #{z_i+1}: {st}")
```

There are many ways to calculate the solution here, it is probably not necessary to account for the $n-1$ cost in advance, we could notice on the go if we have run out of the allowed cost. This code could still be simplified by a lot. :)

With this solution, we scored 18 more points, which is 41 points in total. Every test set we submitted had a Visible Verdict, so we can be sure that we've made it to the next round!
