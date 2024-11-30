export const paragraphs = [
    `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,

    `def depth_first_search(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=" ")
    for neighbor in graph[start]:
        if neighbor not in visited:
            depth_first_search(graph, neighbor, visited)
    return visited
`,
    `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1`,
    // Add as many paragraphs as you want
  ];
  