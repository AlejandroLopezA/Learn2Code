const challenges = [

  // EASY

  {
    id: 1,

    title: "Two Sum",

    difficulty: "easy",

    points: 100,

    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

    example:
`Input: nums = [2,7,11,15], target = 9

Output: [0,1]`,

    testCases: [
      {
        input:
          "nums = [2,7,11,15], target = 9",

        expected:
          "[0,1]"
      }
    ],

    starterCode:
`function twoSum(nums, target) {

}`
  },

  {
    id: 2,

    title: "Reverse Linked List",

    difficulty: "easy",

    points: 100,

    description:
      "Reverse a singly linked list and return the reversed list.",

    example:
`Input: head = [1,2,3,4,5]

Output: [5,4,3,2,1]`,

    starterCode:
`function reverseList(head) {

}`
  },

  {
    id: 3,

    title: "Valid Parentheses",

    difficulty: "easy",

    points: 100,

    description:
      "Determine if the input string is valid using brackets validation.",

    example:
`Input: s = "()[]{}"

Output: true`,

    starterCode:
`function isValid(s) {

}`
  },

  // MEDIUM

  {
    id: 4,

    title: "Longest Substring Without Repeating Characters",

    difficulty: "medium",

    points: 200,

    description:
      "Find the length of the longest substring without repeating characters.",

    example:
`Input: s = "abcabcbb"

Output: 3`,

    starterCode:
`function lengthOfLongestSubstring(s) {

}`
  },

  {
    id: 5,

    title: "Container With Most Water",

    difficulty: "medium",

    points: 200,

    description:
      "Find two lines that together with the x-axis form a container containing the most water.",

    example:
`Input: height = [1,8,6,2,5,4,8,3,7]

Output: 49`,

    starterCode:
`function maxArea(height) {

}`
  },

  {
    id: 6,

    title: "Add Two Numbers",

    difficulty: "medium",

    points: 200,

    description:
      "Add two numbers represented as linked lists.",

    example:
`Input: l1 = [2,4,3], l2 = [5,6,4]

Output: [7,0,8]`,

    starterCode:
`function addTwoNumbers(l1, l2) {

}`
  },

  // HARD

  {
    id: 7,

    title: "Median of Two Sorted Arrays",

    difficulty: "hard",

    points: 300,

    description:
      "Return the median of two sorted arrays.",

    example:
`Input: nums1 = [1,3], nums2 = [2]

Output: 2.0`,

    starterCode:
`function findMedianSortedArrays(nums1, nums2) {

}`
  },

  {
    id: 8,

    title: "Regular Expression Matching",

    difficulty: "hard",

    points: 300,

    description:
      "Implement regular expression matching with support for '.' and '*'.",

    example:
`Input: s = "aa", p = "a*"

Output: true`,

    starterCode:
`function isMatch(s, p) {

}`
  },

  {
    id: 9,

    title: "Merge Nº Sorted Lists",

    difficulty: "hard",

    points: 300,

    description:
      "Merge k sorted linked lists into one sorted linked list.",

    example:
`Input: lists = [[1,4,5],[1,3,4],[2,6]]

Output: [1,1,2,3,4,4,5,6]`,

    starterCode:
`function mergeKLists(lists) {

}`
  }

];

export default challenges;