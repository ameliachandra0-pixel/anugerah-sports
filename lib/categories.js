export const DEFAULT_HIERARCHY = {
  sports: ['Badminton', 'Padel', 'Tenis', 'Lainnya'],
  tree: [
    { name: 'Raket', children: [] },
    { name: 'Shuttlecock / Bola', children: [] },
    { name: 'Sepatu', children: [] },
    { name: 'Tas', children: [] },
    {
      name: 'Pakaian',
      children: [
        {
          name: 'Atasan',
          children: [
            { name: 'Kaos', children: [] },
            { name: 'Polo / Kemeja', children: [] },
            { name: 'Jaket / Hoodie', children: [] },
          ]
        },
        {
          name: 'Bawahan',
          children: [
            { name: 'Celana', children: [] },
            { name: 'Rok', children: [] },
          ]
        },
      ]
    },
    {
      name: 'Aksesoris',
      children: [
        { name: 'Grip / Overgrip', children: [] },
        { name: 'Senar', children: [] },
      ]
    },
    { name: 'Stringing Service', children: [] },
  ]
}

// Get all descendant names of a node (including itself)
export function getDescendants(tree, targetName) {
  const result = []
  function find(nodes) {
    for (const node of nodes) {
      if (node.name === targetName) { collectAll(node, result); return true }
      if (node.children?.length > 0 && find(node.children)) return true
    }
    return false
  }
  find(tree)
  return result
}

function collectAll(node, arr) {
  arr.push(node.name)
  for (const child of node.children || []) collectAll(child, arr)
}

// Flat list with depth for dropdowns
export function getAllWithDepth(nodes, depth = 0) {
  const result = []
  for (const node of nodes) {
    result.push({ name: node.name, depth, hasChildren: (node.children?.length || 0) > 0 })
    if (node.children?.length > 0) result.push(...getAllWithDepth(node.children, depth + 1))
  }
  return result
}

// Add a child to a parent node (immutable)
export function addNode(tree, parentName, newName) {
  if (!parentName) return [...tree, { name: newName, children: [] }]
  return tree.map(n => addNodeTo(n, parentName, newName))
}

function addNodeTo(node, parentName, newName) {
  if (node.name === parentName) {
    return { ...node, children: [...(node.children || []), { name: newName, children: [] }] }
  }
  return { ...node, children: (node.children || []).map(c => addNodeTo(c, parentName, newName)) }
}

// Delete a node and all its descendants (immutable)
export function deleteNode(tree, targetName) {
  return tree
    .filter(n => n.name !== targetName)
    .map(n => ({ ...n, children: deleteNode(n.children || [], targetName) }))
}

// Check if product matches selected sport
export function matchesSport(product, selectedSport) {
  if (!selectedSport || selectedSport === 'Semua') return true
  if (!product.sports || product.sports.length === 0) return true
  return product.sports.includes(selectedSport) || product.sports.includes('Semua')
}

// Check if product matches selected category (including descendants)
export function matchesCategory(product, selectedCat, tree) {
  if (!selectedCat || selectedCat === 'Semua') return true
  const descendants = getDescendants(tree, selectedCat)
  if (descendants.length === 0) return product.cat === selectedCat
  return descendants.includes(product.cat)
}
