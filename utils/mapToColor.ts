const mapToColor = (value: string): string => {
  const numValue = parseFloat(value)
  const hue = (1 - numValue) * 240 // 240 is blue, 0 is red
  return `hsl(${hue}, 100%, 50%)`
}

export default mapToColor
